const appendFacility = () => {
	if($('#facility-table').length > 0) {
		$('#facility-table').DataTable({			
			"bFilter": false, 
			"bInfo": false,
			"autoWidth": true,
			"language": {
				search: ' ',
				sLengthMenu: '_MENU_',
				searchPlaceholder: "Search",
				info: "_START_ - _END_ of _TOTAL_ items",
				"lengthMenu":     "Show _MENU_ entries",
				paginate: {
					next: 'Next <i class=" fa fa-angle-right"></i> ',
					previous: '<i class="fa fa-angle-left"></i> Prev '
				},
			},
			initComplete: (settings, json)=>{
				$('.dataTables_paginate').appendTo('.datatable-paginate');
				$('.dataTables_length').appendTo('.datatable-length');
			},	
			"data": facility_data,
			"columns": [
				{ "data": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                } },
				{ "render": function ( data, type, row ){
					return 'Vivek Mehra';
				}},				
				{ "render": function ( data, type, row ){
					let date = new Date(row['created_at']);
					let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
					let formattedDate = date.toLocaleDateString('en-US', options);
					return formattedDate;
				}},
				{ "render": function ( data, type, row ){
					return '' + row['identifier'].toUpperCase() + '';
				}},
				{ "render": function ( data, type, row ){
					const fName = helperJS.textCamelCase(row['name']);
					return '' + fName + '';
				}},
				{ "render": function ( data, type, row ){
					let class_name, status_name;
					if(row['status'] == "active") { 
						class_name = "bg-success";
						status_name = "Active"; 
					} else if(row['status'] == "pending") { 
						class_name = "bg-warning";
						status_name ="Pending";
					} else if(row['status'] == "inactive") { 
						class_name = "badge-danger";
						status_name ="Inactive";
					}
					return '<span class="badge badge-pill badge-status '+class_name+'" >'+status_name+'</span>';
				}},
				{ "render": function ( data, type, row ){
					const identifier = row['identifier'].toUpperCase();
					const fName = helperJS.textCamelCase(row['name']);
					return '<div class="dropdown table-action text-end">' +
                           '<a href="#" class="action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>' +
                           '<div class="dropdown-menu dropdown-menu-right">' +
                               '<a class="dropdown-item edit-facility" href="javascript:void(0);" data-bs-toggle="offcanvas" data-bs-target="#edit_facility" data-id="' + row['_id'] + '" data-identifier="' + identifier + '" data-name="' + fName + '" data-status="' + row['status'] + '"><i class="ti ti-edit text-blue"></i> Edit</a>' + 
                               '<a class="dropdown-item delete-facility" href="#" data-bs-toggle="modal" data-bs-target="#delete_facility" data-id="' + row['_id'] + '"><i class="ti ti-trash text-danger"></i> Delete</a>' + 
                           '</div>' +
					'</div>';
				}}
			]
		});
	}
}
const deleteFacilityAjax = (id) =>{
    return $.ajax({
      url: '/api/delete-facility/' + id, 
      type: 'GET',
      dataType: 'json', 
    });
}
const deleteFacility = () => {

	$('#delete_facility').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		console.log(button)
		let facilityId = button.data('id')
		
		const modal = $(this)
		const dltBtn = modal.find('.delete-confirm')
		dltBtn.on('click', function(evnt) {
			evnt.preventDefault()
			deleteFacilityAjax(facilityId).then(data => {
				if (data.success) {
					var t;
					Swal.fire({
						title: "Facilty Deleted Sussfully!",
						html: `Facility will be reloaded in <strong>${t}</strong> milliseconds.`,
						timer: 2e3,
						confirmButtonClass: "btn btn-primary",
						buttonsStyling: !1,
						onBeforeOpen: function () {
						Swal.showLoading(),
							(t = setInterval(function () {
							Swal.getContent().querySelector("strong").textContent =
								Swal.getTimerLeft();
							}, 100));
						},
						onClose: function () {
							clearInterval(t);
						},
					}).then(function (t) {
						t.dismiss === Swal.DismissReason.timer && location.reload();
					});
					
				} else {
					Swal.fire({
						title: "Error",
						text: "An Error occured while deleting the facility!",
						icon: "error",
						confirmButtonClass: "btn btn-primary",
						buttonsStyling: !1,
					});
				}
			}).catch(error => {
				Swal.fire({
					title: "Error",
					text: "An Error occured while deleting the facility!",
					icon: "error",
					confirmButtonClass: "btn btn-primary",
					buttonsStyling: !1,
				});
			});
		})
	})
}
const editFacility = () => {
	$('#edit_facility').on('show.bs.offcanvas', function (event) {
		var button = $(event.relatedTarget);
		const fId = button.data('id');
		const fIdentifier = button.data('identifier');
		const fName = button.data('name');
		const fStatus = button.data('status');	
		
		const modal = $(this);
		const identifier = modal.find("input[name=identifier]");
		const name = modal.find("input[name=name]");
		const status = modal.find("input[name=status]");

		identifier.val(fIdentifier);
		name.val(fName);

		if(fStatus == 'active') {
			status.prop('checked', true);
		} else {
			status.prop('checked', false);
		}

		const dltBtn = modal.find('.edit_facility');
		dltBtn.off('click'); 
		dltBtn.on('click', function(evnt) {
				evnt.preventDefault()
				const f_identifier = identifier.val().trim();
				const f_name = name.val().trim();
				
				let isValid = true;

				if (!isValidName(f_identifier)) {
					if(!identifier.hasClass('is-invalid')) {
						$("<div class='invalid-feedback'>Please enter Facility id.</div>").insertAfter(identifier);
						identifier.addClass('is-invalid');
						isValid = false;
						return true
					}
					isValid = false;
				}
				if (!isValidName(f_name)) {
					if(!name.hasClass('is-invalid')) {
						$("<div class='invalid-feedback'>Please enter valid Facility name.</div>").insertAfter(name);
						name.addClass('is-invalid');
						isValid = false;
						return true
					}
					isValid = false;
				}

				let f_status = (status.is(':checked')) ? 'active' : 'inactive';
				if (isValid) {
					let data = {
						identifier: f_identifier,
						name: f_name,
						status: f_status
					}
					console.log(data)	
					data = JSON.stringify(data);


					$.ajax({
						type: 'POST',
						url: '/api/update-facility/' + fId,	
						data: data,
						contentType: "application/json; charset=utf-8",
						dataType: "json",
						success: function(response) {
							if (response.success) {
								var t;
								Swal.fire({
									title: "Facilty Edited Sussfully!",
									html: `Facility will be reloaded in <strong>${t}</strong> milliseconds.`,
									timer: 2e3,
									confirmButtonClass: "btn btn-primary",
									buttonsStyling: !1,
									onBeforeOpen: function () {
									Swal.showLoading(),
										(t = setInterval(function () {
										Swal.getContent().querySelector("strong").textContent =
											Swal.getTimerLeft();
										}, 100));
									},
									onClose: function () {
										clearInterval(t);
									},
								}).then(function (t) {
									t.dismiss === Swal.DismissReason.timer && location.reload();
								});
							} 
						},
						error: function(error) {
							Swal.fire({
								title: "Error",
								text: "Error Found!",
								icon: "error",
								confirmButtonClass: "btn btn-primary",
								buttonsStyling: !1,
							});
						}
					});

				}
				
			
		})
	})
}
const isValidName = (name) => {
	if (typeof name !== 'string') {
		return false;
	}
	const trimmedName = name.trim();
	if (trimmedName === '') {
		return false;
	}
	const nameRegex = /^[a-zA-Z\s'-]+$/;
	return nameRegex.test(trimmedName);
}
const addFacility = () => {
	$('#addFacilityForm').submit(function(e) {
		e.preventDefault(); 
		const identifier = $(this).find("input[name=identifier]");
		const name = $(this).find("input[name=name]");
		const status = $(this).find("input[name=status]");
		const f_identifier = identifier.val().trim();
		const f_name = name.val().trim();
		

		let isValid = true;

		if (!isValidName(f_identifier)) {
			if(!identifier.hasClass('is-invalid')) {
				$("<div class='invalid-feedback'>Please enter Facility id.</div>").insertAfter(identifier);
				identifier.addClass('is-invalid');
				isValid = false;
				return true
			}
			isValid = false;
        }
		if (!isValidName(f_name)) {
			if(!name.hasClass('is-invalid')) {
				$("<div class='invalid-feedback'>Please enter valid Facility name.</div>").insertAfter(name);
				name.addClass('is-invalid');
				isValid = false;
				return true
			}
			isValid = false;
        }

		let f_status = (status.is(':checked')) ? 'active' : 'inactive';
		
		
		if (isValid) {
			let data = {
				id: f_identifier,
				name: f_name,
				status: f_status
			}
			data = JSON.stringify(data)
	
	
			$.ajax({
				type: 'POST',
				url: '/api/add-facility',
				data: data,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
				success: function(response) {
	
					if (response.success) {
						var t;
						Swal.fire({
							title: "Facilty Added Sussfully!",
							html: `Facility will be reloaded in <strong>${t}</strong> milliseconds.`,
							timer: 2e3,
							confirmButtonClass: "btn btn-primary",
							buttonsStyling: !1,
							onBeforeOpen: function () {
							Swal.showLoading(),
								(t = setInterval(function () {
								Swal.getContent().querySelector("strong").textContent =
									Swal.getTimerLeft();
								}, 100));
							},
							onClose: function () {
								clearInterval(t);
							},
						}).then(function (t) {
							t.dismiss === Swal.DismissReason.timer && location.reload();
						});
						
					} 
				},
				error: function(error) {
					Swal.fire({
						title: "Error",
						text: "Error Found!",
						icon: "error",
						confirmButtonClass: "btn btn-primary",
						buttonsStyling: !1,
					});
				}
			});
		}
	})
}	




const facilityPage = {
	onReady: function() {
		addFacility();
		deleteFacility();
		editFacility();
	},
	onload: function() {
		appendFacility();
	}
}

$(document).ready(facilityPage.onReady)
$(window).on('load', facilityPage.onload);
