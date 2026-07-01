export class XMLParser {
  constructor(options?: unknown) {}
  parse(xml: string): unknown { return {}; }
}
export class XMLBuilder {
  constructor(options?: unknown) {}
  build(obj: unknown): string { return ''; }
}
export const XMLValidator = {
  validate(xml: string): true | { err: { msg: string; line: number; col: number } } { return true; }
};
