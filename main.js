function Person(username, email, password, cycle) {
    var username = username,
        email = email,
        password = password,
        cycle = cycle;

    var getHash = function (hash) {
        console.log(hash);
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
        var hash = password,
            cycle = this.getCycle(),
            width = 0;
        while(cycle) {
            hash = md5(hash);
            cycle -=1;
            callback(hash);
            while(width < 100) {
                width += 100/cycle;
                $('.progress-bar').css('width', width + '%');
            }
        }
        return hash;
    };

}