const helperJS = {
	alertBox: (type, message, delay = 10000) => {
		$('.alertMsg.active').remove();
		$('body').append(
		$('<div/>', { class: "alertMsg " + type + " active" }).append(
			$('<div/>', { class: "iconBox" }).append(
				$('<span/>').append($('<img/>', { class: 'img-responsive', src: '/assets/images/alert/' + type + '.svg' }))
			),
			$('<div/>', { class: "msgBody" }).append(
				$('<em/>', { class: "icon-close" }).on('click', function () {
					$(this).closest('.alertMsg').remove();
				}),
				$('<strong/>', { text:helperJS.ucfirst(type)}),
				$('<p/>', { text: message }),
			)
		).delay(delay).queue(function() { $(this).remove() })
		)
	},
	textCamelCase: (name) => {
		if (!name) { return ""; }
		const parts = name.toLowerCase().split(' ');
		const capitalizedParts = parts.map(part => {
			if (part.length > 0) {
			  return part.charAt(0).toUpperCase() + part.slice(1);
			}
			return "";
		});
		return capitalizedParts.join(' ');
	},
	textUpperCase: (name) => {
		if (!name) { return ""; }
		const parts = name.toLowerCase().split(' ');
		const capitalizedParts = parts.map(part => {
			if (part.length > 0) {
			  return part.charAt(0).toUpperCase() + part.slice(1);
			}
			return "";
		});
		return capitalizedParts.join(' ').toUpperCase();
	},
	isValidString: (string) => {
		const specialCharNumberRegex = /[^a-zA-Z\s]/;
		const trimmedStr = string.trim();
		if (specialCharNumberRegex.test(trimmedStr)) {
		  return false;
		} 
		return true; 
	},
	isValidEmail: (email)  => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	},
	isValidNumber: (number)  => {
		const mobRegex = /^\+?(?:[0-9] ?){6,14}[0-9]$/;
		return mobRegex.test(number);
	},
	ucfirst: (string) => {
		if (!string) { return ""; }
		return string.charAt(0).toUpperCase() + string.slice(1);
	},
}