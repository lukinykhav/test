function Person(username, email, password, cycle) {
    this.username = username;
    this.email = email;
    this.password = password;
    this.cycle = cycle;
}

Person.prototype.getUsername = function() {
    return this.username;
};

Person.prototype.getEmail = function () {
    return this.email;
};

Person.prototype.getCycle = function() {
    return this.cycle;
};

Person.prototype.getPassword = function() {
    return this._getHashPassword(getHash);
};

function getHash(hash) {
    console.log(hash);
}

Person.prototype._getHashPassword = function(callback) {
    var hash = this.password;
    var cycle = this.cycle;
    var width = 0;
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
