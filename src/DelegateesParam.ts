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
 * DelegateesParam Class (Chapter 3.2.5)
 *
 * - Purpose: To specify the calendar users to whom the calendar user
 *   specified by the property has delegated participation.
 *
 * - Format Definition: This property parameter is defined by the following
 *   notation:
 *
 *      - deltoparam = "DELEGATED-TO" "=" DQUOTE cal-address 
 *                      DQUOTE *("," DQUOTE cal-address DQUOTE)
 * 
 * - Description:
 *     - The parameter is specified on properties of the CAL-ADDRESS value
 *       type.
 *     - This parameter specifies those calendar users whom have been delegated
 *       participation in a group-scheduled event or to-do by the calendar user
 *       specified by the property.
 *     - The individual calendar address parameter values MUST each be specified
 *       in a quoted-string.
 * 
 * - Example:
 *
 *     ATTENDEE;DELEGATED-TO="mailto:jdoe@example.com","mailto:
 *      jqpublic@example.com":mailto:jsmith@example.com
 * 
 * @since 0.1.0
 * @author David Haynes <dhaynes3@gmu.edu>
 */
export default class DelegateesParam extends Parameter {

}