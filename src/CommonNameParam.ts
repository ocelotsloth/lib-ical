import Parameter from "./Parameter";

/**
 * **Implements Section 3.2.2: Common Name from RFC 5545**
 *
 * Example (see the CN param):
 *
 *     `ORGANIZER;CN="John Smith":mailto:jsmith@example.com`
 *
 * Defined as:
 *
 *     `cnparam = "CN" "=" param-value`
 *
 * @author Mark Stenglein <mark@stengle.in>
 * @since 0.1.0
 */
export default class CommonNameParam extends Parameter {
    private _commonName: string;

    constructor(commonName: string) {
        super("CN", []);
        this.commonName = commonName;
        this.paramValues = [this.commonName];
    }

    get commonName() {
        return this._commonName;
    }

    /**
     * Checks to make sure that the common name is either param-text or
     *   quoted-text and sets the private commonName variable.
     *
     * @author Mark Stenglein <mark@stengle.in>
     * @since 0.1.0
     * @param newCommonName the new common name to be validated and set
     * @returns void
     */
    set commonName(newCommonName: string) {
        this._commonName = newCommonName;
    }
}