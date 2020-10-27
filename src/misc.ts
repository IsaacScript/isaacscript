/* eslint-disable import/prefer-default-export */

import moment from "moment";

export function getTime(): string {
  return moment().format("h:mm:ss A"); // e.g. "1:23:45 AM"
}
