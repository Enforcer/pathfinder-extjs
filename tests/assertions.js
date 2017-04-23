var pathfinder = require('../extjs-pathfinder');

casper.test.begin('Ext4 simple assertions test', 4, function suite(test) {
    var site = 'http://127.0.0.1:8001/ext4_01.html';
    var buttons;
    var firstButton
    var pathfinderObj;


    casper.start(site, function() {
        pathfinderObj = pathfinder.brief(this, function () {
            return Ext;
        });

        casper.test.assert(this.getTitle() == 'Ext JS Kitchen Sink - Basic Buttons', 'Unexpected page title');

        buttons = pathfinderObj.find('button');
        // basic assertion that checks presence
        casper.test.assert(buttons.length > 0, 'Buttons should be found');
        firstButton = buttons[buttons.length - 1];
    });

    casper.then(function() {
        pathfinderObj.assert.assertVisible(firstButton);
        pathfinderObj.assert.assertEnabled(firstButton);
    });

    casper.run(function() {
        test.done();
    });
});
