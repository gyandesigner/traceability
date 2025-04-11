const appendSupplier = () => {
	if($('#supplire-list').length > 0) {
		$('#supplire-list').DataTable({
			"data":supplier_data,
			"columns": [
				{ "data": "id" },
				{ "data": "name" },
				{ "data": "email" },
				{ "data": "mobile" },
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
