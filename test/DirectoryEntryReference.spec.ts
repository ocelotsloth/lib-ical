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
import DirectoryEntryReference from "../src/DirectoryEntryReference";
import { expect } from "chai";
import "mocha";

/**
 * Test the DelegatorsParam class.
 */
describe("DirectoryEntryReference:", () => {
    it("Should exist", () => {
        expect(DirectoryEntryReference).to.exist;
    });

    describe("constructor:", () => {
        it("should create an object", () => {
            const param = new DirectoryEntryReference("ldap://valid.com:444");

            expect(param).to.exist;
        });

        it("should complain on empty uri", () => {
            expect(() => {
                const param = new DirectoryEntryReference("");
            }).to.throw("uri must be defined for DirectoryEntryReference");
        });
    });

    describe("get/set methods:", () => {
        describe("uri:", () => {
            it("should properly set the URI and give the same return", () => {
                const URI = "ldap://me@example.com:6666/0=ABC%20Industries,c=US???"
                    + "(cn=Jim%20Dolittle)";
                const param = new DirectoryEntryReference(URI);
                param.uri = URI;

                expect(param.uri).to.be.equal(URI);
            });

            describe("throw exception on invalid uri:", () => {
                it("leading dash", () => {
                    expect(() => {
                        const URI = "-invalid://example.com:66/t/e/s/t";
                        const param = new DirectoryEntryReference(URI);
                    }).to.throw("Invalid URL");
                });

                it("space", () => {
                    expect(() => {
                        const URI = "in valid://example.com:66/t/e/s/t";
                        const param = new DirectoryEntryReference(URI);
                    }).to.throw("Invalid URL");
                });

            });
        });
    });

    describe("generator:", () => {
        it("generates properly", () => {
            const URI = "ldap://example.com:6666/o=ABC%20Industries,c=US???"
                + "(cn=Jim%20Dolittle)";
            const param = new DirectoryEntryReference(URI);

            expect(param.generate()).to.equal(`DIR="${URI}"`);
        });

        it("escapes spaces and other special chars", () => {
            const URI = "http://example.com/test/with/a space/inside";
            const param = new DirectoryEntryReference(URI);

            const expectedURI = "http://example.com/test/with/a%20space/inside";
            expect(param.generate()).to.equal(`DIR="${expectedURI}"`);
        });
    });
});

