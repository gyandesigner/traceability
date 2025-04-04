$(document).ready(function(){

	function isValidName(name) {
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

	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}


	function isStrongPassword(password) {
		if (typeof password !== 'string') {
		  return false; // Not a string, so not strong
		}
	  
		const minLength = 8;
		const hasUppercase = /[A-Z]/.test(password);
		const hasLowercase = /[a-z]/.test(password);
		const hasNumbers = /[0-9]/.test(password);
		const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
	  
		return (
		  password.length >= minLength &&
		  hasUppercase &&
		  hasLowercase &&
		  hasNumbers &&
		  hasSpecialChars
		);
	}

	function checkPasswordMatch(enteredPassword, storedHashedPassword) {
		return enteredPassword === storedHashedPassword;
	}

	$('#registerForm').submit(function(e) {
        e.preventDefault(); 

		const name = $(this).find("input[name=name]");
		const email = $(this).find("input[name=email]");
		const password = $(this).find("input[name=password]");
		const conPassword = $(this).find("input[name=confirmPassword]");


		const userName = name.val().trim();
		const userEmail = email.val().trim();
		const userPassword = password.val().trim();
		const userConPassword = conPassword.val().trim();

		let isValid = true;



		$('.invalid-feedback').hide();
		$('.is-invalid').removeClass('is-invalid');

		// Name validation
		if (!isValidName(userName)) {
			$("<div class='invalid-feedback'>Please enter you name.</div>").insertAfter(name);
			name.addClass('is-invalid');
			isValid = false;
			return true;
		}

		// Email validation
		if (!isValidEmail(userEmail)) {
			$("<div class='invalid-feedback'>Please enter correct email.</div>").insertAfter(email);
            email.addClass('is-invalid');
            isValid = false;
			return true;
        }

		// Password validation
		if (!isStrongPassword(userPassword)) {
			$("<div class='invalid-feedback'>Password is less then 8 and not strong.</div>").insertAfter(password);
            password.addClass('is-invalid');
			isValid = false;
			return true;
		}

		// Password Match validation
		if (!checkPasswordMatch(userPassword, userConPassword)) {
			$("<div class='invalid-feedback'>Password Passwords do not match.</div>").insertAfter(userConPassword);
			userConPassword.addClass('is-invalid');
			isValid = false;
			return true;
		}

		

		if (isValid) {
			let data = {
				name: userName,
				email: userEmail,
				password: userPassword
			}
			data = JSON.stringify(data)



			$.ajax({
                type: 'POST',
                url: '/create-user',
                data: data,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
                success: function(response) {
					window.location.href = '/dashboard';
                },
                error: function(error) {
                    console.log(error)
                    console.log("XXXXXXXXX error")
                }
            });
		}
	})
});
