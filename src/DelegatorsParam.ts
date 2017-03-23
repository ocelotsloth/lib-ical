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
 * DelegatorsParam Class (Chapter 3.2.4)
 *
 * - Purpose: To specify the calendar users that have delegated their
 *   participation to the calendar user specified by the property.
 *
 * - Format Definition: This property parameter is defined by the following
 *   notation:
 *
 *     - delfromparam  = "DELEGATED-FROM" "=" DQUOTE cal-address
 *                       DQUOTE *("," DQUOTE cal-address DQUOTE)
 *
 * - Description:
 *     - The parameter is specified on properties of the CAL-ADDRESS value
 *       type.
 *     - TODO: Enforce this restriction on the type allowed to hold this parameter
 *     - This parameter specified those calendar users that have delegated their
 *       participation in a group-scheduled event or to-do to the calendar user
 *       specified by the property.
 *     - The individual calendar address parameter values MUST each be specified
 *       in a quoted-string.
 *
 * - Example:
 *
 *     ATTENDEE;DELEGATED-FROM="mailto:jsmith@example.com":mailto:
 *      jdoe@example.com
 */
export default class DelegatorsParam extends Parameter {
    private _delegators: string[];

    constructor(delegators: string | string[]) {
        super("DELEGATED-FROM", []);

        // Converts single string object to an array.
        delegators = (delegators instanceof Array) ? delegators : [delegators];
        this._delegators = delegators;
    }

    get delegators(): string[] {
        return this._delegators;
    }

    set delegators(newDelegators: string[]) {
        this._delegators = newDelegators;
        this.paramValues = this._delegators;
    }
}
