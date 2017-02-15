'use strict';

/**
 * @author Mark Stenglein (@ocelotsloth)
 * @module timezone
 * @constructor ICalTimezone Timezone
 */
var ICalTimezone = function(_data, calendar) {
  var attributes = [
    'tzid',      // REQUIRED, MUST NOT occur more than once
    'last-mod',  // OPTIONAL, MUST NOT occur more than once
    'tzurl',     // OPTIONAL, MUST NOT occur more than once
    'standardc', // Either {s/d}c REQUIRED, MAY occur more than once
    'daylightc', // Either {s/d}c REQUIRED, MAY occur more than once
    'x-prop',    // OPTIONAL, MAY occur more than once
    'iana-prop'  // OPTIONAL, MAY occur more than once
  ];
};

module.exports = ICalTimezone;
