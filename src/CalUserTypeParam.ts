import Parameter from "./Parameter";

export default class CalUserTypeParam extends Parameter {
    private _calUserType: string;
    constructor(usertype: string) {
        super("CUTYPE", []);
    }

    get calUserType(): string {
        return this._calUserType;
    }
}
