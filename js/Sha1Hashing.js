define(function () {
    'use strict';
    require(['hash'], function(Md5Hashing) {
        function Sha1Hashing(username, email, password, cycle) {
            Md5Hashing.apply(this, arguments);

            this.alg = new Hashes.SHA1;
        }
        return Sha1Hashing;
    })

});
