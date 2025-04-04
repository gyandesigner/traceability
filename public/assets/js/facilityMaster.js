function deleteFacilityAjax(id) {
    return $.ajax({
      url: '/delete-facility/' + id, // Use the correct URL
      type: 'POST',
      dataType: 'json', // Expect JSON response
    });
}
$(document).ready(function(){
	$(document).on('click', '.delete-item', function() {
		const itemId = $(this).data("id");

		deleteFacilityAjax(itemId).then(data => {
		  	console.log('Deletion result:', data);
		  	if (data.success) {
				alert('Facility deleted successfully!');
				location.reload();
		  	} else {
				alert('Error: ' + data.message);
				location.reload();
		  	}
		}).catch(error => {
		  	console.error('AJAX error:', error);
		  	alert('An error occurred: ' + error.responseJSON.message); 
			location.reload();
		});
	});


	$('#addFacility').submit(function(e) {
        e.preventDefault(); 
		const id = $(this).find("input[name=facilityId]");
		const name = $(this).find("input[name=facilityName]");


		const facilityId = id.val().trim();
		const facilityName = name.val().trim();
		let isValid = true;
		
		
		if (isValid) {
			let data = {
				id: facilityId,
				name: facilityName
			}
			data = JSON.stringify(data)


			$.ajax({
                type: 'POST',
                url: '/add-facility',
                data: data,
				contentType: "application/json; charset=utf-8",
				dataType: "json",
                success: function(response) {

					if (response.success) {
						alert('Facility added successfully!');
						location.reload();
					} else {
						alert('Error: ' + data.message);
						location.reload();
					}
                },
                error: function(error) {
					console.log(error)
                }
            });
		}
	})

	
	
});
