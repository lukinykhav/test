$(document).ready(function() {
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
        var form = $(this).parents('form');
        var username = $('#username').val(),
            email = form.find('input.email').val(),
            password = form.find('input.password').val();
        var person = new Sha256Hashing(username, email, password, 10000),
            hash = person.getPassword();

        if($(this).is('#register-submit')){
            $.ajax({
                type: "POST",
                url: '/signup',
                data: {username: username, email: email, hash: hash},
                success: function(res) {
                    if(res) {
                        $("#login-form").delay(100).fadeIn(100);
                        $("#register-form").fadeOut(100);
                        $('#register-form-link').removeClass('active');
                        $(this).addClass('active');
                    }
                    else {
                        console.log('this email exists');
                    }
                }
            });
        }
        else if($(this).is('#login-submit')) {
            $.ajax({
                type: "POST",
                url: '/signin',
                data: {email: email, hash: hash},
                success: function (username) {
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
        }
    });
});

