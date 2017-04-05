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
import Encoding from "../../src/Parameter/Encoding";
import { expect } from "chai";
import "mocha";

/**
 * Test the Encoding class.
 */
describe("Encoding:", () => {
    it("Should exist", () => {
        expect(Encoding).to.exist;
    });

    describe("Constructor:", () => {
        it("Should create an object", () => {
            const param = new Encoding("BASE64");
            expect(param).to.exist;
        });

        it("Should throw exception on invalid encoding", () => {
            expect(() => {
                const param = new Encoding("WrongBase");
            }).to.throw("Encoding must be 8bit or BASE64");
        });
    });

    describe("Getter/Setter:", () => {
        describe("encoding:", () => {
            it("Should set and read on 8bit", () => {
                const param = new Encoding("8bit");
                expect(param.encoding).to.be.equal("8bit");
            });

            it("Should set and read on BASE64", () => {
                const param = new Encoding("BASE64");
                expect(param.encoding).to.be.equal("BASE64");
            });
        });
    });

    describe("Static Vars:", () => {
        describe("BASE64:", () => {
            it("Should exist", () => {
                expect(Encoding.BASE64).to.exist;
            });

            it("Should have a value of \"BASE64\"", () => {
                expect(Encoding.BASE64.encoding).to.be.equal("BASE64");
            });
        });

        describe("BASE8:", () => {
            it("Should exist", () => {
                expect(Encoding.BASE8).to.exist;
            });

            it("Should have a value of \"8bit\"", () => {
                expect(Encoding.BASE8.encoding).to.be.equal("8bit");
            });
        });
    });

    describe("Generator:", () => {
        it("Should correctly generate output", () => {
            const expected = "ENCODING=\"BASE64\"";
            expect(Encoding.BASE64.generate()).to.be.equal(expected);
        });
    });
});
