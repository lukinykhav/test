define(['hash'], function (Person) {
    require(
        Person,
        function () {
            $(document).ready(function () {
//        $('input').val('');
                $('.hash').on('click', function () {
                    $('.has-error').remove();
                    $('.progress-bar').css('width', '0%');
                    var person = new Person($('#username').val(), $('#email').val(), $('#pwd').val(), $('#cycle').val());
                    person.getPassword();
                })
            });

        }
    );
});