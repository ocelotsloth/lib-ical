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

    /*
     * Note: it is not neccessary to test all of the behavior for the
     * constructor as far as validation of input data is concerned. This is
     * because the SET method for each property performs that function. Look
     * there for tests.
     */
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

    /*
     * All the GET methods are really doing is pulling the private data
     *  variables out for the requester to see. Nothing too complex is happening
     *  that needs to be tested.
     */
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

    /*
     * Note that the SET methods are difficult to directly test, as they are
     *  called even by the constructor function when setting the values. Because
     *  of that behavior, they can be tested directly by simply calling the
     *  class constructors with the values you want to test.
     *
     * The constructor is really only going so far as to do this:
     *
     *     constructor(inName: string, inValues: string[]) {
     *         this.paramName = inName;
     *         this.paramValues = inValues;
     *     }
     *
     * These tests implement the data validation that is missing from the
     *  constructor level tests.
     */
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

    /**
     * Tests the generation of param strings to make sure they are to spec with
     *   RFC 5545's ABNF definition (pg. 10):
     *
     *     param = param-name "=" param-value *("," param-value)
     *     ; Each property defines the specific ABNF for the parameters
     *     ; allowed on the property. Refer to specific properties for
     *     ; precise parameter ABNF.
     *
     * tl;dr of the above snippet is that this is a basic structure check so
     *   that the higher level classes can simply validate proper types and use
     *   the lower level generate method.
     */
    describe("generate()", () => {
        it("Correctly generates single-valued parameters", () => {

        });

        it("Correctly generates double-valued parameters", () => {

        });

        it("Correctly generates multi-valued parameters", () => {

        });
    });

    /**
     * There are currently many more static methods then will be in the final
     *   class. I need to start building the other objects before I will have a
     *   better idea which of these validators are unique or need to be moved to
     *   a general utility file.
     */
    describe("STATIC Methods", () => {
        /**
         * iana-token definition from RFC 5545 (pg. 10)
         *
         *     iana-token = 1*(ALPHA / DIGIT / "-")
         *     ; iCalendar identifier registered with IANA
         */
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

        /**
         * x-name definition from RFC 5545 (pg. 10)
         *
         *     x-name = "X-" [vendorid "-"] 1*(ALPHA / DIGIT / "-")
         *     ; Reserved for experimental use.
         *
         *     vendorid = 3*(ALPHA / DIGIT)
         *     ; Vendor identification
         */
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

        /**
         * param-text definition from RFC 5545 (pg. 10)
         *
         *     paramtext = *SAFE-CHAR
         */
        describe("isParamText()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isParamText");
            });

            it("returns true for valid param text", () => {

            });
        });

        /**
         * SAFE-CHAR definition from RFC 5545 (pg. 11)
         *
         *     SAFE-CHAR = WSP / %x21 / %x23-2B / %x2D-39 / %x3C-7E
         *               / NON-US-ASCII
         *     ; Any character except CONTROL, DQUOTE, ";", ":", ","
         */
        describe("isSafeChar()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isSafeChar");
            });
        });

        /**
         * quoted-string definition from RFC 5545 (pg. 11)
         *
         *     quoted-string = DQUOTE *QSAFE-CHAR DQUOTE
         */
        describe("isQuotedString()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isQuotedString");
            });
        });

        /**
         * QSAFE-CHAR definition from RFC 5545 (pg. 11)
         *
         *     QSAFE-CHAR = WSP / %x21 / %x23-7E / NON-US-ASCII
         *     ; Any character except CONTROL and DQUOTE
         */
        describe("isQSafeChar()", () => {
            it("exists", () => {
                expect(Parameter).itself.respondsTo("isQSafeChar");
            });
        });

    });
});