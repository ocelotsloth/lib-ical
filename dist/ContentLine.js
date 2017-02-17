"use strict";
const util_1 = require("./util");
/**
 * Implementation of a Content Line from RFC 5545
 *
 * @author Mark Stenglein <mark@stengle.in>
 *
 * Chapter 3.1 defines the content line. This implementation will use it as an
 * abstract class which can be extended later by the specific content types.
 *
 * This class defines all of the general features specified by the chapter,
 * while leaving the specific features required by individual component objects
 * unfilled.
 */
class ContentLine {
    constructor(inName, inParam, inValue) {
        this.name = inName;
        this.param = inParam;
        this.value = inValue;
    }
    /* Getters */
    get name() {
        return this._name;
    }
    get param() {
        return this._param;
    }
    get value() {
        return this._value;
    }
    /* Setters */
    set name(newName) {
        if (util_1.isAlpha(newName)) {
            this._name = newName;
        }
        else {
            throw new TypeError("'name' must be alphabetic!");
        }
    }
    set param(newParam) {
        this._param = newParam;
    }
    set value(newValue) {
        if (util_1.isAlpha(newValue)) {
            this._value = newValue;
        }
    }
}
exports.ContentLine = ContentLine;
