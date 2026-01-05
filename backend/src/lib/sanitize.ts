import xss from "xss";

export function sanitize(value: string): string {
    if (typeof value !== 'string') return '';

    return xss(value).trim();
}
