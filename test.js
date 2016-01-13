QUnit.test("test", function() {
    var person = new Person('anna', 'aaa@gmail.com', '123456', '3');
    var hash = person.getPassword();
    equal(person.getUsername(), 'anna', 'Passed!');
    equal(person.getEmail(), 'aaa@gmail.com', 'Passed!');
    equal(person.getCycle(), '3', 'Passed!');
    equal(person.getPassword(), hash, 'Passed!');
});