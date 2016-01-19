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

QUnit.asyncTest('asynchronous test', function() {
    console.log(person.getPassword());
    setTimeout(function() {
        equal(person.getPassword().done(function() { return 'success';}), 'success', "Passed and ready to resume!");
        start();
    }, 1000);
});

QUnit.done(function( details ) {
    console.log( "Total: ", details.total, " Failed: ", details.failed, " Passed: ", details.passed, " Runtime: ", details.runtime );
});