import { Injectable, signal } from '@angular/core';
import { BASE_VALUES } from '../../core/config/base-values.config';

@Injectable({ providedIn: 'root' })
export class ImpactService {
  private pps = signal(BASE_VALUES.impact.pps);
  private mpi = signal(BASE_VALUES.impact.mpi);

  getPps() {
    return this.pps.asReadonly();
  }

  getMpi() {
    return this.mpi.asReadonly();
  }
}
