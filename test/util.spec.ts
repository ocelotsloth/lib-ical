/*
 * lib-ical
 * Copyright (C) 2017 Student Run Computing and Technology
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
import { isAlpha } from "../src/util";
import { expect } from "chai";
import "mocha";

describe("util", () => {
    describe("isAlpha", () => {

        it("Should exist", () => {
            expect(isAlpha).to.exist;
        });

        it("Should return false for numbers", () => {
            const test = "12345";
            const result = isAlpha(test);

            expect(result).to.be.false;
        });

        it("Should return false for alpha numerics", () => {
            const test = "a2a";
            const result = isAlpha(test);

            expect(result).to.be.false;
        });

        it("Should return false for non-alpha numerics", () => {
            const test = ".%3adsk)#";
            const result = isAlpha(test);

            expect(result).to.be.false;
        });

        it("Should return true for lowercase alpha", () => {
            const test = "abcdef";
            const result = isAlpha(test);

            expect(result).to.be.true;
        });

        it("Should return true for uppercase alpha", () => {
            const test = "ABCDEF";
            const result = isAlpha(test);

            expect(result).to.be.true;
        });

        it("Should return true for mixed alpha", () => {
            const test = "aBcDeF";
            const result = isAlpha(test);

            expect(result).to.be.true;
        });
    });
});
