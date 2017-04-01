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

function sendKeys(cmpId, keys) {
    return this.casperObj.evaluate(function (getExtJs, cmpId, keys) {
        var cmp = getExtJs().getCmp(cmpId);
        if (!cmp) {
            throw 'Component ' + cmp + ' not found!';
        }
        var inputEl = cmp.el.dom.querySelector('input');
        inputEl.focus();
        inputEl.value = keys;
        inputEl.blur();
    }, this.getExtJs, cmpId, keys);
}

function getValue(cmpId) {
    return this.casperObj.evaluate(function (getExtJs, cmpId) {
        var cmp = getExtJs().getCmp(cmpId);
        if (!cmp) {
            throw 'Component ' + cmp + ' not found!';
        }
        return cmp.getValue();
    }, this.getExtJs, cmpId);
}

function assertVisible(cmpId) {
    this.casperObj.test.assert(
        this.casperObj.evaluate(function (getExtJs, cmpId) {
            var cmp = getExtJs().getCmp(cmpId);
            if (!cmp) {
                throw 'Component ' + cmp + ' not found!';
            }
            return cmp.isVisible && cmp.isVisible();
        }, this.getExtJs, cmpId),
    'Component ' + cmpId + ' should be visible');
}

function assertNotVisible(cmpId) {
    this.casperObj.test.assert(
        this.casperObj.evaluate(function (getExtJs, cmpId) {
            var cmp = getExtJs().getCmp(cmpId);
            if (!cmp) {
                throw 'Component ' + cmp + ' not found!';
            }
            return cmp.isVisible && !cmp.isVisible();
        }, this.getExtJs, cmpId),
    'Component' + cmpId + ' should not be visible');
}

function assertEnabled(cmpId) {
    this.casperObj.test.assert(
        this.casperObj.evaluate(function (getExtJs, cmpId) {
            var cmp = getExtJs().getCmp(cmpId);
            if (!cmp) {
                throw 'Component ' + cmp + ' not found!';
            }
            return cmp.isDisabled && !cmp.isDisabled();
        }, this.getExtJs, cmpId),
    'Component' + cmpId + ' should be enabled');
}

function assertDisabled(cmpId) {
    this.casperObj.test.assert(
        this.casperObj.evaluate(function (getExtJs, cmpId) {
            var cmp = getExtJs().getCmp(cmpId);
            if (!cmp) {
                throw 'Component ' + cmp + ' not found!';
            }
            return cmp.isDisabled && cmp.isDisabled();
        }, this.getExtJs, cmpId),
    'Component' + cmpId + ' should be disabled');
}


module.exports = {
    new: function(casperObj, getExtJs) {
        this.casperObj = casperObj;
        this.getExtJs = getExtJs;

        this.find = find.bind(this);
        this.click = click.bind(this);
        this.sendKeys = sendKeys.bind(this);
        this.getValue = getValue.bind(this);

        this.assert = {
            assertVisible: assertVisible.bind(this),
            assertNotVisible: assertNotVisible.bind(this),
            assertEnabled: assertEnabled.bind(this),
            assertDisabled: assertDisabled.bind(this)
        };
    }
};
