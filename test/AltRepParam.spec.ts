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
import AltRepParam from "../src/AltRepParam";
import { expect } from "chai";
import "mocha";

describe("AltRepParam", () => {
    it("exists", () => {
        expect(AltRepParam).to.exist;
    });

    describe("constructor", () => {
        it("should create an object", () => {
            const param: AltRepParam = new AltRepParam("valid@uri.com");
            expect(param).to.exist;
        });
    });

    describe("GET methods", () => {
        describe("uri()", () => {
            it("should not fail for no reason", () => {
                const param: AltRepParam = new AltRepParam("valid@uri.com");
                expect(param.uri).to.equal("valid@uri.com");
            });
        });
    });

    describe("SET methods", () => {
        describe("uri()", () => {
            it("should work for quoted-string", () => {
                const param: AltRepParam = new AltRepParam("\"valid@uri.com\"");
                expect(param.uri).to.equal("\"valid@uri.com\"");
            });

            it("should work for QSAFE-CHAR", () => {
                const param: AltRepParam = new AltRepParam("valid@uri.com");
                expect(param.uri).to.equal("valid@uri.com");
            });

            it("should throw exception for invalid uri", () => {
                expect(() => {
                    const param: AltRepParam = new AltRepParam("val\"id@uri.com");
                }).to.throw("URI must be QSAFE-CHAR or quoted-string");
            });
        });
    });

    describe("generate()", () => {
        it("should generate a valid parameter", () => {
            const param: AltRepParam = new AltRepParam("valid@uri.com");
            const result: string = param.generate();
            const expected: string = "ALTREP=\"valid@uri.com\"";

            expect(result).to.equal(expected);
        });
    });
});