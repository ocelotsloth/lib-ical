import { isAlpha, isIamaToken, isXName } from "./util";
import { ParameterValue } from "./ParameterValue";

/**
 * Implementation of a Content Line Parameter from RFC 5545
 *
 * Chapter 3.1 defines the general ruleset for a parameter. This implementation
 * will utilize an abstract Class which is meant to be extended by specific
 * types of parameters.
 *
 * @author Mark Stenglein <mark@stengle.in>
 */
export default class Parameter {
    private _paramName: string;
    private _paramValues: string[] | Date[];

    /**
     * Constructor builds the Parameter from the parameter name and an array of
     * values.
     * 
     * @author Mark Stenglein
     * @since 0.1.0
     * @param inName string The name of the new Parameter in iama-token / x-name
     * @param inValues string[] | Date[] array of values
     */
    constructor(inName: string, inValues: string[] | Date[]) {
        this.paramName = inName;
        this.paramValues = inValues
    }

    /** Get Methods */

    get paramName() {
        return this._paramName;
    }

    get paramValues() {
        return this.paramValues;
    }

    /** Set Methods */

    /**
     * Validates input param names and saves them to the object.
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @param newName The new name to be tested and saved.
     * @returns void
     * @throws TypeError if newName is not a valid iCal name.
     */
    set paramName(newName: string) {
        /**
         * Note that the X-Name also passes these rules, the X-Name can be
         * defined separately.
         */
        if (isIamaToken(newName)) {
            this._paramName = newName;
        }
        else {
            throw new TypeError("Parameter must be valid iama-token or x-token");
        }
    }

    /**
     * Validates input param values and saves them to the object.
     * 
     * @author
     * @since 0.1.0
     * @param newValues The input values to be tested and saved.
     */
    set paramValues(newValues: string[] | Date[]) {
        this._paramValues = newValues;
    }

    /**
     * Generates the proper string representation for a Parameter as defined by
     * RFC 5545:
     *
     *     param = param-name "=" param-value *("," param-value)
     *
     * @author Mark Stenglein
     * @since 0.1.0
     * @returns string Representation of the Parameter as defined in RFC 5545
     */
    public generate(): string {
        let outputString = this.paramName;

        /**
         * Goes through each parameter value and adds it, being sure to place
         * the comma for the 2nd parameter onwards.
         */
        for (let i = 0; i < this.paramValues.length; i++) {
            if (i !== 0) {
                outputString += ",";
            }
            outputString += this.paramValues[i];
        }

        return outputString;
    }
}
