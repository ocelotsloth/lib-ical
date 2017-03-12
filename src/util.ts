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

/**
 * Utility File
 *
 * @author Mark Stenglein <mark@stengle.in>
 */

/**
 * isAlpha checks to make sure that an input string consists ONLY of lower or
 * upper case letters.
 *
 * @since 0.1.0
 * @param input Input string to be tested
 * @returns boolean value of if it is only alpha
 */
export function isAlpha(input: string): boolean {
    return /^[a-zA-Z]+$/.test(input);
}


