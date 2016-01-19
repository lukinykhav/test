function Person(username, email, password, cycle) {
    var username = username,
        email = email,
        password = password,
        cycle = cycle;

    var getHash = function (hash, cycle, width) {
        if (width < 100) {
            width += Math.round(100/cycle);
            $('.progress-bar').css('width', width + '%');
        }
        if (cycle) {
            cycle -=1;
            return getHash(md5(hash), cycle, width);
        }
        return hash;
    };

    this.getUsername = function () {
        return username;
    };

    this.getEmail = function () {
        return email;
    };

    this.getPassword = function () {
        return this._getHashPassword(getHash);
    };

    this.getCycle = function () {
        return cycle;
    };

    this._getHashPassword = function (callback) {
        var deferred = new $.Deferred(),
            hash = password,
            width = 0,
            cycle = this.getCycle();

        $('.spinner').css('display', 'block');

        setTimeout(function() {
            hash = callback(password, cycle, width);
            if (hash !== password) {
                deferred.resolve(hash);
            }
            else {
                deferred.reject();
            }
        }, 0);

        deferred.done(function(hash) {
            $('.spinner').css('display', 'none');
            $('#hash').val(hash);
        });
        deferred.fail(function() {
            $('.spinner').css('display', 'none');
            console.log('error');
        });

        return deferred.promise();
    };

}