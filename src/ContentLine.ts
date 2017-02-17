import { isAlpha } from "./util";

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
export class ContentLine {
    private _name: string;
    private _param: string;
    private _value: string;

    constructor(inName: string, inParam: string, inValue: string) {
        this.name = inName;
        this.param = inParam;
        this.value = inValue;
    }

    /* Getters */

    get name(): string {
        return this._name;
    }

    get param(): string {
        return this._param;
    }

    get value(): string {
        return this._value;
    }

    /* Setters */

    set name(newName: string) {
        if (isAlpha(newName)) {
            this._name = newName;
        }
        else {
            throw new TypeError("'name' must be alphabetic!")
        }
    }

    set param(newParam: string) {
        this._param = newParam;
    }

    set value(newValue: string) {
        if (isAlpha(newValue)) {
            this._value = newValue;
        }
    }
} 