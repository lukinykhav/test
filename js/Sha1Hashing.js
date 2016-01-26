define(['Md5Hashing'], function (Md5Hashing) {
    'use strict';
    function Sha1Hashing(username, email, password, cycle) {
        Md5Hashing.apply(this, arguments);

        this.alg = new Hashes.SHA1;
    }
    return Sha1Hashing;
});
