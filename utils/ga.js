export function sendGaEvent(event, eventParams = undefined) {
  if (gtag) {
    gtag("event", event, eventParams);
  }
}
