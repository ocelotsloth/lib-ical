/**
 * Generic ICalElement interface which requires a generate command
 *
 * @author Mark Stenglein <mark@stengle.in>
 * @since 0.1.0
 */
export interface ICalElement {
    generate(): string;
}
