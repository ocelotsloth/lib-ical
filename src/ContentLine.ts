/*
 * lib-ical
 * Copyright (C) 2017 Mark Stenglein
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import { isAlpha } from "./util";
import { ICalElement } from "./ICalElement";
import Parameter from "./Parameter/Parameter";
const CRLF: string = "\r\n";

/**
 * Implementation of a Content Line from RFC 5545
 *
 * Chapter 3.1 defines the content line. This implementation will use it as an
 * abstract class which can be extended later by the specific content types.
 *
 * This class defines all of the general features specified by the chapter,
 * while leaving the specific features required by individual component objects
 * unfilled.
 *
 * @author Mark Stenglein <mark@stengle.in>
 * @since 0.1.0
 */
export default class ContentLine implements ICalElement {
    private _name: string;
    private _params: Parameter[];
    private _value: string;

    constructor(inName: string, inParams: Parameter[], inValue: string) {
        this.name = inName;
        this._params = inParams;
        this.value = inValue;
    }

    /* Getters */

    get name(): string {
        return this._name;
    }

    get params(): Parameter[] {
        return this._params;
    }

    get value(): string {
        return this._value;
    }

    /* Setters */

    set name(newName: string) {
        if (Parameter.isIanaToken(newName)) {
            this._name = newName;
        }
        else {
            throw new TypeError("'name' must be alphabetic!");
        }
    }

    set value(newValue: string) {
        if (isAlpha(newValue)) {
            this._value = newValue;
        }
        else {
            throw new TypeError("'value' must be alphabetic!");
        }
    }

    /**
     * Folds lines into 74 octet sections
     *
     * @author Sebastian Pekarek <mail@sebbo.net>
     *
     * TODO: Make sure that this handles multi-octed UTF-8 segments properly.
     */
    static fold(line: string): string {
        return line.match(/(.{1,74})/g).join(CRLF + " ");
    }

    /**
     * Generates a folded content line to use to create the final file.
     *
     * @author Mark Stenglein <mark@stengle.in>
     */
    public generate(): string {
        return `${this.name};${this.params.map(param => param.generate()).join(";")}:${this.value}${CRLF}`;
    }
}
