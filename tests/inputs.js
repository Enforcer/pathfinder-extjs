var pathfinder = require('../extjs-pathfinder');

casper.test.begin('Ext4 input basic test', 3, function suite(test) {
    var site = 'http://127.0.0.1:8001/ext4_01.html';
    var inputs;
    var pathfinderObj;

    casper.start(site, function() {
        pathfinderObj = pathfinder.brief(this, function () {
            return Ext;
        });

        inputs = pathfinderObj.find('textfield[emptyText="user id"]');
        casper.test.assert(inputs.length > 0, 'Input for user id not found!');

        casper.test.assert(
            pathfinderObj.getValue(inputs[0]) == '',
            'Input\'s value is not empty'
        );
    });

    casper.then(function() {
        pathfinderObj.sendKeys(inputs[0], 'admin');
        casper.test.assert(
            pathfinderObj.getValue(inputs[0]) == 'admin',
            'Input\'s value not set!'
        );
    });

    casper.run(function() {
        test.done();
    });
});
