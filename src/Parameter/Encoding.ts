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
const b64 = "BASE64";
const b8 = "8BIT";

/**
 * Parameter Name:  ENCODING
 *
 * Purpose:  To specify an alternate inline encoding for the property
 *    value.
 *
 * Format Definition:  This property parameter is defined by the
 *    following notation:
 *
 *     encodingparam      = "ENCODING" "="
 *                        ( "8BIT"
 *        ; "8bit" text encoding is defined in [RFC2045]
 *                        / "BASE64"
 *        ; "BASE64" binary encoding format is defined in [RFC4648]
 *                        )
 *
 * Description:  This property parameter identifies the inline encoding
 *    used in a property value.  The default encoding is "8BIT",
 *    corresponding to a property value consisting of text.  The
 *    "BASE64" encoding type corresponds to a property value encoded
 *    using the "BASE64" encoding defined in [RFC2045].
 *
 *    If the value type parameter is ";VALUE=BINARY", then the inline
 *    encoding parameter MUST be specified with the value
 *    ";ENCODING=BASE64".
 *
 * Example:
 *
 *   ATTACH;FMTTYPE=text/plain;ENCODING=BASE64;VALUE=BINARY:TG9yZW
 *    0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2ljaW
 *    BkZXNlcnVudCBtb2xsaXQgYW5pbSBpZCBlc3QgbGFib3J1bS4=
 *
 * @author Mark Stenglein <mark@stengle.in>
 * @since 0.1.0
 */
export default class Encoding extends Parameter {
    private _encoding: string;

    constructor(encoding: string) {
        super("ENCODING", []);
        this.encoding = encoding;
    }

    get encoding(): string {
        return this._encoding;
    }

    set encoding(encoding: string) {
        if (!(encoding === "8bit" || encoding === "BASE64")) {
            throw new TypeError("Encoding must be 8bit or BASE64");
        }
        else {
            this._encoding = encoding;
            this.paramValues = [`"${encoding}"`];
        }
    }

    public static BASE64 = new Encoding("BASE64");
    public static BASE8 = new Encoding("8bit");
}

