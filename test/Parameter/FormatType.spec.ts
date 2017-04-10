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
import FormatType from "../../src/Parameter/FormatType";
import { expect } from "chai";
import "mocha";

/**
 * Test the FormatType class.
 */
describe("FormatType:", () => {
    it("Exists", () => {
        expect(FormatType).to.not.be.null;
    });

    describe("Constructor:", () => {
        it("Creates an object", () => {
            expect(new FormatType("test/form")).to.not.be.null;
        });

        it("Sets the correct Parameter Name", () => {
            const param = new FormatType("test/form");
            const expected = "FMTTYPE";

            expect(param.paramName).to.equal(expected);
        });
    });

    describe("Get/Set Methods:", () => {
        describe("typeName:", () => {
            describe("Get:", () => {
                it("Constructs the correct string format", () => {
                    const testValue = "test/form";
                    const param = new FormatType(testValue);

                    expect(param.typeName).to.equal(testValue);
                });
            });

            describe("Set:", () => {
                it("Throws error on multiple \"/\" chars", () => {
                    expect(() => {
                        const testValue = new FormatType("too/many/splits");
                    }).to.throw("Too many \"/\" characters");
                });
            });
        });

        describe("primaryTypeName:", () => {
            describe("Get:", () => {
                it("Returns the correct value", () => {
                    const testValue = "Primary";
                    const param = new FormatType(`${testValue}/sub`);

                    expect(param.primaryTypeName).to.equal(testValue);
                });
            });

            describe("Set:", () => {
                // More complex behavior will be tested on the regex
                it("Throws an error on incorrect value", () => {
                    expect(() => {
                        const testValue = new FormatType("incor<ct/primary");
                    }).to.throw("Invalid Primary Name");
                });
            });
        });

        describe("subTypeName:", () => {
            describe("Get:", () => {
                it("Returns the correct value", () => {
                    const testValue = "sub";
                    const param = new FormatType(`Primary/${testValue}`);

                    expect(param.subTypeName).to.equal(testValue);
                });
            });

            describe("Set:", () => {
                // More complex behavior will be tested on the regex
                it("Throws an error on incorrect value", () => {
                    expect(() => {
                        const testValue = new FormatType("sub/incor<ct");
                    }).to.throw("Invalid Sub-Name");
                });
            });
        });
    });

    describe("Static Methods", () => {
        describe("isregName:", () => {

            ["AlPhA", "0123456789", "!", "#", "$", "&",
             ".", "+", "-" , "^", "-", "Aa0123456789!#$&.+-^_"].forEach(testChar => {
                it(`Passes ${testChar}`, () => {
                    expect(FormatType.isRegName(testChar)).to.be.true;
                });
            });

            it("Passes 127 Characters", () => {
                const testValue: string = "CPbCdgIJzLgSrrZOKJDofOuIFhxgbnccXB"
                    + "pGrwPZcaQxDNLtHqWKopzsJaTAzCnOKHhlxQBOKkObQjcPHXalKBNn"
                    + "gnXwZNGiXsWpBbgFMYgnseHiJemJxpZhhfPBmHU";

                expect(FormatType.isRegName(testValue)).to.be.true;
            });

            it("Fails 128 characters", () => {
                const testValue: string = "CPbCdgIJzLgSrrZOKJDofOuIFhxgbnccXB"
                    + "pGrwPZcaQxDNLtHqWKopzsJaTAzCnOKHhlxQBOKkObQjcPHXalKBNn"
                    + "gnXwZNGiXsWpBbgFMYgnseHiJemJxpZhhfPBmHUA";

                expect(FormatType.isRegName(testValue)).to.be.false;
            });

            ["", "<", "/"].forEach(testChar => {
                it(`Passes ${testChar}`, () => {
                    expect(FormatType.isRegName(testChar)).to.be.false;
                });
            });
        });
    });

    describe("Generator", () => {
        it("Generates the correct output", () => {
            const param = new FormatType("text/plain");
            const expected = "FMTTYPE=text/plain";

            expect(param.generate()).to.equal(expected);
        });
    });
});

