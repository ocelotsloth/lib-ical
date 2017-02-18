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

    it("Should create an object", () => {
        let test = new ContentLine("name", ["param"], "value");
        let result = true;

        if (typeof test === undefined) {
            result = false;
        }

        expect(result).to.be.true;
    });
});

