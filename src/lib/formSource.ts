/** Form gönderimlerinde kaynak sayfa bilgisini eklemek için yardımcı */
export function withFormSource<T extends Record<string, unknown>>(
    data: T,
    sourcePage: string,
    sourceLabel: string
): T & { sourcePage: string; sourceLabel: string } {
    return { ...data, sourcePage, sourceLabel };
}
