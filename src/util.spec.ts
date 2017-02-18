import { isAlpha } from "./util";
import { expect } from "chai";
import "mocha";

describe("util", () => {
    describe("isAlpha", () => {
        it("Should return false for numbers", () => {
            let test = "12345";
            let result = isAlpha(test);

            expect(result).to.be.false;
        });

        it("Should return false for alpha numerics", () => {
            let test = "a2a";
            let result = isAlpha(test);

            expect(result).to.be.false;
        });

        it("Should return true for lowercase alpha", () => {
            let test = "abcdef";
            let result = isAlpha(test);

            expect(result).to.be.true;
        });

        it("Should return true for uppercase alpha", () => {
            let test = "ABCDEF";
            let result = isAlpha(test);

            expect(result).to.be.true
        });

        it("Should return true for mixed alpha", () => {
            let test = "aBcDeF";
            let result = isAlpha(test);

            expect(result).to.be.true;
        });
    });
});
