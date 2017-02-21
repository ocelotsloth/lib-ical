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
            const result: Parameter = new Parameter("TestName", []);
            expect(result).to.exist;
        });
    });

    describe("GET Methods", () => {
        describe("paramName", () => {

        });

        describe("paramValues", () => {

        });
    });

    describe("SET Methods", () => {
        describe("paramName", () => {

        });

        describe("paramValues", () => {

        });
    });

    describe("generate()", () => {

    });

    describe("STATIC Methods", () => {
        describe("isParamText()", () => {

        });

        describe("isSafeChar()", () => {

        });

        describe("isQuotedString()", () => {

        });

        describe("isQSafeChar()", () => {

        });

    });
});