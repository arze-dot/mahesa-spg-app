export function debounce(fn: any, delay: number) {
    let timeoutId: any;
    return (...args: any) => {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn(...args), delay);
    };
}
