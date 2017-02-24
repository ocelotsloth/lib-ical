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