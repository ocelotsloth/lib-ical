import ContentLine from "../src/ContentLine";
import Parameter from "../src/Parameter";
import { expect } from "chai";
import "mocha";

/**
 * Test The ContentLine class
 */
describe("ContentLine", () => {
    it("Should exist", () => {
        expect(ContentLine).to.exist;
    });

    /**
     * Test ContentLine's constructor
     */
    describe("constructor", () => {
        it("Should create an object", () => {
            let param: Parameter = new Parameter("testParam", ["test1"]);
            const test: ContentLine = new ContentLine("name", [param], "value");
            let result: boolean = true;

            if (typeof test === undefined) {
                result = false;
            }

            expect(result).to.be.true;
        });

        it("Should have the same name as given on input", () => {
            const param: Parameter = new Parameter("testParam", ["test1"]);
            const test: string = "name";
            const testLine: ContentLine = new ContentLine(test, [param], "value");
            const result: string = testLine.name;

            expect(result).to.be.equal(test);
        });

        it("Should have the same param as given on input", () => {
            const testParam1: Parameter[] = [new Parameter("testParam", ["test1"])];
            const testLine: ContentLine = new ContentLine("name", testParam1, "value");
            const result: Parameter[] = testLine.params;

            expect(result).to.be.deep.equal(testParam1);
        });

        it("Should accept multiple param values on input", () => {
            const param1: Parameter = new Parameter("param1", ["value1"]);
            const param2: Parameter = new Parameter("param2", ["value2"]);
            const testParams: Parameter[] = [param1, param2];

            const testLine: ContentLine = new ContentLine("name", testParams, "value");
            const result: Parameter[] = testLine.params;

            expect(result).to.be.deep.equal(testParams);
        });

        it("Should accept no param values as input", () => {
            const testParams: Parameter[] = [];
            const testLine: ContentLine = new ContentLine("name", testParams, "value");
            const result: Parameter[] = testLine.params;

            expect(result).to.be.deep.equal(testParams);
        });

        it("Should have the same value as given on input", () => {
            const testValue: string = "testValue";
            const testParam: Parameter = new Parameter("name", [testValue]);
            const testLine: ContentLine = new ContentLine("name", [testParam], testValue);
            const result: string = testLine.params[0].paramValues[0];

            expect(result).to.be.equal(testValue);
        });
    }); /** describe("constructor") */

    /**
     * Test `fold` static method
     *
     * @author Mark Stenglein <mark@stenle.in>
     */
     describe("fold", () => {
         it("Should exist as a static method", () => {
             expect(ContentLine).itself.respondsTo("fold");
         });

         it("Should not fold short lines", () => {
             const test: string = "A short line";
             const result: string = ContentLine.fold(test);

             expect(test).to.be.equal(result);
         });

         it("Should fold lines longer than 74 characters", () => {
             const test: string = "This is a quite long string which should" +
                " be folded on the 74th character exactly.";

             const expected: string = "This is a quite long string which" +
                " should be folded on the 74th character e\r\n xactly.";

             const result: string = ContentLine.fold(test);

             expect(result).to.be.equal(expected);
         });

         it("Should fold really long lines at each fold spot.", () => {
             const test: string = "This string is longer than 10, being 74" +
                " characters long to be quite exact.This string is longer" +
                " than 10, being 74 characters long to be quite exact.This" +
                " string is longer than 10, being 74 characters long to be" +
                " quite exact.";

             const expected: string = "This string is longer than 10, being" +
                " 74 characters long to be quite exact.\r\n This string is" +
                " longer than 10, being 74 characters long to be quite" +
                " exact.\r\n This string is longer than 10, being 74" +
                " characters long to be quite exact.";

             const result: string = ContentLine.fold(test);

             expect(result).to.be.equal(expected);
         });
     }); /** describe("fold") */

     describe("generate", () => {
         it("Should respond as non-static method", () => {
             expect(ContentLine).respondsTo("generate");
         });

         it("Should generate properly formatted lines", () => {
             const param1: Parameter = new Parameter("PARAM-ONE", ["value1", "value2"])
             const param2: Parameter = new Parameter("PARAM-TWO", ["value1"])
             const params: Parameter[] = [param1, param2];
             const test: ContentLine = new ContentLine("NAME", params, "value");
             const expected = "NAME;PARAM-ONE=value1,value2;PARAM-TWO=value1:value";
             const result = test.generate();

             expect(result).to.be.equal(expected);
         });
     }); /** describe("generate") */
}); /** describe("ContentLine") */
