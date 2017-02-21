import Parameter from "../src/Parameter";
import { expect } from "chai";
import "mocha";

/**
 * Test the Parameter parent class.
 */
describe("Parameter", () => {
    it("Should exist", () => {
        expect(Parameter).to.exist;
    });

    describe("constructor()", () => {
        it("Should create an object", () => {
            const result: Parameter = new Parameter("TestName", ["value"]);
            expect(result).to.exist;
        });

        it("Should have all the right properties", () => {
            const testName: string = "TEST-NAME";
            const testParam: Parameter = new Parameter(testName, ["value1"]);

            expect(testParam).to.have.property(
                "paramName", "paramValues", "generate");
        });
    });

    describe("GET Methods", () => {
        describe("paramName", () => {
            it("Should return the correct name", () => {
                const testName: string = "TEST-NAME";
                const testValues: string[] = ["value1", "value2"];
                const testParam: Parameter = new Parameter(testName, testValues);
                const result: string = testParam.paramName;

                expect(result).to.equal(testName);
            });
        });

        describe("paramValues", () => {
            it("Should return the correct array of values", () => {
                const testName: string = "TEST-NAME";
                const testValues: string[] = ["value1", "value2"];
                const testParam: Parameter = new Parameter(testName, testValues);
                const result: string[] = testParam.paramValues;

                expect(result).to.deep.equal(testValues);
            });
        });
    });

    describe("SET Methods", () => {
        describe("paramName", () => {
            it("Correctly sets iana-token names", () => {

            });

            it("Correctly sets x-name names", () => {

            });

            it("Throws an exception on incorrect name type", () => {

            });
        });

        describe("paramValues", () => {
            it("Correctly sets paramtext values", () => {

            });

            it("Correctly sets quoted-string values", () => {

            });

            it("Throws an exception on malformed string", () => {

            });
        });
    });

    describe("generate()", () => {
        it("Correctly generates single-valued parameters", () => {

        });

        it("Correctly generates double-valued parameters", () => {

        });

        it("Correctly generates multi-valued parameters", () => {

        });
    });

    describe("STATIC Methods", () => {
        describe("isIanaToken()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isIanaToken");
            });

            it("returns true for valid iana-token", () => {

            });

            it("returns false for empty string", () => {

            });

            it("returns true for string containing \"-\"", () => {

            });

            it("returns false for string containing special chars", () => {

            });

            it("returns false for string containing control chars", () => {

            });

        });

        describe("isXName()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isXName");
            });

            it("returns true for x-name value without vendorid", () => {

            });

            it("returns true for x-name value containing vendorid", () => {

            });

            it("returns false for x-name containing long vendorid", () => {

            });

            it("returns false for x-name containing special chars", () => {

            });

            it("returns false for x-name containing control chars", () => {

            });

            it("returns false when missing \"X-\" from start" +
                " of x-name", () => {

            });

            it("returns false for empty string", () => {

            });

            it("returns false for vendorid containing special" +
                " chars (even \"-\")", () => {

            });
        });

        describe("isParamText()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isParamText");
            });

            it("returns ", () => {

            });
        });

        describe("isSafeChar()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isSafeChar");
            });


        });

        describe("isQuotedString()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isQuotedString");
            });


        });

        describe("isQSafeChar()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isQSafeChar");
            });


        });

    });
});