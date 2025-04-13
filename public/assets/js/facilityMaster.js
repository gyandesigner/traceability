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
					let date = new Date(row['created_at']);
					let options = { day: '2-digit', month: '2-digit', year: 'numeric' };
					let formattedDate = date.toLocaleDateString('en-in', options);
					return formattedDate;
				}},
				{ "render": function ( data, type, row ){
					return '' + row['creater_name'] + '';
				}},	
				{ "render": function ( data, type, row ){
					return '' + row['id'] + '';
				}},
				{ "render": function ( data, type, row ){
					return '' + row['name'] + '';
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
					const fName = helperJS.textCamelCase(row['name']);
					return '<div class="dropdown table-action text-end">' +
                           '<a href="#" class="action-icon " data-bs-toggle="dropdown" aria-expanded="false"><i class="fa fa-ellipsis-v"></i></a>' +
                           '<div class="dropdown-menu dropdown-menu-right">' +
                               '<a class="dropdown-item edit-facility" href="javascript:void(0);" data-bs-toggle="offcanvas" data-bs-target="#edit_facility" data-id="' + row['_id'] + '" data-fid="' + row['id'] + '" data-name="' + fName + '" data-status="' + row['status'] + '"><i class="ti ti-edit text-blue"></i> Edit</a>' + 
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
const addFacilitydata = async (data) => {
	try {
		const bodyData = JSON.stringify(data);
        const response = await fetch('/api/add-facility', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: bodyData 
        });

        if (!response.ok) {
            const error = await response.json();
            throw error; 
        }

        const responseData = await response.json();
        if (responseData.success) {
			if (responseData.success) {
				var t;
				Swal.fire({
					title: "Facilty Added Sussfully!",
					html: `Page will be reloaded in <strong>${t}</strong> milliseconds.`,
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
        }
    } catch (error) {		
        if (error && error.message) {
			console.log(error.message)
			Swal.fire({
				title: "Error",
				text: error.message || "Some error found, Please try again later",
				icon: "error",
				confirmButtonClass: "btn btn-primary",
				buttonsStyling: !1,
			})
        } else {
			console.log(error)
			Swal.fire({
				title: "Error",
				text: "Login Failed: An unexpected error occurred.",
				icon: "error",
				confirmButtonClass: "btn btn-primary",
				buttonsStyling: !1,
			})
        }
    }
}
const addFacility = () => {
	$('#add_facility_form').submit(function(e) {
		e.preventDefault(); 
		const fname = $(this).find("input[name=name]");
		const fId = $(this).find("input[name=identifier]");
		const fNameVal = fname.val().trim();
		const fIdVal = fId.val().trim();
		const fStatus = $(this).find("input[name=status]");		
		let isValid = true;
		if (!helperJS.isValidString(fNameVal) && fNameVal.length > 0) {
			if(!fname.hasClass('is-invalid')) {
				$(`<div class='invalid-feedback'>Facility name contains special characters or numbers.</div>`).insertAfter(fname);
				fname.addClass('is-invalid');
			}
			fname.focus()
			isValid = false;
			return true
		}
		if (!helperJS.isValidString(fIdVal) && fIdVal.length > 0) {
			if(!fId.hasClass('is-invalid')) {
				$(`<div class='invalid-feedback'>Facility Id contains special characters or numbers.</div>`).insertAfter(fId);
				fId.addClass('is-invalid');
			}
			fId.focus()
			isValid = false;
			return true
		}
		let f_status = (fStatus.is(':checked')) ? 'active' : 'pending';
		const camelName = helperJS.textCamelCase(fNameVal);
		const upperId = helperJS.textUpperCase(fIdVal);	
		let data = {
			id: upperId,
			name: camelName,
			status: f_status
		}		
		if (isValid) {			
			addFacilitydata(data)
		}
	})
}	
const updateFacilitydata = async (data) => {
	try {
		if(!data) {
			throw new Error('No data found!')
		}
		const { _id } = data;
		const bodyData = JSON.stringify(data);
        const response = await fetch(`/api/update-facility/${_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: bodyData 
        });
        if (!response.ok) {
            const error = await response.json();
            throw error; 
        }

        const responseData = await response.json();
        if (responseData.success) {
			var t;
			Swal.fire({
				title: "Facilty Updated Successfully!",
				html: `Pgae will be reloaded in <strong>${t}</strong> milliseconds.`,
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
    } catch (error) {		
		if (error && error.message) {
			console.log(error.message)
			Swal.fire({
				title: "Error",
				text: error.message || "Some error found, Please try again later",
				icon: "error",
				confirmButtonClass: "btn btn-primary",
				buttonsStyling: !1,
			})
        } else {
			console.log(error)
			Swal.fire({
				title: "Error",
				text: "Update Failed: An unexpected error occurred.",
				icon: "error",
				confirmButtonClass: "btn btn-primary",
				buttonsStyling: !1,
			})
        }
    }
}
const editFacility = () => {
	$('#edit_facility').on('show.bs.offcanvas', function (event) {
		event.stopPropagation();
		var button = $(event.relatedTarget);
		const g_id = button.data('id');
		const g_fId = button.data('fid');
		const g_fName = button.data('name');
		const g_fStatus = button.data('status');	
	
		const modal = $(this);
		const identifier = modal.find("input[name=identifier]");
		const name = modal.find("input[name=name]");
		const status = modal.find("input[name=status]");

		identifier.val(g_fId);
		name.val(g_fName);

		if(g_fStatus == 'active') {
			status.prop('checked', true);
		} else {
			status.prop('checked', false);
		}

		$('#edit_facility_from').submit(function(event) {
			event.preventDefault();
			const fNameVal = name.val().trim();
			const fIdVal = identifier.val().trim();
			const f_status = (status.is(':checked')) ? 'active' : 'pending';

			let isValid = true;
			if (!helperJS.isValidString(fNameVal) && fNameVal.length > 0) {
				if(!name.hasClass('is-invalid')) {
					$(`<div class='invalid-feedback'>Facility name contains special characters or numbers.</div>`).insertAfter(name);
					name.addClass('is-invalid');
				}
				name.focus()
				isValid = false;
				return true
			}
			name.removeClass('is-invalid')
			if (!helperJS.isValidString(fIdVal) && fIdVal.length > 0) {
				if(!identifier.hasClass('is-invalid')) {
					$(`<div class='invalid-feedback'>Facility Id contains special characters or numbers.</div>`).insertAfter(identifier);
					identifier.addClass('is-invalid');
				}
				identifier.focus()
				isValid = false;
				return true
			}
			identifier.removeClass('is-invalid')
			
			const camelName = helperJS.textCamelCase(fNameVal);
			const upperId = helperJS.textUpperCase(fIdVal);	

			const data = {
				_id: g_id,
				id: upperId,
				name: camelName,
				status: f_status
			}	
			
			if (isValid) {
				updateFacilitydata(data)
			}				
		})
	})
}
const deleteFacility = () => {
	$('#delete_facility').on('show.bs.modal', function (event) {
		var button = $(event.relatedTarget);
		console.log(button)
		let facilityId = button.data('id')
		
		const modal = $(this)
		const dltBtn = modal.find('.delete-confirm');
		dltBtn.off('click');
		dltBtn.on('click', function(evnt) {
			evnt.preventDefault()
			$('#delete_facility').modal('hide')
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
