const appendSupplier = () => {
	if($('#supplire-list-table').length > 0) {
		$('#supplire-list-table').DataTable({
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
			"data":supplier_data,
			"columns": [
				{ "data": function (data, type, row, meta) {
                    return meta.row + meta.settings._iDisplayStart + 1;
                } },
				{ "render": function ( data, type, row ){
					let date = new Date(row['created_at']);
					let options = { year: 'numeric', month: '2-digit', day: '2-digit' };
					let formattedDate = date.toLocaleDateString('en-US', options);
					return formattedDate;
				}},
				{ "render": function ( data, type, row ){
					return '' + row['name'] + '';
				}},	
				{ "render": function ( data, type, row ){
					return '' + row['email'] + '';
				}},	
				{ "render": function ( data, type, row ){
					return '' + row['mobile'] + '';
				}},	
				{ "render": function ( data, type, row ){
					return '' + row['agent_name'] + '';
				}},	
				{ "render": function ( data, type, row ){
					return '' + row['address'] + '';
				}},	
				{ "render": function ( data, type, row ){
					return '' + row['country'] + '';
				}},	
				{ "render": function ( data, type, row ){
					return '' + row['city'] + '';
				}},	
				{ "render": function ( data, type, row ){
					return '' + row['state'] + '';
				}},	
				{ "render": function ( data, type, row ){
					return '' + row['facility'] + '';
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
const supplierList = {
	onReady: function() {
		console.log("DOM is Ready!")
	},
	onload: function() {
		appendSupplier();
	}
}

$(document).ready(supplierList.onReady)
$(window).on('load', supplierList.onload);
