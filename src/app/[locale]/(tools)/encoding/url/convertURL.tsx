export function convertURL(mode: string, input: string, includeOptionalCharacters: boolean, encodeSpaceAsPlus: boolean): string {
  let newoutput: string = "";
  if (mode === "encode") {
    newoutput = encodeURL(input, encodeSpaceAsPlus, includeOptionalCharacters);
  } else { // decode
    newoutput = decodeURL(input, encodeSpaceAsPlus, includeOptionalCharacters);
  }
  return newoutput;
}

export function decodeURL(input: string, encodeSpaceAsPlus: boolean, includeOptionalCharacters: boolean) {
  let output: string = "";

  if (encodeSpaceAsPlus) {
    input = input.replaceAll("+", "%20");
  }

  output = decodeURIComponent(input);

  if (includeOptionalCharacters) {
    output = output
      .replaceAll("%7E", "~")
      .replaceAll("%21", "!")
      .replaceAll("%27", "'")
      .replaceAll("%28", "(")
      .replaceAll("%29", ")")
      .replaceAll("%2A", "*");
  }
  return output;
}

export function encodeURL(input: string, encodeSpaceAsPlus: boolean, includeOptionalCharacters: boolean) {
  let output: string = "";

  output = encodeURIComponent(input);

  if (encodeSpaceAsPlus) {
    output = output.replaceAll("%20", "+");
  }

  if (includeOptionalCharacters) {
    output = output
      .replaceAll("~", "%7E")
      .replaceAll("!", "%21")
      .replaceAll("'", "%27")
      .replaceAll("(", "%28")
      .replaceAll(")", "%29")
      .replaceAll("*", "%2A");
  }
  return output;
}
