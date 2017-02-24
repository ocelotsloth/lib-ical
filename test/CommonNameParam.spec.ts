import CommonNameParam from "../src/CommonNameParam";
import { expect } from "chai";
import "mocha";

describe("CommonNameParam", () => {
    it("exists", () => {
        expect(CommonNameParam).to.exist;
    });

    describe("constructor", () => {
        it("Generates a value", () => {
            const param: CommonNameParam = new CommonNameParam("@ocelotsloth");
            expect(param).to.exist;
        });

        it("Fails on bad input `\"`", () => {
            expect(() => {
                const param: CommonNameParam = new CommonNameParam("Bad quotes \" in middle");
            }).to.throw(
                "param-value must either be valid paramtext or quoted-string"
            );
        });

        it("Fails on bad input `;`", () => {
            expect(() => {
                const param: CommonNameParam = new CommonNameParam("Bad semicolons ; in middle");
            }).to.throw(
                "param-value must either be valid paramtext or quoted-string"
            );
        });

    });

    describe("GET Methods", () => {
        it("Retruns a value", () => {
            const param: CommonNameParam = new CommonNameParam("@ocelotsloth");
            expect(param.commonName).to.exist;
        });

        it("Returns the correct value", () => {
            const param: CommonNameParam = new CommonNameParam("@ocelotsloth");
            expect(param.commonName).to.equal("@ocelotsloth");
        });
    });

    describe("SET Methods", () => {
        it("Allows changes to common name", () => {
            const param: CommonNameParam = new CommonNameParam("Mark Stenglein");
            expect(param.commonName).to.equal("Mark Stenglein");
            param.commonName = "@ocelotsloth";
            expect(param.commonName).to.equal("@ocelotsloth");
        });
    });

    describe("generate()", () => {
        it("Generates the right value", () => {
            const param: CommonNameParam = new CommonNameParam("Mark Stenglein");
            const expected: string = "CN=Mark Stenglein";
            expect(param.generate()).to.equal(expected);
        });
    });
});