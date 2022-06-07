export function localDateToDate(date: any): Date | null {

    if (!date) {
        return null;
    }

    // yyyy-mm-dd
    
    const split = date.split('-');
    const year: number = split[0];
    const month: number = split[1] - 1;
    const day: number = split[2];
    
    return new Date(year, month, day);
}