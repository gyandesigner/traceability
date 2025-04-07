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
const isValidEmail = (email)  => {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
const isValidNumber = (number)  => {
	const mobRegex = /^\+?(?:[0-9] ?){6,14}[0-9]$/;
	return mobRegex.test(number);
}

const addSupplierForm = () => {
	
	$('#add-supplier').submit(function(e) {     
		
		e.preventDefault(); 
		const name = $(this).find("input[name=name]");
		const email = $(this).find("input[name=email]");
		const mobile = $(this).find("input[name=mobile]");
		const address = $(this).find("input[name=address]");
		const country = $(this).find("select[name=country]");
		const city = $(this).find("input[name=city]");
		const state = $(this).find("input[name=state]");
		const agent = $(this).find("input[name=agent]");
		const facility = $(this).find("input[name='facility']:checked");


		const nameVal = name.val().trim();
		const emailVal = email.val().trim();
		const mobileVal = mobile.val().trim();
		const addressVal = address.val().trim();
		const countryVal = country.val().trim();
		const cityVal = city.val().trim();
		const stateVal = state.val().trim();
		const agentVal = agent.val().trim();
		const facilityVal = Array.from(facility);
		
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.is-invalid').removeClass('is-invalid');

		if (!isValidName(nameVal)) {
			$("<div class='invalid-feedback'>Please enter you name.</div>").insertAfter(name);
			name.addClass('is-invalid');
			isValid = false;
		}

		if (!isValidEmail(emailVal)) {
			$("<div class='invalid-feedback'>Please enter correct email.</div>").insertAfter(email);
            email.addClass('is-invalid');
            isValid = false;
        }

		if (!isValidNumber(mobileVal)) {
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
			let data = {
				name: nameVal,
				email: emailVal,
				mobile: mobileVal,
				address: addressVal,
				country: countryVal,
				city: cityVal,
				state: stateVal,
				agent: agentVal,
				facility: selFacility,
			}

			data = JSON.stringify(data)

			$.ajax({
                type: 'POST',
                url: '/api/add-supplier',
                data: data,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
                success: function(response) {
					if (response.success) {
						alert('Facility added successfully!');
						
					} else {
						alert('Error: ' + data.message);
					}
                },
                error: function(error) {
					console.log(error)
                }
            });
		}
	})

}
const supplierList = {
	onReady: function() {
		console.log("DOM is Ready!")
	},
	onload: function() {
		addSupplierForm()
	}
}

$(document).ready(supplierList.onReady)
$(window).on('load', supplierList.onload);
