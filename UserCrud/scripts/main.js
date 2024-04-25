$(document).ready(function () {
    $("#submitBtn").click(function (e) {
        e.preventDefault();

        $('.error-message').remove();

        var hasErrors = false;

        var name = $('#name').val().trim();
        if (name === '') {
            $('#name').after('<span class="error-message">Name is required</span>');
            hasErrors = true;
        }
        var email = $('#email').val().trim();
        if (email === '') {
            $('#email').after('<span class="error-message">Email is required</span>');
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            $('#email').after('<span class="error-message">Invalid Email format</span>');
            hasErrors = true;
        }
        var phone = $('#phoneno').val().trim();
        if (phone === '') {
            $('#phoneno').after('<span class="error-message">Phone No. is required</span>');
            hasErrors = true;
        } else if (!isValidPhone(phone)) {
            $('#phoneno').after('<span class="error-message">Invalid Phone No. format (should be 10 digits)</span>');
            hasErrors = true;
        }
        var state = $('#state').val().trim();
        if (state === '') {
            $('#state').after('<span class="error-message">State is required</span>');
            hasErrors = true;
        }
        var city = $('#city').val().trim();
        if (city === '') {
            $('#city').after('<span class="error-message">City is required</span>');
            hasErrors = true;
        }

        function isValidEmail(email) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidPhone(phone) {
            var phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone);
        }

        if (hasErrors) {
            return;
        }

        var formData = {
            Name: $("#name").val(),
            Email: $("#email").val(),
            PhoneNo: $("#phoneno").val(),
            Address: $("#address").val(),
            State: $("#state").val(),
            City: $("#city").val(),
            Agree: $("#Agree").is(":checked")
        };

        $.ajax({
            url: "/user/create",
            type: "POST",
            data: formData,
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    window.location.reload();
                } else {
                    console.error("Save operation failed: " + response.message);
                }
            },
            error: function (xhr, status, error) {
                console.error("Error:", error);
            }
        });
    });
});

$(document).ready(function () {
    $('#UpdateBtn').click(function () {

        $('#name-error').remove();
        $('#email-error').remove();
        $('#phone-error').remove();
        $('#state-error').remove();
        $('#city-error').remove();

        var hasErrors = false;

        var name = $('#editname').val().trim();
        if (name === '') {
            $('#editname').after('<div class="error-message text-danger" id="name-error">Name is required</div>');
            hasErrors = true;
        }
        var email = $('#editemail').val().trim();
        if (email === '') {
            $('#editemail').after('<div class="error-message text-danger" id="email-error">Email is required</div>');
            hasErrors = true;
        } else if (!isValidEmail(email)) {
            $('#editemail').after('<div class="error-message text-danger" id="email-error">Invalid Email format</div>');
            hasErrors = true;
        }
        var phone = $('#editphoneno').val().trim();
        if (phone === '') {
            $('#editphoneno').after('<div class="error-message text-danger" id="phone-error">Phone No. is required</div>');
            hasErrors = true;
        } else if (!isValidPhone(phone)) {
            $('#editphoneno').after('<div class="error-message text-danger" id="phone-error">Invalid Phone No. format (should be 10 digits)</div>');
            hasErrors = true;
        }
        var state = $('#editstate').val().trim();
        if (state === '') {
            $('#editstate').after('<div class="error-message text-danger" id="state-error">State is required</div>');
            hasErrors = true;
        }
        var city = $('#editcity').val().trim();
        if (city === '') {
            $('#editcity').after('<div class="error-message text-danger" id="city-error">City is required</div>');
            hasErrors = true;
        }

        function isValidEmail(email) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        function isValidPhone(phone) {
            var phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone);
        }

        if (hasErrors) {
            return;
        }

        var userData = {
            Id: $('#editid').val(),
            Name: $('#editname').val(),
            Email: $('#editemail').val(),
            PhoneNo: $('#editphoneno').val(),
            Address: $('#editaddress').val(),
            State: $("#editstate").val(),
            City: $("#editcity").val(),
            Agree: $("#editAgree").is(":checked")
        };

        $.ajax({
            url: '/user/edit',
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    window.location.reload();
                } else {
                    console.error("Update operation failed: " + response.message);
                }
            },
            error: function () {
                alert('Error updating user data');
            }
        });
    });
});


$(document).ready(function () {
    $('.edit-btn').click(function () {
        var userId = $(this).data('id');
        $.ajax({
            url: '/user/edit/' + userId,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                $('#editid').val(data.Id);
                $('#editname').val(data.Name);
                $('#editemail').val(data.Email);
                $('#editphoneno').val(data.PhoneNo);
                $('#editaddress').val(data.Address);
                $('#editstate').val(data.State);

                $("#editcity").empty();

                $.get("/User/CityBind", { State_Id: data.State })
                    .done(function (cityData) {
                        var options = "<option> </option>";
                        $.each(cityData, function (i, city) {
                            options += "<option value='" + city.Value + "'>" + city.Text + "</option>";
                        });
                        $("#editcity").html(options);

                        $('#editcity').val(data.City);
                    })
                    .fail(function (xhr, status, error) {
                        console.error("Error fetching cities:", error);
                    });

                $('#editAgree').prop('checked', data.Agree);
            },
            error: function () {
                alert('Error fetching user data');
            }
        });
    });
});

$(document).ready(function () {
    $('.dlt-btn').click(function () {
        var userId = $(this).data('id');
        var confirmDelete = confirm("Are you sure you want to delete this record?");
        if (!confirmDelete) {
            return;
        }
        $.ajax({
            url: '/user/delete/' + userId,
            type: 'POST',
            dataType: 'json',
            success: function (response) {
                if (response.success) {
                    alert(response.message);
                    window.location.reload();
                } else {
                    console.error("Delete operation failed: " + response.message);
                }
            },
            error: function () {
                alert('Error deleting user data');
            }
        });
    });
});





$(document).ready(function () {
    $('#submitBtn').prop('disabled', true);
    $('#Agree').change(function () {
        if ($(this).is(':checked')) {
            $('#submitBtn').prop('disabled', false);
        } else {
            $('#submitBtn').prop('disabled', true);
        }
    });
});


$(document).ready(function () {
    $("#state").change(function () {
        var id = $(this).val();
        $("#city").empty();
        $.get("/User/CityBind", { State_Id: id })
            .done(function (data) {
                var options = "<option> </option>";
                $.each(data, function (i, city) {
                    options += "<option value='" + city.Value + "'>" + city.Text + "</option>";
                });
                $("#city").html(options);
            })
            .fail(function (xhr, status, error) {
                console.error("Error fetching cities:", error);
            });
    });
});

$(document).ready(function () {
    $("#editstate").change(function () {
        var id = $(this).val();
        $("#editcity").empty();
        $.get("/User/CityBind", { State_Id: id })
            .done(function (data) {
                var options = "<option> </option>";
                $.each(data, function (i, city) {
                    options += "<option value='" + city.Value + "'>" + city.Text + "</option>";
                });
                $("#editcity").html(options);
            })
            .fail(function (xhr, status, error) {
                console.error("Error fetching cities:", error);
            });
    });
});