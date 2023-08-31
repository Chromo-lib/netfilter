import { WebResponseErrorDetails } from "../types";

export default function filterRequestDetails(requestDetails: WebResponseErrorDetails[], requestFilter) {
  const { errname, type, url } = requestFilter;

  let filteredDetails = requestDetails.slice(0);

  if (url && url.length > 0) {
    filteredDetails = filteredDetails.filter(v => v.url.includes(url) || (v.initiator || v.originUrl).includes(url));
  }

  if (errname && errname.length > 0 && errname !== 'ALL') {
    filteredDetails = filteredDetails.filter(v => v.error.includes(errname) || v.error === errname);
  }

  if (type && type.length > 0 && type !== 'ALL') {
    filteredDetails = filteredDetails.filter(v => v.type.includes(type));
  }

  return filteredDetails;
}