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

function showMenu(cmpId) {
    return this.casperObj.evaluate(function (getExtJs, cmpId) {
        var cmp = getExtJs().getCmp(cmpId);
        if (!cmp) {
            throw 'Component ' + cmp + ' not found!';
        } else if (cmp.xtype !== 'splitbutton') {
            throw 'Component ' + cmp + ' is not a split button!';
        }
        return cmp.showMenu();
    }, this.getExtJs, cmpId);
}

function hideMenu(cmpId) {
    return this.casperObj.evaluate(function (getExtJs, cmpId) {
        var cmp = getExtJs().getCmp(cmpId);
        if (!cmp) {
            throw 'Component ' + cmp + ' not found!';
        } else if (cmp.xtype !== 'splitbutton') {
            throw 'Component ' + cmp + ' is not a split button!';
        }
        return cmp.hideMenu();
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

function getProperty(cmpId, property) {
    return this.casperObj.evaluate(function (getExtJs, cmpId, property) {
        var cmp = getExtJs().getCmp(cmpId);
        if (!cmp) {
            throw 'Component ' + cmp + ' not found!';
        }
        return cmp[property];
    }, this.getExtJs, cmpId, property);
}

function closeWindow(cmpId) {
    return this.casperObj.evaluate(function (getExtJs, cmpId) {
        var cmp = getExtJs().getCmp(cmpId);
        if (!cmp) {
            throw 'Component ' + cmp + ' not found!';
        } else if (cmp.xtype !== 'window') {
            throw 'Component ' + cmp + ' is not a window!';
        }
        var closeTool = cmp.query('tool[type="close"]');
        if (!closeTool) {
            throw 'Window ' + cmp + ' has no close button in the header!';
        }
        var clickEvent = new Event('click');
        clickEvent.button = 0;
        clickEvent.stopEvent = function() {};
        return closeTool[0].onClick(clickEvent);
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
    'Component ' + cmpId + ' should not be visible');
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
    'Component ' + cmpId + ' should be enabled');
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
    'Component ' + cmpId + ' should be disabled');
}


module.exports = {
    new: function(casperObj, getExtJs) {
        this.casperObj = casperObj;
        this.getExtJs = getExtJs;

        this.find = find.bind(this);
        this.click = click.bind(this);
        this.showMenu = showMenu.bind(this);
        this.hideMenu = hideMenu.bind(this);
        this.sendKeys = sendKeys.bind(this);
        this.getValue = getValue.bind(this);
        this.getProperty = getProperty.bind(this);
        this.closeWindow = closeWindow.bind(this);

        this.assert = {
            assertVisible: assertVisible.bind(this),
            assertNotVisible: assertNotVisible.bind(this),
            assertEnabled: assertEnabled.bind(this),
            assertDisabled: assertDisabled.bind(this)
        };
    }
};
