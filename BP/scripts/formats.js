export function formatCurrency(value) {
    return (value / 100).toFixed(2); // np. 126 → "1.26"
}