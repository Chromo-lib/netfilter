import { WebResponseErrorDetails } from "../types";

export default function filterRequestDetails(requestDetails: WebResponseErrorDetails[], requestFilter) {
  const { errname, type, url } = requestFilter;

  let filteredDetails = requestDetails;

  if (url.length > 0) {
    filteredDetails = filteredDetails.filter(v =>
      (v.url.includes(url) || (v.initiator || v.originUrl).includes(url)) && v.error.includes('BLOCKED')
    );
  }

  if (errname !== 'ALL') {
    filteredDetails = filteredDetails.filter(v => v.error!.includes(errname));
  }

  if (type !== 'ALL') {
    filteredDetails = filteredDetails.filter(v => v.type.includes(type));
  }

  return filteredDetails;
}