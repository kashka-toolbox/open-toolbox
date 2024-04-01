export function approximateLatexTextOutput(latex: string): string {
  // Remove comments
  latex = latex.replace(/%.*\n/g, "");

  // Remove standard non content
  latex = latex.replace(/\\begin\s*(\[.*\])*\s*\{.*\}|\\end\s*(\[.*\])*\s*\{.*\}|\\documentclass\s*(\[.*\])*\s*\{.*\}|\\usepackage\s*(\[.*\])*\s*\{.*\}|\\title\s*(\[.*\])*\s*\{.*\}|%.*\n|\\.+{|(?<!\\)\}/g, "");
  return latex;
}
