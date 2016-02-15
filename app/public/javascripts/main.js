$(document).ready(function() {
    if(localStorage.length > 0) {
        $('.container').load('../views/main.html', function() {
            $('h1').append(localStorage.getItem("name"));
        });
    }

    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $("#register-form").delay(100).fadeIn(100);
        $("#register-form").prop('disabled', true);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });

    $('.btn').on('click', function() {
        var options,
            form = $(this).parents('form'),
            email = form.find('input.email').val(),
            password = form.find('input.password').val();
            username = $('#username').val(),
            person = new Sha256Hashing(username, email, password, 10000),
            hash = person.getPassword();

        $(this).is('#register-submit') ? options = ['/signup', {username: username, email: email, hash: hash}, toLogin] : options = ['/signin', {email: email, hash: hash}, loadProfile];

        $.ajax({
            type: "POST",
            url: options[0],
            data: options[1],
            success: options[2]
        });
    });

    var toLogin = function(res) {
        if(res) {
            $("#login-form").delay(100).fadeIn(100);
            $("#register-form").fadeOut(100);
            $('#register-form-link').removeClass('active');
            $(this).addClass('active');
        }
        else {
            console.log('this email exists');
        }
    };

    var loadProfile = function(username) {
        var form = $(this).parents('form'),
            email = form.find('input.email').val(),
            password = form.find('input.password').val();

        if ($('#remember:checked').length) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("name", username);
        }
        if(username) {
            $('.container').load('views/main.html', function() {
                $('h1').append(username);
            });
        }
        else {
            console.log('incorrect email or password');
        }
    }

});

