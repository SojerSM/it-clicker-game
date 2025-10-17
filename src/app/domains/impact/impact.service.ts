import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ImpactService {
  private pps = signal(0);
  private mpi = signal(1);

  getPps() {
    return this.pps.asReadonly();
  }

  getMpi() {
    return this.mpi.asReadonly();
  }
}
