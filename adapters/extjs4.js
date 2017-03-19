function find(query) {
    return this.casperObj.evaluate(function (getExtJs, query) {
        var cmpQueryResult = getExtJs().ComponentQuery.query(query);
        return cmpQueryResult.map(function (cmp) {
            return cmp.id;
        });
    }, this.getExtJs, query);
}

function click(cmpId) {
    return this.casperObj.evaluate(function (getExtJs, cmpId) {
        var clickEvent = new Event('click');
        clickEvent.button = 0;
        var cmp = getExtJs().getCmp(cmpId);
        if (!cmp) {
            throw 'Component ' + cmp + ' not found!';
        }
        return cmp.onClick(clickEvent);
    }, this.getExtJs, cmpId);
}

module.exports = {
    new: function(casperObj, getExtJs) {
        this.casperObj = casperObj;
        this.getExtJs = getExtJs;

        this.find = find.bind(this);
        this.click = click.bind(this);
    }
};
