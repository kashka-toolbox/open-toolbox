export function isMessageAFunctioncall(message: string) {
  return message.startsWith("<functioncall>") && message.endsWith("</functioncall>");
}