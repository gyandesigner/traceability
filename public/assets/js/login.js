function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
function isValidPassword(password) {
	// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const passwordRegex = /^.{9,}$/;
	return passwordRegex.test(password);
}
const loginUserCheck = async (data) => {
	try {
        const response = await fetch('/api/user-login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: data // Ensure 'data' is a JSON string
        });

        if (!response.ok) {
            const error = await response.json();
            throw error; // Throw the parsed JSON error
        }

        const responseData = await response.json();
        if (responseData.success) {
            localStorage.setItem('accessToken', data.accessToken); // Adjust as needed based on server response
            window.location.replace('/dashboard');
        }
    } catch (error) {		
        if (error && error.message) {
			Swal.fire({
				title: "Error",
				text: error.message || "Some error found, Please try again later",
				icon: "error",
				confirmButtonClass: "btn btn-primary",
				buttonsStyling: !1,
			})
        } else {
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
$(document).ready(function(){
	$('#loginForm').submit(function(e) {
        e.preventDefault(); 
		const email = $(this).find("input[name=email]");
		const password = $(this).find("input[name=password]");
		const emailVal = email.val().trim();
		const passwordVal = password.val().trim();
		let isValid = true;
		$('.invalid-feedback').hide();
		$('.is-invalid').removeClass('is-invalid');
		  // Email validation
		if (!isValidEmail(emailVal)) {
			$("<div class='invalid-feedback'>Please enter correct email.</div>").insertAfter(email);
            email.addClass('is-invalid');
            isValid = false;
        }
		// Password validation
		if (!isValidPassword(passwordVal)) {
			$("<div class='invalid-feedback'>Password is less then 8.</div>").insertAfter(password);
            password.addClass('is-invalid');
			isValid = false;
		}
		if (isValid) {
			let data = {
				email: emailVal,
				password: passwordVal
			}
			data = JSON.stringify(data)
			loginUserCheck(data)
		}
	})
});
