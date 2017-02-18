import ContentLine from "./ContentLine";
import { expect } from "chai";
import "mocha";

describe("ContentLine", () => {
    it("Should exist", () => {
        let result = true;

        if (typeof ContentLine === undefined) {
            result = false;
        }

        expect(result).to.be.true;
    });
});

