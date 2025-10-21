import { Injectable, signal } from '@angular/core';
import { BASE_VALUES } from '../../core/config/base-values.config';

@Injectable({ providedIn: 'root' })
export class ImpactService {
  readonly pps = signal(BASE_VALUES.impact.pps);
  readonly mpi = signal(BASE_VALUES.impact.mpi);
}
