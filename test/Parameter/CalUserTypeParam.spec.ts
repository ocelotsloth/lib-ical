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
import CalUserTypeParam from "../../src/Parameter/CalUserTypeParam";
import { expect } from "chai";
import "mocha";

describe("CalUserTypeParam", () => {
    it("should exist", () => {
        expect(CalUserTypeParam).to.exist;
    });

    describe("constructor()", () => {
        it("Generates a value", () => {
            const param: CalUserTypeParam = new CalUserTypeParam("");
            expect(param).to.exist;
        });

        it("Generates a default value correctly", () => {
            const param: CalUserTypeParam = new CalUserTypeParam("");
            expect(param.calUserType).to.be.equal("INDIVIDUAL");
        });

        it("Sets non-default value correctly", () => {
            const param: CalUserTypeParam = new CalUserTypeParam("ROOM");
            expect(param.calUserType).to.be.equal("ROOM");
        });

        it("Fails on incorrect input type", () => {
            expect(() => {
                const param: CalUserTypeParam = new CalUserTypeParam("INVALID;NAME");
            }).to.throw("Cal User Type must either be known or validXName/Iana Token");
        });

    });

    describe("GET/SET Methods", () => {
        it("Allows for changes and returns correct values", () => {
            const param: CalUserTypeParam = new CalUserTypeParam("INDIVIDUAL");
            const res1: string = param.calUserType;

            param.calUserType = "GROUP";
            const res2: string = param.calUserType;

            expect(res1).to.be.equal("INDIVIDUAL");
            expect(res2).to.be.equal("GROUP");
        });
    });

    describe("generate()", () => {
        it("Generates the right value", () => {
            const param: CalUserTypeParam = new CalUserTypeParam("GROUP");
            const expected: string = "CUTYPE=GROUP";
            expect(param.generate()).to.equal(expected);
        });
    });

});
