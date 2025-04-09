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
}