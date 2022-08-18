export default function Debounced(func: any, delay: number) {
    let debounceTimer: string | number | NodeJS.Timeout | undefined
    return function (this: any) {
        const context = this
        const args = arguments
        clearTimeout(debounceTimer)
        debounceTimer = setTimeout(() => func.apply(context, args), delay)
    }
} 