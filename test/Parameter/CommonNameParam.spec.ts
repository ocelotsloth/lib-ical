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
import CommonNameParam from "../../src/Parameter/CommonNameParam";
import { expect } from "chai";
import "mocha";

describe("CommonNameParam", () => {
    it("exists", () => {
        expect(CommonNameParam).to.exist;
    });

    describe("constructor", () => {
        it("Generates a value", () => {
            const param: CommonNameParam = new CommonNameParam("@ocelotsloth");
            expect(param).to.exist;
        });

        it("Fails on bad input `\"`", () => {
            expect(() => {
                const param: CommonNameParam = new CommonNameParam("Bad quotes \" in middle");
            }).to.throw(
                "param-value must either be valid paramtext or quoted-string"
            );
        });

        it("Fails on bad input `;`", () => {
            expect(() => {
                const param: CommonNameParam = new CommonNameParam("Bad semicolons ; in middle");
            }).to.throw(
                "param-value must either be valid paramtext or quoted-string"
            );
        });

    });

    describe("GET Methods", () => {
        it("Retruns a value", () => {
            const param: CommonNameParam = new CommonNameParam("@ocelotsloth");
            expect(param.commonName).to.exist;
        });

        it("Returns the correct value", () => {
            const param: CommonNameParam = new CommonNameParam("@ocelotsloth");
            expect(param.commonName).to.equal("@ocelotsloth");
        });
    });

    describe("SET Methods", () => {
        it("Allows changes to common name", () => {
            const param: CommonNameParam = new CommonNameParam("Mark Stenglein");
            expect(param.commonName).to.equal("Mark Stenglein");
            param.commonName = "@ocelotsloth";
            expect(param.commonName).to.equal("@ocelotsloth");
        });
    });

    describe("generate()", () => {
        it("Generates the right value", () => {
            const param: CommonNameParam = new CommonNameParam("Mark Stenglein");
            const expected: string = "CN=Mark Stenglein";
            expect(param.generate()).to.equal(expected);
        });
    });
});
