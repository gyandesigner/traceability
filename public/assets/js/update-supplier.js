const updateSupplierFormData = async (data) => {
	try {
		if (!data) {
			Swal.fire({
				title: "Error",
				text: "Please fill all the fields",
				icon: "error",
				confirmButtonClass: "btn btn-primary",
				buttonsStyling: !1,
			})
			return true
		}
		const id = data._id;
		const bodyData = JSON.stringify(data);
		const response = await fetch(`/api/update-supplier/${id}`, {
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
const updateSupplier = () => {	
	$('#update-supplier').submit(function(e) {     		
		e.preventDefault(); 
		const id = $(this).find("input[name=id]");
		const name = $(this).find("input[name=name]");
		const email = $(this).find("input[name=email]");
		const mobile = $(this).find("input[name=mobile]");
		const address = $(this).find("input[name=address]");
		const country = $(this).find("select[name=country]");
		const city = $(this).find("input[name=city]");
		const state = $(this).find("input[name=state]");
		const agent = $(this).find("input[name=agent]");
		const registrationId = $(this).find("input[name=registrationId]");
		const facility = $(this).find("input[name='facility']:checked");


		const idVal = id.val().trim();
		const nameVal = name.val().trim();
		const emailVal = email.val().trim();
		const mobileVal = mobile.val().trim();
		const addressVal = address.val().trim();
		const countryVal = country.val().trim();
		const cityVal = city.val().trim();
		const stateVal = state.val().trim();
		const agentVal = agent.val().trim();
		const registrationIdVal = registrationId.val().trim();
		const facilityVal = Array.from(facility);
		
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.is-invalid').removeClass('is-invalid');

		if (!helperJS.isValidString(nameVal) || nameVal.length === 0) {
			if(!name.hasClass('is-invalid')) {
				$(`<div class='invalid-feedback'>Facility name contains special characters or numbers.</div>`).insertAfter(name);
				name.addClass('is-invalid');
				return true;
			}
			name.focus()
			isValid = false;
			return true
		}
		name.removeClass('is-invalid')

		if (!helperJS.isValidEmail(emailVal)) {
			$("<div class='invalid-feedback'>Please enter correct email.</div>").insertAfter(email);
            email.addClass('is-invalid');
            isValid = false;
        }

		if (!helperJS.isValidNumber(mobileVal)) {
			$("<div class='invalid-feedback'>Please enter valid number.</div>").insertAfter(mobile);
			mobile.addClass('is-invalid');
			isValid = false;
		}

		
		if (addressVal === '') {
			$("<div class='invalid-feedback'>Please enter address.</div>").insertAfter(address);
            address.addClass('is-invalid');
            isValid = false;
        }

				
		if (countryVal === '0') {
			$("<div class='invalid-feedback'>Please select valid country.</div>").insertAfter(country);
            country.addClass('is-invalid');
            isValid = false;
        }

		if (cityVal === '') {
			$("<div class='invalid-feedback'>Please enter valid city name.</div>").insertAfter(city);
            city.addClass('is-invalid');
            isValid = false;
        }

		if (stateVal === '') {
			$("<div class='invalid-feedback'>Please enter valid state name.</div>").insertAfter(state);
            state.addClass('is-invalid');
            isValid = false;
        }

		if (agentVal === '') {
			$("<div class='invalid-feedback'>Please enter agent name.</div>").insertAfter(agent);
            agent.addClass('is-invalid');
            isValid = false;
        }

		const selFacility = facilityVal.map(checkbox => checkbox.value).toString();
			
		if (isValid) {
			const data = {
				_id: idVal,
				name: nameVal,
				email: emailVal,
				mobile: mobileVal,
				address: addressVal,
				country: countryVal,
				city: cityVal,
				state: stateVal,
				agent: agentVal,
				facility: selFacility,
				registrationId: registrationIdVal,
			}
			updateSupplierFormData(data)						
		}	
	})

}
const supplierList = {
	onReady: function() {
		console.log("DOM is Ready!")
	},
	onload: function() {
		updateSupplier()
	}
}

$(document).ready(supplierList.onReady)
$(window).on('load', supplierList.onload);
