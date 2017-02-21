/**
 * Utility File
 *
 * @author Mark Stenglein <mark@stengle.in>
 */

/**
 * isAlpha checks to make sure that an input string consists ONLY of lower or
 * upper case letters.
 *
 * @since 0.1.0
 * @param input Input string to be tested
 * @returns boolean value of if it is only alpha
 */
export function isAlpha(input: string): boolean {
    return /^[a-zA-Z]+$/.test(input);
}

/**
 * Checks to see if the input string is a compliant iama-token
 *
 * Definition of iama-token from the spec:
 *
 *     iana-token = 1*(ALPHA / DIGIT / "-")
 *     ; iCalendar identifier registered with IANA
 *
 * @author Mark Stenglein <mark@stengle.in>
 * @since 0.1.0
 * @param input Input string to be tested
 * @returns boolean value of if it is a valid token
 */
export function isIanaToken(input: string): boolean {
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
export function isXName(input: string): boolean {
    return true;
}
