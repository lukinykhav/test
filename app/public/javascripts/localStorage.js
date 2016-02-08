$(document).ready(function() {
    $('.remember').on('click', function () {
        if ($('.remember:checked').length) {
            localStorage.setItem("email", $('#email').val());
            localStorage.setItem("password", $('#pwd').val());
        }
    });

    if (localStorage.length) {
        $('#email').val(localStorage.email);
        $('#pwd').val(localStorage.password);
    }
});