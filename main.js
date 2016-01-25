function Md5Hashing(username, email, password, cycle) {
    var username = username,
        email = email,
        password = password,
        cycle = cycle;

    this.alg = new Hashes.MD5;

    this.getHash = function (hash, cycle) {
        var width = 0;
        for(var i = 1; i <= cycle; i++) {
            hash = this.alg.hex(hash);
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
            var getHash = this.getHash.bind(this),
                getHashPassword = this._getHashPassword.bind(this);
            $('.spinner').css('display', 'block');
            return getHashPassword(getHash);
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

    this.alg = new Hashes.SHA1;
}


