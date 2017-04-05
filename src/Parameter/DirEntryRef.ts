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
import * as url from "url";
const URL = url.URL;

/**
 * DirEntryRef Class (Chapter 3.2.4)
 *
 * - Purpose: To specify reference to a directory entry associated with the
 *   calendar user specified by the property.
 *
 * - Format Definition: This property parameter is defined by the following
 *   notation:
 *
 *     - dirparam  = "DIR" "=" DQUOTE uri DQUOTE
 *
 * - Description:
 *     - Can be specified on properties with a CAL-ADDRESS value type.
 *         - TODO: enforce this
 *     - Specifies a reference to the directory entry associated with the
 *       calendar user specified by the property.
 *     - The parameter value is a URI.
 *         - DONE: enforce that the URI is valid
 *     - The URI MUST be specified in a quoted-string.
 *
 * - Example:
 *
 *     ORGANIZER;DIR="ldap://example.com:6666/o=ABC%20Industries,
 *      c=US???(cn=Jim%20Dolittle)":mailto:jimdo@example.com
 *
 * @since 0.1.0
 * @author Mark Stenglein <mark@stengle.in>
 */
export default class DirEntryRef extends Parameter {
    /** @access private */
    public _uri: url.URL;

    /**
     * Builds a new DirectoryEntryReference object.
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @param uri Valid URI String (throws no error on malformed, but still valid URI)
     * @access public
     */
    constructor(uri: string) {
        if (!uri) {
            throw new TypeError("uri must be defined for DirectoryEntryReference");
        }
        else {
            super("DIR", []);
            this.uri = uri;
            this.reqContentValue = true;
        }
    }

    /**
     * Returns the href form of the stored URI
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @returns String href of stored URI
     * @access public
     */
    get uri(): string {
        return this._uri.href;
    }

    /**
     * Allows you to set the URI to ANY valid URI.
     *
     * - This method does NOT make any assumptions over what you meant to say,
     *   if by happenstance your input string can be interpreted as a valid URI,
     *   lib-ical will not complain.
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @param newUri string value of the new URI which is to be validated
     * @returns void
     * @access public
     */
    set uri(newUri: string) {
        this._uri = new URL(newUri);
        this.paramValues = [`"${this._uri}"`];
    }
}

