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
import DelegatorsParam from "../src/DelegatorsParam";
import { expect } from "chai";
import "mocha";

/**
 * Test the DelegatorsParam class.
 */
describe("DelegatorsParam:", () => {
    it("Should exist", () => {
        expect(DelegatorsParam).to.exist;
    });

    describe("Constructor:", () => {
        it("Should create an object", () => {
            const delegator: string = "Mark Stenglein";
            const delegatorParam: DelegatorsParam = new DelegatorsParam(delegator);

            expect(delegatorParam).to.exist;
        });

        it("Should convert string to string[]", () => {
            const delegator: string = "Mark Stenglein";
            const testParam: DelegatorsParam = new DelegatorsParam(delegator);

            expect(testParam.delegators).to.be.deep.equal([delegator]);
        });

        it("Should not add extra layer to input array", () => {
            const delegators: string[] = ["Mark", "Stenglein"];
            const testParam: DelegatorsParam = new DelegatorsParam(delegators);

            expect(testParam.delegators).to.not.deep.equal([delegators]);
            expect(testParam.delegators).to.deep.equal(delegators);
        });
    });

    describe("Setter/Getter:", () => {
        it("Sets delegators", () => {
            const delegators: string[] = ["mark@stengle.in"];
            const testParam: DelegatorsParam = new DelegatorsParam("te@s.t");
            testParam.delegators = delegators;

            expect(testParam.delegators).to.exist;
        });

        it("Sets delegators with no change", () => {
            const delegators: string[] = ["mark@stengle.in"];
            const testParam: DelegatorsParam = new DelegatorsParam("te@s.t");
            testParam.delegators = delegators;

            expect(testParam.delegators).to.be.deep.equal(delegators);
        });

        it("Sets paramValues as well", () => {
            const delegators: string[] = ["mark@stengle.in"];
            const testParam: DelegatorsParam = new DelegatorsParam("te@s.t");
            testParam.delegators = delegators;

            expect(testParam.paramValues).to.exist;
        });

        it("Sets paramValues correctly", () => {
            const delegators: string[] = ["mark@stengle.in", "te@s.t"];
            const testParam: DelegatorsParam = new DelegatorsParam("diff@ema.il");
            testParam.delegators = delegators;

            const expected: string[] = ["\"mailto:mark@stengle.in\"",
                                        "\"mailto:te@s.t\""];
            expect(testParam.paramValues).to.be.deep.equal(expected);
        });

        describe("Rejects invalid delegator params:", () => {
            it("DQUOTES", () => {
                const delegators: string[] = ["mark\"@stengle.in"];

                expect(() => {
                    new DelegatorsParam(delegators);
                }).to.throw("Delegator must be QSafeChars");
            });
        });
    });

    describe("Generator:", () => {
        it("Properly Generates output for single delegator", () => {
            const delegators: string[] = ["mark@stengle.in"];
            const testParam: DelegatorsParam = new DelegatorsParam(delegators);

            const actual: string = "DELEGATED-FROM=\"mailto:mark@stengle.in\"";
            expect(testParam.generate()).to.be.equal(actual);
        });

        it("Properly Generates output for multiple delegators", () => {
            const delegators: string[] = ["one@one.com", "two@two.com"];
            const testParam: DelegatorsParam = new DelegatorsParam(delegators);

            const actual: string = "DELEGATED-FROM=\"mailto:one@one.com\"," +
                "\"mailto:two@two.com\"";
            expect(testParam.generate()).to.be.equal(actual);
        });
    });
});

