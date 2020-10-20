export function debounce<TArgs extends any[], TReturn>(callback: (...args: TArgs) => TReturn, ms: number) {
    let timeout: any;
    return (...args: TArgs) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => callback(...args), ms);
    };
}
