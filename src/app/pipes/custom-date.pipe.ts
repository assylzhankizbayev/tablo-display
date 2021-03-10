import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  transform(value: Date, format?: string): string {
    if (value) {
      const dd = this.formatValue(value.getDate());
      const mm = this.formatValue(value.getMonth());
      const yy = value.getFullYear().toString().slice(-2);
      return dd + '.' + mm + '.' + yy;
    } else {
      return '';
    }
  }

  formatValue(value: number): string {
    return (value < 10 ? '0' : '') + value;
  }
}