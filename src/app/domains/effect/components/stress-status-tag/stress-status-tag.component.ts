import { Component, Input } from '@angular/core';
import { TagComponent } from '../../../../shared/components/tag/tag.component';
import { Hero } from '../../../heroes/types/hero.model';
import { StressStatus } from '../../types/enum/stress-status.enum';

@Component({
  selector: 'app-stress-status-tag',
  imports: [TagComponent],
  templateUrl: './stress-status-tag.component.html',
  styleUrl: './stress-status-tag.component.scss',
})
export class StressStatusTagComponent {
  @Input({ required: true }) hero!: Hero;

  private breakpoints: number[] = [0.2, 0.4, 0.6, 0.8];
  private statuses: StressStatus[] = [
    StressStatus.CHILL_MODE,
    StressStatus.RELAXED,
    StressStatus.NORMAL_FLOW,
    StressStatus.UNDER_PRESSURE,
    StressStatus.BURNOUT_RISK,
  ];

  private statusColors: Record<StressStatus, string> = {
    [StressStatus.CHILL_MODE]: '#28a745',
    [StressStatus.RELAXED]: '#8bc34a',
    [StressStatus.NORMAL_FLOW]: '#ffc107',
    [StressStatus.UNDER_PRESSURE]: '#ff9800',
    [StressStatus.BURNOUT_RISK]: '#f44336',
  };

  get stressStatus(): StressStatus {
    const value = this.hero.stressFactor;

    for (let i = 0; i < this.breakpoints.length; i++) {
      if (value <= this.breakpoints[i]) {
        return this.statuses[i];
      }
    }

    return this.statuses[this.statuses.length - 1];
  }

  get color(): string {
    return this.statusColors[this.stressStatus];
  }
}
