var person = new Person('anna', 'aaa@gmail.com', '123456', 3),
    hash = person.getPassword();
QUnit.test("test", function() {
    equal(person.getUsername(), 'anna', 'Passed!');
    equal(person.getEmail(), 'aaa@gmail.com', 'Passed!');
    equal(person.getCycle(), 3, 'Passed!');
});

QUnit.asyncTest( "asynchronous test", function() {
    setTimeout(function() {
        ok(hash, "Passed and ready to resume!" );
        start();
    }, 1000);
});