import { isAlpha } from "../src/util";
import { expect } from "chai";
import "mocha";

describe("util", () => {
    describe("isAlpha", () => {

        it("Should exist", () => {
            let result = true;

            if (typeof isAlpha === undefined) {
                result = false;
            }

            expect(result).to.be.true;
        });

        it("Should return false for numbers", () => {
            const test = "12345";
            const result = isAlpha(test);

            expect(result).to.be.false;
        });

        it("Should return false for alpha numerics", () => {
            const test = "a2a";
            const result = isAlpha(test);

            expect(result).to.be.false;
        });

        it("Should return false for non-alpha numerics", () => {
            const test = ".%3adsk)#";
            const result = isAlpha(test);

            expect(result).to.be.false;
        });

        it("Should return true for lowercase alpha", () => {
            const test = "abcdef";
            const result = isAlpha(test);

            expect(result).to.be.true;
        });

        it("Should return true for uppercase alpha", () => {
            const test = "ABCDEF";
            const result = isAlpha(test);

            expect(result).to.be.true;
        });

        it("Should return true for mixed alpha", () => {
            const test = "aBcDeF";
            const result = isAlpha(test);

            expect(result).to.be.true;
        });
    });
});
