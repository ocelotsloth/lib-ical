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
 * **Implements Section 3.2.2: Common Name from RFC 5545**
 *
 * Example (see the CN param):
 *
 *     `ORGANIZER;CN="John Smith":mailto:jsmith@example.com`
 *
 * Defined as:
 *
 *     `cnparam = "CN" "=" param-value`
 *
 * @author Mark Stenglein <mark@stengle.in>
 * @since 0.1.0
 */
export default class CommonNameParam extends Parameter {
    private _commonName: string;

    constructor(commonName: string) {
        super("CN", []);
        this.commonName = commonName;
        this.paramValues = [this.commonName];
    }

    get commonName() {
        return this._commonName;
    }

    /**
     * Checks to make sure that the common name is either param-text or
     *   quoted-text and sets the private commonName variable.
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @param newCommonName the new common name to be validated and set
     * @returns void
     */
    set commonName(newCommonName: string) {
        this._commonName = newCommonName;
    }
}