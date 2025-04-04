function isValidEmail(email) {
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return emailRegex.test(email);
}
function isValidPassword(password) {
	// const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	const passwordRegex = /^.{9,}$/;
	return passwordRegex.test(password);
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


			$.ajax({
                type: 'POST',
                url: '/user-login',
                data: data,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
                success: function(response) {
                    if(response.success) {
						localStorage.setItem('accessToken', data.accessToken);
						window.location.replace('/dashboard');
					}
                },
                error: function(error) {
					console.log(error)
                }
            });
		}
	})
});
