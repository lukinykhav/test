$(document).ready(function() {
//        $('input').val('');
    $(function(){
        $(".dropdown-menu li a").click(function(){
            $(".dropdown-toggle").text($(this).text());
            $(".dropdown-toggle").val($(this).text());
        });
    });

    $('.hash').on('click', function() {
        var hash_func = $(".dropdown-toggle").val();
        $('.has-error').remove();
        $('.progress-bar').css('width', '0%');
        var person = new Sha256Hashing($('#username').val(), $('#email').val(), $('#pwd').val(), 10000);
        person.getPassword();
    })
});
