import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeFormat',
  standalone: true,
})
export class TimeFormatPipe implements PipeTransform {
  transform(ms: number | null | undefined): string {
    if (!ms) return '0m';

    const totalMinutes = Math.floor(ms / 60000);
    const totalHours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    if (totalHours < 1) {
      return `${totalMinutes}m`;
    }

    if (totalHours < 100) {
      return `${totalHours}h ${minutes}m`;
    }

    return `${totalHours}h`;
  }
}
