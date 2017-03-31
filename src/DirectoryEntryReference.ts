/*
 * lib-ical
 * Copyright (C) 2017 Mark Stenglein
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
import Parameter from "./Parameter";

/**
 * DelegatorsParam Class (Chapter 3.2.4)
 *
 * - Purpose: To specify reference to a directory entry associated with the
 *   calendar user specified by the property.
 *
 * - Format Definition: This property parameter is defined by the following
 *   notation:
 *
 *     - dirparam  = "DIR" "=" DQUOTE uri DQUOTE
 *
 * - Description:
 *
 * - Example:
 *
 *     ORGANIZER;DIR="ldap://example.com:6666/o=ABC%20Industries,
 *      c=US???(cn=Jim%20Dolittle)":mailto:jimdo@example.com
 *
 * @since 0.1.0
 * @author Mark Stenglein <mark@stengle.in>
 */
export default class DelegatorsParam extends Parameter {

}

