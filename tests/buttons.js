var pathfinder = require('../extjs-pathfinder');

casper.test.begin('Ext4 button query test', 1, function suite(test) {
    var site = 'http://127.0.0.1:8001/ext4_01.html';
    var buttons;
    var pathfinderObj;

    casper.start(site, function() {
        casper.waitForText('Example window', function then() {
            // one needs to initialize pathfinder with function returning Ext object
            // since all code is executed in browser's context.
            pathfinderObj = pathfinder.brief(this, function () {
                return window.Ext;
            });

            buttons = pathfinderObj.find('button');
            casper.test.assert(buttons.length > 0, 'Buttons should be found');
        });
    });

    casper.then(function() {
        var firstButton = buttons[0];
        pathfinderObj.click(firstButton);
    });

    casper.run(function() {
        test.done();
    });
});
