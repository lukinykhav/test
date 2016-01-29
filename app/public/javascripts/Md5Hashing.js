function Md5Hashing(username, email, password, cycle) {
    var username = username,
        email = email,
        password = password,
        cycle = cycle;

    this.alg = new Hashes.MD5;

    this.getUsername = function () {
        return username;
    };

    this.getEmail = function () {
        return email;
    };

    this.getPassword = function () {
        if (password === '') {
            $('.pwd').append("<div class='has-error'><p>Enter password</p></div>");
        } else {
            $('.spinner').css('display', 'block');
            var width = 0,
                hash = password;
            for (var i = 1; i <= cycle; i++) {
                hash = this.alg.hex(hash);
                width = 100 / cycle * i;
                $('.progress-bar').css('width', width + '%');
            }

            $('.spinner').css('display', 'none');
            return hash;
        }
    };

    this.getCycle = function () {
        if (cycle > 10000) {
            $('.cycle').append("<div class='has-error'><p>Iteration mustn't greater than 10000</p></div>");
            $('#hash').val('');
        } else {
            return cycle;
        }
    };

}