import { Component, Input } from '@angular/core';
import { NumberFormat } from '../../../core/pipes/number-format.pipe';
/**
 * Basic progress bar component
 *
 * @param maxValue the maximum value representing 100% of the progress bar.
 * @param remaining (optional) the remaining amount to reach the target value.
 *        If not provided, the bar is calculated based only on `maxValue`.
 * @param descending (optional) determines the progress direction.
 *        - `true` → the bar decreases from 100% to 0% (e.g., countdown or depletion).
 *        - `false` → the bar increases from 0% to 100% (e.g., task completion).
 * @param displayPercentage (optional) whether to display the percentage value next to the bar.
 * @param fill (optional) the fill color of the bar, in HEX, RGB, or CSS color name format.
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
  @Input({ required: false }) descending: boolean = true;
  @Input({ required: false }) displayPercentage: boolean = true;
  @Input({ required: false }) fill: string = '#4caf50';

  get percentage(): number {
    if (this.remaining && this.descending === false) {
      return Math.ceil(((this.maxValue - this.remaining) / this.maxValue) * 100);
    } else if (this.remaining) {
      return Math.ceil((this.remaining / this.maxValue) * 100);
    } else {
      return 100;
    }
  }
}
