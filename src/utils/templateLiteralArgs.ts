export const templateLiteralArgs =
  (strings: TemplateStringsArray, ...values: any[])
  : [TemplateStringsArray, ...any[]] =>
  [strings, ...values]
