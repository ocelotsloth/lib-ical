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
 * Class implementing section 3.2.3 of RFC 5545: Calendar User Type
 *
 * Default value of the user type should be INDIVIDUAL if none specified
 *   (empty string).
 *
 * TODO: Verify this is only specified on properties with the CAL-ADDRESS
 *       value type.
 *
 * @author Mark Stenglein <mark@stenglein>
 * @since 0.1.0
 */
export default class CalUserTypeParam extends Parameter {
    private _calUserType: string;

    constructor(usertype: string) {
        super("CUTYPE", []);

        if (usertype.length > 0) {
            this.calUserType = usertype;
        }
        else {
            // Sets the default of INDIVIDUAL to start
            this.calUserType = "INDIVIDUAL";
        }
    }

    get calUserType(): string {
        return this._calUserType;
    }

    set calUserType(newType: string) {
        if (newType === "INDIVIDUAL" ||
            newType === "GROUP" ||
            newType === "RESOURCE" ||
            newType === "ROOM" ||
            newType === "UNKNOWN" ||
            Parameter.isXName(newType) ||
            Parameter.isIanaToken(newType)
        ) {
            this._calUserType = newType;
            this.paramValues = [newType];
        }
        else {
            throw new TypeError("Cal User Type must either be known or valid" +
                "XName/Iana Token");
        }
    }

}
