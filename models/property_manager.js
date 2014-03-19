'use strict';

module.exports.PropertyManager = {
    propertyList: { },

    addProperty: function (aProperty) {
        propertyList.push(aProperty);
        return propertyList;
    }
};

module.exports.getPropertyList = function (aCallback) {
    aCallback(this);
};

module.exports.getPropertyValue = function (aName, aCallback) {
    var propertyValue = propertyList[aName] || '';
    aCallback(propertyValue);
};