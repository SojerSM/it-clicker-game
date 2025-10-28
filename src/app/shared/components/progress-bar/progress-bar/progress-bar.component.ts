import { Component, Input } from '@angular/core';
import { NumberFormat } from '../../../../core/pipes/number-format.pipe';

/**
 * Basic progress bar component
 *
 */
@Component({
  selector: 'app-progress-bar',
  imports: [NumberFormat],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss',
})
export class ProgressBarComponent {
  @Input({ required: true }) maxValue!: number;
  @Input({ required: false }) remaining?: number;
  @Input({ required: false }) displayPercentage: boolean = true;
  @Input({ required: false }) fill: string = '#4caf50';

  get percentage(): number {
    if (this.remaining) {
      return Math.ceil((this.remaining / this.maxValue) * 100);
    } else {
      return 100;
    }
  }
}
