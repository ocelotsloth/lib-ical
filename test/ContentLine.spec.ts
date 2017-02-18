import ContentLine from "../src/ContentLine";
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
            const test: ContentLine = new ContentLine("name", ["param"], "value");
            let result: boolean = true;

            if (typeof test === undefined) {
                result = false;
            }

            expect(result).to.be.true;
        });

        it("Should have the same name as given on input", () => {
            const test: string = "name";
            const testLine: ContentLine = new ContentLine(test, ["param"], "value");
            const result: string = testLine.name;

            expect(result).to.be.equal(test);
        });

        it("Should have the same param as given on input", () => {
            const testParam1: string[] = ["param1"];
            const testLine: ContentLine = new ContentLine("name", testParam1, "value");
            const result: string[] = testLine.params;

            expect(result).to.be.deep.equal(testParam1);
        });

        it("Should accept multiple param values on input", () => {
            const testParams: string[] = ["param1", "param2"];
            const testLine: ContentLine = new ContentLine("name", testParams, "value");
            const result: string[] = testLine.params;

            expect(result).to.be.deep.equal(testParams);
        });

        it("Should accept no param values as input", () => {
            const testParams: string[] = [];
            const testLine: ContentLine = new ContentLine("name", testParams, "value");
            const result: string[] = testLine.params;

            expect(result).to.be.deep.equal(testParams);
        });

        it("Should have the same value as given on input", () => {
            const testValue: string = "testValue";
            const testLine: ContentLine = new ContentLine("name", ["test"], testValue);
            const result: string = testLine.value;

            expect(result).to.be.equal(testValue);
        });
    });

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
         })

     });
});
