import { isAlpha } from "./util";
import { ICalElement } from "./ICalElement";

/**
 * Implementation of a Content Line Parameter from RFC 5545
 *
 * Chapter 3.1 defines the general ruleset for a parameter. This implementation
 * will utilize an abstract Class which is meant to be extended by specific
 * types of parameters.
 *
 *     param = param-name "=" param-value *("," param-value)
 *     ; Each property defines the specific ABNF for the parameters
 *     ; allowed on the property. Refer to specific properties for
 *     ; precise parameter ABNF.
 *
 * @author Mark Stenglein <mark@stengle.in>
 */
export default class Parameter implements ICalElement {
    /**
     * Stores the parameter name. This should be set through the set
     *   method (which validates the input), and not by directly accessing it.
     */
    private _paramName: string;
    /**
     * Stores the array of parameter values. This should be set through the set
     *   method (which validates the input), and not by directly accessing it.
     */
    private _paramValues: string[];
    /**
     * Value determines whether or not the parameter requres that the content
     *   line stores a value alongside the Parameter. Consult the individual
     *   implementations' documentation in the RFC to see more information on
     *   parameters which require this.
     *
     * @type boolean
     * @access private
     * @default false
     */
    private _reqContentValue: boolean = false;

    /**
     * Constructor builds the Parameter from the parameter name and an array of
     * values.
     *
     * For more specific implementations that use non-string datatypes, look at
     * extended implementations of this class.
     *
     * @author Mark Stenglein
     * @since 0.1.0
     * @access public
     * @param inName string The name of the new Parameter in iama-token / x-name
     * @param inValues string[] array of string values
     */
    constructor(inName: string, inValues: string[]) {
        this.paramName = inName;
        this.paramValues = inValues;
    }


    /* Get Methods */

    get paramName(): string {
        return this._paramName;
    }


    get paramValues(): string[] {
        return this._paramValues;
    }


    get reqContentValue(): boolean {
        return this._reqContentValue;
    }


    /* Set Methods */

    /**
     * Validates input param names and saves them to the object.
     *
     *     param-name = iana-token / x-name
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @access public
     * @param newName The new name to be tested and saved.
     * @returns void
     * @throws TypeError if newName is not a valid iCal name.
     */
    set paramName(newName: string) {
        /**
         * Note that the X-Name also passes these rules, the X-Name can be
         * defined separately.
         */
        if (Parameter.isIanaToken(newName) || Parameter.isXName(newName)) {
            this._paramName = newName;
        }
        else {
            throw new TypeError("Parameter must be valid iana-token or x-name");
        }
    }


    /**
     * Validates input param values and saves them to the object.
     *
     *     param-value = paramtext / quoted-string
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @access public
     * @param newValues The input values to be tested and saved.
     * @returns void
     * @throws TypeError if any of the input values are not valid param-value's
     */
    set paramValues(newValues: string[]) {
        let valid: boolean = true;
        newValues.forEach(newValue => {
            if (
                !((Parameter.isParamText(newValue)) ||
                (Parameter.isQuotedString(newValue)))
            ) {
                valid = false;
            }
        });

        if (!valid) {
            throw new TypeError(
                "param-value must either be valid paramtext or" +
                " quoted-string"
            );
        }
        else {
            this._paramValues = newValues;
        }
    }


    /**
     * Passes through and sets the reqContentValue property.
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @access public
     * @param required boolean value to show if the param needs a content value
     * @returns void
     */
    set reqContentValue(required: boolean) {
        this._reqContentValue = required;
    }


    /**
     * Generates the proper string representation for a Parameter as defined by
     * RFC 5545:
     *
     *     param = param-name "=" param-value *("," param-value)
     *
     * @author Mark Stenglein
     * @since 0.1.0
     * @access public
     * @returns string Representation of the Parameter as defined in RFC 5545
     */
    public generate(): string {
        let outputString = this.paramName + "=";
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


    /**
     * Checks to see if the input string is a compliant iama-token
     *
     * Definition of iana-token from the spec:
     *
     *     iana-token = 1*(ALPHA / DIGIT / "-")
     *     ; iCalendar identifier registered with IANA
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @param input Input string to be tested
     * @returns boolean value of if it is a valid token
     */
    public static isIanaToken(input: string): boolean {
        return /^[a-zA-Z0-9-]+$/.test(input);
    }

    /**
     * Checks to see if the input string is a compliant x-token
     *
     * Definition of x-name from the spec:
     *
     *     x-name = "X-" [vendorid "-"] 1*(ALPHA / DIGIT / "-")
     *     ; Reserved for experimental use.
     *
     *     vendorid = 3*(ALPHA / DIGIT)
     *     ; Vendor identification
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @param input Input string to be tested
     * @returns boolean value of if input is a valid experimental token
     *
     * TODO: Implement this!
     */
    public static isXName(input: string): boolean {
        if (!(input.substring(0,2) === "X-")) {
            return false;
        }
        return /^[a-zA-Z0-9-]+$/.test(input);
    }

    /**
     * Tests to make sure input is compliant with the definition of `param-text`
     *
     *     paramtext = *SAFE-CHAR
     *
     * @author Mark Stenglein
     * @since 0.1.0
     * @param testString string to be tested
     * @returns boolean If the input is valid param-test
     */
    public static isParamText(testString: string): boolean {
        return Parameter.isSafeChar(testString);
    }


    /**
     * Tests to make sure the input is compliant with the definition of
     * `SAFE-CHAR`
     *
     *     SAFE-CHAR = WSP / %x21 / %x23-2B / %x2D-39 / %x3C-7E / NON-US-ASCII
     *     ; Any character except CONTROL, DQUOTE, ";", ":", ","
     *
     * @author Mark Stenglein
     * @since 0.1.0
     * @param testString string to be tested
     * @returns boolean If the input is valid SAFE-CHAR
     *
     * TODO: verify this regex
     */
    public static isSafeChar(testString: string): boolean {
        return /^[\s\x21\x23-\x2b\x2d-\x39\x3c-\x7e\x80-\xff]+$/.test(testString);
    }


    /**
     * Tests to make sure the input is compliant with the definition of
     * `quoted-string`
     *
     *     quoted-string = DQUOTE *QSAFE-CHAR DQUOTE
     *
     * @author Mark Stenglein
     * @since 0.1.0
     * @param testString string to be tested
     * @returns boolean If the input is a valid `quoted-string`
     */
    public static isQuotedString(test: string): boolean {
        let result: boolean = false;
        if (
            test.charAt(0) === "\"" &&
            test.charAt(test.length - 1) === "\"" &&
            Parameter.isQSafeChar(test.substring(1, test.length - 1))
        ) {
            result = true;
        }
        return result;
    }


    /**
     * Tests to make sure the input is compliant with the definition of
     * `QSAFE-CHAR`
     *
     *     QSAFE-CHAR = WSP / %x21 / %x23-7E / NON-US-ASCII
     *     ; Any character except CONTROL and DQUOTE
     *
     * @author Mark Stenglein
     * @since 0.1.0
     * @param test string to be tested
     * @returns boolean If the input is a valid `QSAFE-CHAR` string
     *
     * TODO: verify this regex
     */
    public static isQSafeChar(test: string): boolean {
        return /^[\s\x21\x23-\x7e\x80-\xff]+$/.test(test);
    }
}
