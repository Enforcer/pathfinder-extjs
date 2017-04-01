var pathfinder = require('../extjs-pathfinder');

casper.test.begin('Ext4 simple assertions test', 3, function suite(test) {
    var site = 'https://docs.sencha.com/extjs/4.2.3/extjs-build/examples/build/KitchenSink/ext-theme-neptune/#basic-buttons';
    var buttons;
    var firstButton
    var pathfinderObj;


    casper.start(site, function() {
        pathfinderObj = pathfinder.brief(this, function () {
            return Ext;
        });

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