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
 *
 *   - Note: The Param here ends with the DQUOTE, the rest is part of ATTENDEE
 *
 * @since 0.1.0
 * @author Mark Stenglein <mark@stengle.in>
 */
export default class DelegatorsParam extends Parameter {
    private _delegators: string[];

    /**
     * Takes either one email or an array of emails as string or string[]
     *
     * - There is really no need to require that "mailto:" be included here,
     *   as it can be easilly added by the set method.
     *
     * @since 0.1.0
     * @author Mark Stenglein <mark@stengle.in>
     */
    constructor(delegators: string | string[]) {
        super("DELEGATED-FROM", []);

        // Converts single string object to an array.
        delegators = (delegators instanceof Array) ? delegators : [delegators];
        this.delegators = delegators;
    }

    /**
     * Simply returns the current delegators, as a string array.
     *
     * @since 0.1.0
     * @author Mark Stenglein <mark@stengle.in>
     */
    get delegators(): string[] {
        return this._delegators;
    }

    /**
     * Sets the private _delegators and also writes the "mailto:" to the
     * front of each delegator before writing super.paramValues
     *
     * DONE: Add proper testing to make sure that only valid delegators
     *       are added
     *
     * @since 0.1.0
     * @author Mark Stenglein <mark@stengle.in>
     */
    set delegators(newDelegators: string[]) {
        // Ensure each delegator is valid QSafeChar String
        if (!newDelegators.every(Parameter.isQSafeChar))
            throw new TypeError("Delegator must be QSafeChars");

        // Construct paramValues for generation
        const paramValues: string[] = newDelegators.map(
            delegator => `"mailto:${delegator}"`);

        // Passes the built paramValues to the Parent class
        this.paramValues = paramValues;

        // Saves the given values for the getter funciton
        this._delegators = newDelegators;
    }
}

