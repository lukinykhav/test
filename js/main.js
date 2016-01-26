require(['Md5Hashing', 'Sha1Hashing'], function(Md5Hashing, Sha1Hashing) {
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
            if (hash_func === 'MD5') {
                var person = new Md5Hashing($('#username').val(), $('#email').val(), $('#pwd').val(), $('#cycle').val());
            } else {
                var person = new Sha1Hashing($('#username').val(), $('#email').val(), $('#pwd').val(), $('#cycle').val());
            }
            person.getPassword();
        })
    });
});

