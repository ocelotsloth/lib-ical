# RFC 5545 Implementation Progress

This file tracks how far into the RFC document the project has made it to.

# The Docs

## 1. Introduction

## 2. Basic Grammar and Conventions

### 2.1. Formatting Conventions
### 2.2. Related Memos

## 3. iCalendar Object Specification

### *3.1. Content Lines

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

  - A property can have attributes with which it is associated.

    - "Property Parameters" contain meta-information about the property or the
    property value.

  - Property parameter values containing the COLON, SEMICOLON, or COMMA
  character separators MUST be specified as quoted-string text values.

  - Property parameter values MUST NOT contain the DQUOTE character. The DQUOTE
  character is reserved as a delimiter for parameter values that contain
  restructed characters or URI test. For example:

  > ```
  > DESCRIPTION;ALTREP="cid:part1.0001@example.org":The Fall'98 Wild
  >   Wizards Conference - - Las Vegas\, NV\, USA
  > ```

  - The general property parameters defined by RFC 5545 (and either implemented
  or planned for this library) are defined by the following notation:

  > ```
  > icalparameter = altrepparam ; Alternate text representation
  >               / cnparam ; Common name
  >               / cutypeparam ; Calendar user type
  >               / delfromparam ; Delegator
  >               / deltoparam ; Delegatee
  >               / dirparam ; Directory entry
  >               / encodingparam ; Inline encoding
  >               / fmttypeparam ; Format type
  >               / fbtypeparam ; Free/busy time type
  >               / languageparam ; Language for text
  >               / memberparam ; Group or list membership
  >               / partstatparam ; Participation status
  >               / rangeparam ; Recurrence identifier range
  >               / trigrelparam ; Alarm trigger relationship
  >               / reltypeparam ; Relationship type
  >               / roleparam ; Participation role
  >               / rsvpparam ; RSVP expectation
  >               / sentbyparam ; Sent by
  >               / tzidparam ; Reference to time zone object
  >               / valuetypeparam ; Property value data type
  >               / other-param
  >
  > other-param = (iana-param / x-param)
  >
  > iana-param = iana-token "=" param-value *("," param-value)
  > ; Some other IANA-registered iCalendar parameter.
  >
  > x-param = x-name "=" param-value *("," param-value)
  > ; A non-standard, experimental parameter.
  > ```

  - Applications MUST ignore x-param and iana-param values they don't
  recognize.

### 3.2.1. Alternate Text Representation
### 3.2.2. Common Name
### 3.2.3. Calendar User Type
### 3.2.4. Delegators
### 3.2.5. Delegatees
### 3.2.6. Directory Entry Reference
### 3.2.7. Inline Encoding
### 3.2.8. Format Type
### 3.2.9. Free/Busy Time type
### 3.2.10. Language
### 3.2.11. Group or List Membership
### 3.2.12. Participation Status
### 3.2.13. Recurrence Identifier Range
### 3.2.14. Alarm Trigger Relationship
### 3.2.15. Relationship Type
### 3.2.16. Participation Role
### 3.2.17. RSVP Expectation
### 3.2.18. Sent By
### 3.2.19. Time Zone Identifier
### 3.2.20. Value Data Types

## 3.3. Property Value Data Types

### 3.3.1. Binary
### 3.3.2. Boolean
### 3.3.3. Calendar User Address
### 3.3.4. Date
### 3.3.5. Date-Time
### 3.3.6. Duration
### 3.3.7. Float
### 3.3.8. Integer
### 3.3.9. Period of Time
### 3.3.10. Recurrence Rule
### 3.3.11. Text
### 3.3.12. Time
### 3.3.13. URI
### 3.3.14. UTC Offset

## 3.4. iCalendar Object

## 3.5. Property

## 3.6. Calendar Components

### 3.6.1. Event component
### 3.6.2. To-Do Component
### 3.6.3. Journal Component
### 3.6.4. Free/Busy Component
### 3.6.5. Time Zone Component
### 3.6.6. Alarm Component

## 3.7. Calendar Properties

### 3.7.1. Calendar Scale
### 3.7.2. Method
### 3.7.3. Product Identifier
### 3.7.4. Version

## 3.8. Component Properties

### 3.8.1. Descriptive Component Properties

#### 3.8.1.1. Attachment
#### 3.8.1.2. Categories
#### 3.8.1.3. Classification
#### 3.8.1.4. Comment
#### 3.8.1.5. Description
#### 3.8.1.6. Geographic Position
#### 3.8.1.7. Location
#### 3.8.1.8. Percent Complete
#### 3.8.1.9. Priority
#### 3.8.1.10. Resources
#### 3.8.1.11. Status
#### 3.8.1.12. Summary

### 3.8.2. Date and Time Component Properties

#### 3.8.2.1. Date-Time Completed
#### 3.8.2.2. Date-Time End
#### 3.8.2.3. Date-Time Due
#### 3.8.2.4. Date-Time Start
#### 3.8.2.5. Duration
#### 3.8.2.6. Free/Busy Time
#### 3.8.2.7. Time Transparency

### 3.8.3. Time Zone Component Properties

#### 3.8.3.1. Time Zone Identifier
#### 3.8.3.2. Time Zone Name
#### 3.8.3.3. Time Zone Offset From
#### 3.8.3.4. Time Zone Offset To
#### 3.8.3.5. Time Zone URL

### 3.8.4. Relationship Component Properties

#### 3.8.4.1. Attendee
#### 3.8.4.2. Contact
#### 3.8.4.3. Organizer
#### 3.8.4.4. Recurrence ID
#### 3.8.4.5. Related To
#### 3.8.4.6. Uniform Resource Locator
#### 3.8.4.7. Unique Identifier

### 3.8.5. Recurrence Component Properties

#### 3.8.5.1. Exception Date-Times
#### 3.8.5.2. Recurrence Date-Times
#### 3.8.5.3. Recurrence Rule

### 3.8.6. Alarm Component Properties

#### 3.8.6.1. Action
#### 3.8.6.2. Repeat Count
#### 3.8.6.3. Trigger

### 3.8.7. Change Management Component Properties

#### 3.8.7.1. Date-Time Created
#### 3.8.7.2. Date-Time Stamp
#### 3.8.7.3. Last Modified
#### 3.8.7.4. Sequence Number

### 3.8.8. Miscellaneous Component Properties

#### 3.8.8.1. IANA Properties
#### 3.8.8.2. Non-Standard Properties
#### 3.8.8.3. Request Status

## 4. iCalendar Object Examples
## 5. Recommended Practices
## 6. Internationalization Considerations
## 7. Security Considerations
## 8. IANA Considerations
## 9. Acknowledgments
## 10. References
## Appendix A

