# RFC 5545 Implementation Progress

This file tracks how far into the RFC document the project has made it to.

# The Docs

## 1. Introduction

## 2. Basic Grammar and Conventions

### 2.1. Formatting Conventions
### 2.2. Related Memos

## 3. iCalendar Object Specification

### 3.1. Content Lines

The iCalendar object is organized into lines of text, called **content lines**.

Content lines **SHOULD NOT** be longer than **75 octets**, excluding the line
breaks.

  - Content lines **SHOULD** be split into multiple line representations via
  *folding*. This can be done by inserting a **CRLF** immediately followed by a
  single whitespace character. For this library we will use a space.

> For example:
>
> ```
> DESCRIPTION:This is a long description that exists on a long line.
> ```
>
> Can be represented as:
>
> ```
> DESCRIPTION:This is a lo
>  ng description that exi
>  sts on a long
>   line.
> ```

  - When *unfolding* the content lines back to their single line representation,
  simply look for each instance of a **CRLF** followed by a single whitespace
  and remove both.

    - **Note:** In when parsing, it should look for **any** whitespace, not
    just the whitespace character used by this library's generation scheme.

    - **Note:** Simple *(read: poor)* implementations can generate improperly
    folded lines in the middle of UTF-8 multi-octed sequences. When implementing
    the line parser be sure to properly restore mangled sequences.

> The following notation defines the lines of content in an iCalendar object:
>
> ```
> contentline  = name *(";" param ) ":" value CRLF
> ; This ABNF is just a general definition for an initial parsing
> ; This ABNF is just a general definition for an initial parsing
> ; of the content line into its property name, parameter list,
> ; and value string
>
> ; When parsing a content line, folded lines MUST first
> ; be unfolded according to the unfolding procedure
> ; described above. When generating a content line, lines
> ; longer than 75 octets SHOULD be folded according to
> ; the folding procedure described above.
>
> name = iana-token / x-name
>
> iana-token = 1*(ALPHA / DIGIT / "-")
> ; iCalendar identifier registered with IANA
>
> x-name = "X-" [vendorid "-"] 1*(ALPHA / DIGIT / "-")
> ; Reserved for experimental use.
>
> vendorid = 3*(ALPHA / DIGIT)
> ; Vendor identification
>
> param = param-name "=" param-value *("," param-value)
> ; Each property defines the specific ABNF for the parameters
> ; allowed on the property. Refer to specific properties for
> ; precise parameter ABNF.
>
> param-name = iana-token / x-name
>
> param-value = paramtext / quoted-string
>
> paramtext = *SAFE-CHAR
>
> value = *VALUE-CHAR
>
> quoted-string = DQUOTE *QSAFE-CHAR DQUOTE
>
> QSAFE-CHAR = WSP / %x21 / %x23-7E / NON-US-ASCII
> ; Any character except CONTROL and DQUOTE
>
> SAFE-CHAR = WSP / %x21 / %x23-2B / %x2D-39 / %x3C-7E
> / NON-US-ASCII
> ; Any character except CONTROL, DQUOTE, ";", ":", ","
>
> VALUE-CHAR = WSP / %x21-7E / NON-US-ASCII
> ; Any textual character
>
> NON-US-ASCII = UTF8-2 / UTF8-3 / UTF8-4
> ; UTF8-2, UTF8-3, and UTF8-4 are defined in [RFC3629]
>
> CONTROL = %x00-08 / %x0A-1F / %x7F
> ; All the controls except HTAB

  - Each property value of a component line has a format defined in that
  property's specific section. Go there to see the more specific definitions.

  - All names of properties, parameters, enumerated property values, and
  property parameter values are **case-insensitive**.

  - All other property values, unless otherwise stated, are **case-sensitive**.

#### 3.1.1. List and Field Separators

  - Properties which allow lists of values will have those values separated by
  the **COMMA** character.

  - There is no significance to the order of values in a list.

  - For values specified in quoted-strings, each quoted-string should be
  separated by a **COMMA** character.

  - Some property values are defined in terms of multiple parts. Each value
  **MUST** be separated by a **SEMICOLON** character.

#### 3.1.2. Multiple Values
#### 3.1.3. Binary Content
#### 3.1.4. Character Set

### 3.2. Property Parameters

## 4. iCalendar Object Examples
## 5. Recommended Practices
## 6. Internationalization Considerations
## 7. Security Considerations
## 8. IANA Considerations
## 9. Acknowledgments
## 10. References
## Appendix A

