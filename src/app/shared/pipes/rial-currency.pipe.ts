import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    standalone: true,
    name: 'rialCurrencyPipe',
})
export class RialCurrencyPipe implements PipeTransform {
    transform(value: number | string | null | undefined): string {
        // Check if the value is valid
        if (value !== null && value !== undefined) {
            const numericValue = typeof value === 'string' ? parseFloat(value) : value;

            // Ensure numericValue is a valid number
            if (!isNaN(numericValue)) {
                // Format the number with commas
                const formattedValue = this.addCommas(numericValue);
                // Append "ریال" to the formatted value
                return `${formattedValue} ریال`;
            }
        }
        // If value is null, undefined or invalid, return as-is (or handle as needed)
        return value?.toString() || ''; // Ensure it returns an empty string for null/undefined
    }

    private addCommas(num: number): string {
        // Convert the number to a string
        const numStr = num.toString();

        // Use a regular expression to add commas
        const pattern = /(\d)(?=(\d{3})+(?!\d))/g;

        // Replace matches with the number followed by a comma
        return numStr.replace(pattern, '$1,');
    }
}
