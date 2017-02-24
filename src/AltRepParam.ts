import Parameter from "./Parameter";

/**
 * Implements the Alternate text representation parameter
 *
 *  Format Definition: This property parameter is defined by the
 *    following notation:
 *
 *      altrepparam = "ALTREP" "=" DQUOTE uri DQUOTE
 *
 * This parameter specifies a URI that points to an alternate representation
 *   for a textual property value.
 *
 * A property specifying this parameter MUST also include a value that reflects
 *   the default representation of the text value.
 *
 * The URI parameter value MUST be specified in a quoted-string.
 *
 * @author Mark Stenglein <mark@stengle.in>
 */
export default class AltRepParam extends Parameter {
    private _uri: string;

    constructor(uri: string) {
        if (!uri) {
            throw new TypeError("uri must be defined for AltRepParam");
        }
        else {
            super("ALTREP", []);
            this.uri = uri;
            this.reqContentValue = true;
        }
    }

    get uri(): string {
        return this._uri;
    }

    /**
     * Allows you to set the parameter with either a quoted-string or a
     *   QSAFE-CHAR, which will be converted into a quoted-string
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @param newUri string value of the new URI which is to be validated
     * @returns void
     * @access public
     */
    set uri(newUri: string) {
        if (Parameter.isQSafeChar(newUri)) {
            this._uri = newUri;
            this.paramValues = ["\"" + this.uri + "\""];
        }
        else if (Parameter.isQuotedString(newUri)) {
            this._uri = newUri;
            this.paramValues = [newUri];
        }
        else {
            throw new TypeError("URI must be QSAFE-CHAR or quoted-string");
        }
    }
}
