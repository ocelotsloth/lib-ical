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
