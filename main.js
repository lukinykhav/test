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
        return md5(hash);
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
            while(cycle) {
                hash = callback(hash, cycle, width);
                cycle -=1;
            }
            if (hash !== password) {
                deferred.resolve(hash);
            }
            else {
                setTimeout(function () {
                   deferred.reject();
                }, 0);
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