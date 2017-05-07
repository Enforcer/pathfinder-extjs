var pathfinder = require('../extjs-pathfinder');

casper.test.begin('Ext4 splitbutton test', 4, function suite(test) {
    var site = 'http://127.0.0.1:8001/ext4_01.html';
    var splitbuttons;
    var pathfinderObj;

    casper.start(site, function() {
        casper.waitForText('Example window', function then() {
            // one needs to initialize pathfinder with function returning Ext object
            // since all code is executed in browser's context.
            pathfinderObj = pathfinder.brief(this, function () {
                return window.Ext;
            });

            splitbuttons = pathfinderObj.find('splitbutton');
            casper.test.assert(splitbuttons.length === 1, 'Exactly one split button should be found');
        });
    });

    casper.then(function() {
        var firstButton = splitbuttons[0];
        var menu = pathfinderObj.find('splitbutton menu')[0];
        pathfinderObj.assert.assertNotVisible(menu);
        pathfinderObj.showMenu(firstButton);
        pathfinderObj.assert.assertVisible(menu);
        pathfinderObj.hideMenu(firstButton);
        pathfinderObj.assert.assertNotVisible(menu);
    });

    casper.run(function() {
        test.done();
    });
});
