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
import Parameter from "./Parameter";

/**
 * Parameter Name:  FMTTYPE
 *
 * Purpose:  To specify the content type of a referenced object.
 *
 * Format Definition:  This property parameter is defined by the
 *    following notation:
 *
 *     fmttypeparam = "FMTTYPE" "=" type-name "/" subtype-name
 *                    ; Where "type-name" and "subtype-name" are
 *                    ; defined in Section 4.2 of [RFC4288].
 *
 * Type and subtype names MUST conform to the following ABNF:
 *
 *     type-name = reg-name
 *     subtype-name = reg-name
 *
 *     reg-name = 1*127reg-name-chars
 *     reg-name-chars = ALPHA / DIGIT / "!" /
 *                     "#" / "$" / "&" / "." /
 *                     "+" / "-" / "^" / "_"
 *
 * Description:  This parameter can be specified on properties that are
 *    used to reference an object.  The parameter specifies the media
 *    type [RFC4288] of the referenced object.  For example, on the
 *    "ATTACH" property, an FTP type URI value does not, by itself,
 *  necessarily convey the type of content associated with the
 *    resource.  The parameter value MUST be the text for either an
 *    IANA-registered media type or a non-standard media type.
 *
 * Example:
 *
 *     ATTACH;FMTTYPE=application/msword:ftp://example.com/pub/docs/
 *      agenda.doc
 *
 * @class
 * @extends Parameter
 * @author Mark Stenglein <mark@stengle.in>
 * @since 0.1.0
 */
export default class FormatType extends Parameter {
    /** @private */
    private _primaryTypeName: string;

    /** @private */
    private _subTypeName: string;

    /**
     * Builds the new format type parameter.
     *
     * @param typeName The full typeName: "primary/sub"
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     */
    constructor(typeName: string) {
        super("FMTTYPE", []);
        this.typeName = typeName;
    }

    /**
     * @return {string} the full typeName constructed from the primary and sub
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     */
    get typeName(): string {
        return `${this._primaryTypeName}/${this._subTypeName}`;
    }

    /**
     * Sets both the primary and sub-name by decomposing the full name.
     *
     * @param {string} typeName The full typename (eg. "primary/sub")
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     */
    set typeName(typeName: string) {
        const [primary , sub, ...extra]: string[] = typeName.split("/");

        if (extra.length > 0) {
            throw new TypeError("Too many \"/\" characters");
        }

        this.primaryTypeName = primary;
        this.subTypeName = sub;
        this.paramValues = [typeName];
    }

    /**
     * @return {string} just the Primary Type Name
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     */
    get primaryTypeName(): string {
        return this._primaryTypeName;
    }

    /**
     * Validates and sets the Primary Type Name
     *
     * @param {string} primaryName The primary name to be set
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     */
    set primaryTypeName(primaryName: string) {
        if (!FormatType.isRegName(primaryName)) {
            throw new TypeError("Invalid Primary Name");
        }
        else {
            this._primaryTypeName = primaryName;
        }
    }

    /**
     * @return {string} just the Sub-Type Name
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     */
    get subTypeName(): string {
        return this._subTypeName;
    }

    /**
     * Validates and sets the Sub-Type Name
     *
     * @param {string} subName The sub-name to be set
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     */
    set subTypeName(subName: string) {
        if (!FormatType.isRegName(subName)) {
            throw new TypeError("Invalid Sub-Name");
        }
        else {
            this._subTypeName = subName;
        }
    }

    /**
     * Tests to ensure the input string is a valid RegName according to the
     *  ABNF specified in Section 4.2 in RFC4288
     *
     *     type-name = reg-name
     *     subtype-name = reg-name
     *
     *     reg-name = 1*127reg-name-chars
     *     reg-name-chars = ALPHA / DIGIT / "!" /
     *                     "#" / "$" / "&" / "." /
     *                     "+" / "-" / "^" / "_"
     *
     * - TODO: Move this to a proper validation class/module (see #40)
     * - TODO: Split this into two tests, for reg-name and reg-name-chars
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @param input The string to be tested
     * @returns bool Whether or not the string is a valid reg-name-char set
     * @public
     * @static
     */
    static isRegName(input: string) {
        return /^[a-zA-Z0-9!#$&.+\-\^_]{1,127}$/.test(input);
    }
}

