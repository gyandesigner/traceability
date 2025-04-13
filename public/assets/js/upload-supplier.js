const uploadSupplierFormData = async (data) => {
	try {
		const response = await fetch(`/api/upload-supplier`, {
			method: 'POST',
			body: data 
		});

		if (!response.ok) {
			const error = await response.json();
			throw error; 
		}

		const responseData = await response.json();
		if (responseData.success) {
			
			var t;
			Swal.fire({
				title: "Supplier Updated Sussfully!",
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
	} catch (error) {		
		console.log(error)
		if (error && error.message) {
			console.log(error.message)
			Swal.fire({
				title: "Error",
				text: error.message || "Some error found, Please try again later",
				icon: "error",
				confirmButtonClass: "btn btn-primary",
				buttonsStyling: !1,
			}).then(function (t) {
				location.reload();
			});
		} else {
			console.log(error)
			Swal.fire({
				title: "Error",
				text: "Login Failed: An unexpected error occurred.",
				icon: "error",
				confirmButtonClass: "btn btn-primary",
				buttonsStyling: !1,
			}).then(function (t) {
				location.reload();
			})
		}
	}
	
}
const uploadSupplier = () => {	
	const form = document.getElementById('upload_supplier_from');

	form.addEventListener('submit', async (event) => {
		event.preventDefault();
		const formData = new FormData(form);
		uploadSupplierFormData(formData)
	})


	// uploadForm.submit(function(event) {    
		// event.preventDefault();
		// const getfile = $(this).find("input[name=excelFile]");
		
		// const file = getfile[0].files[0];

		// if (!file) {
		// 	alert("please select file");
		// 	return true;
		// }

		// let isValid = true;
		// const allowedTypes = ['.xlsx', '.xls'];
		// const fileExtension = file.name.substring(file.name.lastIndexOf('.')).toLowerCase();
		// if (!allowedTypes.includes(fileExtension)) {
		// 	console.log("Please upload a valid .xls or .xlsx file.")
		// 	isValid = false;
		// }

	// 	let isValid = true
	// 	var formData = new FormData(this);

	// 	if (isValid) {
	// 		const formData = new FormData($(this)[0]);
	// 		uploadSupplierFormData(formData)						
	// 	}	
	// })

}
const supplierList = {
	onReady: function() {
		console.log("DOM is Ready!")
	},
	onload: function() {
		uploadSupplier()
	}
}

$(document).ready(supplierList.onReady)
$(window).on('load', supplierList.onload);
