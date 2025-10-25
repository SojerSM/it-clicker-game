import { Injectable, signal } from '@angular/core';
import { BALANCE } from '../../core/config/balance/balance';

@Injectable({ providedIn: 'root' })
export class ImpactService {
  readonly pps = signal(BALANCE.IMPACT_PPS);
  readonly mpi = signal(BALANCE.IMPACT_MPI);
}
