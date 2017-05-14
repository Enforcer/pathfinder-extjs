var pathfinder = require('../extjs-pathfinder');

casper.test.begin('Ext4 windows test', 3, function suite(test) {
    var site = 'http://127.0.0.1:8001/ext4_01.html';
    var someWindow;
    var pathfinderObj;

    casper.start(site, function() {
        casper.waitForText('Example window', function then() {
            // one needs to initialize pathfinder with function returning Ext object
            // since all code is executed in browser's context.
            pathfinderObj = pathfinder.brief(this, function () {
                return window.Ext;
            });

            someWindow = pathfinderObj.find('window[title="Example window"]');
            casper.test.assert(someWindow.length === 1, 'Exactly one window should be found');
        });
    });

    casper.then(function() {
        var closeAction = pathfinderObj.getProperty(someWindow[0], 'closeAction');
        casper.test.assert(closeAction === 'destroy');

        pathfinderObj.closeWindow(someWindow[0]);

        var windows = pathfinderObj.find('window[title="Example window"]');
        casper.test.assert(windows.length === 0, 'No windows should be present');
    });

    casper.run(function() {
        test.done();
    });
});
