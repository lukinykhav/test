function Md5Hashing(username, email, password, cycle) {
    var username = username,
        email = email,
        password = password,
        cycle = cycle;

    this.getHash = function (hash, cycle) {
        console.log('md5');
        var width = 0;
        for(var i = 1; i <= cycle; i++) {
            hash = md5(hash);
            width = 100/cycle*i;
            $('.progress-bar').css('width', width + '%');
        }

        $('.spinner').css('display', 'none');
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

function ShaHashing(username, email, password, cycle) {
    Md5Hashing.apply(this, arguments);

    this.getHash = function (hash, cycle) {
        console.log('sha1');
        var SHA1 = new Hashes.SHA1;
        for(var i = 0; i < cycle; i++) {
            hash = SHA1.hex(hash);
            $('.progress-bar').css('width', 100/cycle*i + '%');
        }

        $('.spinner').css('display', 'none');
        return hash;
    };
}

