define(['hash'], function (Person) {
    require(
        Person,
        function () {
            var person = new Person('anna', 'aaa@gmail.com', '123456', 3);
            person.getPassword();
            QUnit.test("test", function() {
                equal(person.getUsername(), 'anna', 'Passed!');
                equal(person.getEmail(), 'aaa@gmail.com', 'Passed!');
                equal(person.getCycle(), 3, 'Passed!');
                notEqual(person.getUsername(), 135, 'Passed!');
                notEqual(person.getEmail(), 'sdas@vfddf', 'Passed!');
                notEqual(person.getCycle(), 'anna', 'Passed!');
            });

            QUnit.test('asynchronous test', function(assert) {
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
                    person.getPassword()
                        .always(function() { done1();})
                        .done(function(hash1) {
                            assert.equal(hash1, getHash('123456', 3), "Passed and ready to resume!");
                        })
                        .fail(assert.equal('error', 'error', "Passed!"));
                    start();
                }, 1000);
            });

            QUnit.done(function( details ) {
                console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
            });
        }
    )
});
