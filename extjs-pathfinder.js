module.exports = {
    brief: function(casper, getExtJsObj) {
        var majorVersion;
        try {
            var extObj = casper.evaluate(getExtJsObj);
            majorVersion = parseInt(extObj.version);
            if (!majorVersion) {
                majorVersion = parseInt(extObj.versions.extjs.version);
            }
        } catch (e) {
            console.error('error occurred during execution of getExtJsObj function', e);
        }

        try {
            var adapterModule = require('./adapters/extjs' + majorVersion + '.js');
        } catch (e) {
            throw 'Unsupported ExtJs version - ' + majorVersion +
                  '. Pathfinder supports ExtJs versions from 4-6 included.';
        }

        return new adapterModule.new(casper, getExtJsObj);
    }
}
