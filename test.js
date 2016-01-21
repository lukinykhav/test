QUnit.test("test", function() {
    var person = new Md5Hashing('anna', 'aaa@gmail.com', '123456', 3);
    equal(person.getUsername(), 'anna', 'Passed!');
    equal(person.getEmail(), 'aaa@gmail.com', 'Passed!');
    equal(person.getCycle(), 3, 'Passed!');
    notEqual(person.getUsername(), 135, 'Passed!');
    notEqual(person.getEmail(), 'sdas@vfddf', 'Passed!');
    notEqual(person.getCycle(), 'anna', 'Passed!');
});

QUnit.test('asynchronous test', function(assert) {
    var md5_hashing = new Md5Hashing('anna', 'aaa@gmail.com', '123456', 3);
    expect(2);
    var done1 = assert.async();

    function getHash(hash, cycle) {
        if (cycle) {
            cycle -=1;
            return getHash(md5(hash), cycle);
        }
        return hash;
    }

    setTimeout(function() {
        md5_hashing.getPassword()
            .always(function() { done1();})
            .done(function(hash1) {
                assert.equal(hash1, getHash('123456', 3), "Passed and ready to resume!");
            })
            .fail(assert.equal('error', 'error', "Passed!"));
        start();
    }, 1000);
});


QUnit.test('asynchronous test', function(assert) {
   expect(2);
    var done1 = assert.async();
    var sha1_hashing = new ShaHashing('Piter', 'piter@gmail.com', 'qwerty', 1000);

    function getHash(hash, cycle) {
        var SHA1 = new Hashes.SHA1;
        if (cycle) {
            cycle -=1;
            return getHash(SHA1.hex(hash), cycle);
        }
        return hash;
    }
    setTimeout(function() {
        sha1_hashing.getPassword()
            .always(function() { done1();})
            .done(function(hash1) {
                assert.equal(hash1, getHash('qwerty', 1000), "Passed and ready to resume!");
            })
            .fail(assert.equal('error', 'error', "Passed!"));
        start();
    }, 1000);

});

QUnit.done(function( details ) {
    console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
});