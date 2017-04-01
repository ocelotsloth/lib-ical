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
import DelegateesParam from "../src/DelegateesParam";
import { expect } from "chai";
import "mocha";

/**
 * Test the DelegateesParam class.
 */
describe("DelegateesParam:", () => {
    it("Should exist", () => {
        expect(DelegateesParam).to.exist;
    });

    describe("Constructor:", () => {
        it("Should create an object", () => {
            const delegatee: string = "Mark Stenglein";
            const delegateeParam: DelegateesParam = new DelegateesParam(delegatee);

            expect(delegateeParam).to.exist;
        });

        it("Should convert string to string[]", () => {
            const delegatee: string = "Mark Stenglein";
            const testParam: DelegateesParam = new DelegateesParam(delegatee);

            expect(testParam.delegatees).to.be.deep.equal([delegatee]);
        });

        it("Should not add extra layer to input array", () => {
            const delegatees: string[] = ["Mark", "Stenglein"];
            const testParam: DelegateesParam = new DelegateesParam(delegatees);

            expect(testParam.delegatees).to.not.deep.equal([delegatees]);
            expect(testParam.delegatees).to.deep.equal(delegatees);
        });
    });

    describe("Setter/Getter:", () => {
        it("Sets delegatees", () => {
            const delegatees: string[] = ["mark@stengle.in"];
            const testParam: DelegateesParam = new DelegateesParam("te@s.t");
            testParam.delegatees = delegatees;

            expect(testParam.delegatees).to.exist;
        });

        it("Sets delegatees with no change", () => {
            const delegatees: string[] = ["mark@stengle.in"];
            const testParam: DelegateesParam = new DelegateesParam("te@s.t");
            testParam.delegatees = delegatees;

            expect(testParam.delegatees).to.be.deep.equal(delegatees);
        });

        it("Sets paramValues as well", () => {
            const delegatees: string[] = ["mark@stengle.in"];
            const testParam: DelegateesParam = new DelegateesParam("te@s.t");
            testParam.delegatees = delegatees;

            expect(testParam.paramValues).to.exist;
        });

        it("Sets paramValues correctly", () => {
            const delegatees: string[] = ["mark@stengle.in", "te@s.t"];
            const testParam: DelegateesParam = new DelegateesParam("diff@ema.il");
            testParam.delegatees = delegatees;

            const expected: string[] = ["\"mailto:mark@stengle.in\"",
                                        "\"mailto:te@s.t\""];
            expect(testParam.paramValues).to.be.deep.equal(expected);
        });

        describe("Rejects invalid delegatee params:", () => {
            it("DQUOTES", () => {
                const delegatees: string[] = ["mark\"@stengle.in"];

                expect(() => {
                    new DelegateesParam(delegatees);
                }).to.throw("Delegatee must be QSafeChars");
            });
        });
    });

    describe("Generator:", () => {
        it("Properly Generates output for single delegatee", () => {
            const delegatees: string[] = ["mark@stengle.in"];
            const testParam: DelegateesParam = new DelegateesParam(delegatees);

            const actual: string = "DELEGATED-TO=\"mailto:mark@stengle.in\"";
            expect(testParam.generate()).to.be.equal(actual);
        });

        it("Properly Generates output for multiple delegatees", () => {
            const delegatees: string[] = ["one@one.com", "two@two.com"];
            const testParam: DelegateesParam = new DelegateesParam(delegatees);

            const actual: string = "DELEGATED-TO=\"mailto:one@one.com\"," +
                "\"mailto:two@two.com\"";
            expect(testParam.generate()).to.be.equal(actual);
        });
    });

});

