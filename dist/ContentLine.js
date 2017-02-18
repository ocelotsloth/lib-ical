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
    constructor(inName, inParams, inValue) {
        this._params = [];
        this.name = inName;
        this._params = inParams;
        this.value = inValue;
    }
    /* Getters */
    get name() {
        return this._name;
    }
    get params() {
        return this._params;
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
    set value(newValue) {
        if (util_1.isAlpha(newValue)) {
            this._value = newValue;
        }
    }
    /**
     * Folds lines into 74 octet sections
     *
     * @author Sebastian Pekarek <mail@sebbo.net>
     *
     * TODO: Make sure that this handles multi-octed UTF-8 segments properly.
     */
    static fold(line) {
        return line.match(/(.{1,74})/g).join("\r\n ");
    }
    /**
     * Generates a folded content line to use to create the final file.
     *
     * @author Mark Stenglein <mark@stengle.in>
     */
    generate() {
        let outputLine = this.name;
        this.params.forEach((param) => {
            outputLine += ";";
            outputLine += param;
        });
        outputLine += ":" + this.value + "\r\n";
        return ContentLine.fold(outputLine);
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ContentLine;
