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
    return this._getHashPassword();
};

Person.prototype._getHashPassword = function() {
    var hash = this.password;
    var cycle = this.getCycle();
    while(cycle) {
        hash = md5(hash);
        cycle--;
    }
    return hash;
};
