import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'numberFormatPipe',
})
export class NumberFormatPipe implements PipeTransform {
  transform(value: number, decimals: number = 0): number {
    const factor = Math.pow(10, decimals);
    return Math.round(value * factor) / factor;
  }
}
