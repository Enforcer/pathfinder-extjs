var pathfinder = require('extjs-pathfinder');

casper.test.begin('Ext4 button query test', 1, function suite(test) {
    // I use kitchensink that contains some exemplary components
    var site = 'https://docs.sencha.com/extjs/4.2.3/extjs-build/examples/build/KitchenSink/ext-theme-neptune/#basic-buttons';
    var buttons;
    var pathfinderObj;

    casper.start(site, function() {
        // one needs to initialize pathfinder with function returning Ext object
        // since all code is executed in browser's context.
        pathfinderObj = pathfinder.brief(this, function () {
            return Ext;
        });

        buttons = pathfinderObj.find('button');
        casper.test.assert(buttons.length > 0, 'No buttons were found!');
    });

    casper.then(function() {
        var firstButton = buttons[0];
        pathfinderObj.click(firstButton);
    });

    casper.run(function() {
        test.done();
    });
});
