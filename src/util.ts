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


