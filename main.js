function Person(username, email, password, cycle) {
    var username = username,
        email = email,
        password = password,
        cycle = cycle;

    this.getHash = function (hash, cycle) {
        for(var i = 0; i < cycle; i++) {
            hash = md5(hash);
            $('.progress-bar').css('width', 100/cycle*i + '%');
        }
        $(".hash").attr("disabled", false).show();
        $("#hash").attr("disabled", false).show();
        $('.spinner').css('visibility', 'hidden');
        return hash;
    };

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
            return this._getHashPassword(this.getHash);
        }
    };

    this.getCycle = function () {
        if (cycle > 10000) {
            $('.cycle').append("<div class='has-error'><p>Iteration mustn't greater than 10000</p></div>");
        } else {
            return cycle;
        }
    };

    this._getHashPassword = function (callback) {
        var deferred = new $.Deferred(),
            hash = password,
            cycle = this.getCycle();
            $('.spinner').css('visibility', 'visible');
            $(".hash").attr("disabled", true).hide();
            $("#hash").attr("disabled", true).hide();

            setTimeout(function() {
                hash = callback(password, cycle);
                if (hash !== password) {
                    deferred.resolve(hash);
                }
                else {
                    deferred.reject();
                }
            }, 0);

            deferred.done(function(hash) {
                $('#hash').val(hash);
            });
            deferred.fail(function() {
                console.log('error');
            });

            return deferred.promise();
    };

}