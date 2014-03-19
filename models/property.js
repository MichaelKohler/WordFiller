'use strict';

module.exports.Property = {
    name: '',
    value: '',

    init: function (aName, aValue) {
        this.name = aName;
        this.value = aValue;
        return this;
    }
};

module.exports.saveProperty = function (aProperty, aCallback) {
    aCallback();
};