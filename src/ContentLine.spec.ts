import ContentLine from "./ContentLine";
import { expect } from "chai";
import "mocha";

describe("ContentLine", () => {
    it("Should exist", () => {
        let result = !ContentLine;

        expect(result).to.be.false;
    })
})

