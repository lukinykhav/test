function Person(username, email, password, cycle) {
    var username = username,
        email = email,
        password = password,
        cycle = cycle;

    var getHash = function (hash, cycle, width) {
        hash = md5(hash);
        if (width < 100) {
            width += Math.round(100/cycle);
            $('.progress-bar').css('width', width + '%');
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
        var hash = password,
            width = 0,
            cycle = this.getCycle();
        while(cycle) {
            hash = callback(hash, cycle, width);
            cycle -=1;
        }
        return hash;
    };

}