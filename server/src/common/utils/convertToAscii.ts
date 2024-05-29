export function convertToAscii(inputString: string) {
  // remove non ascii characters
  return inputString.replace(/[^\x00-\x7F]+/g, '');
}
