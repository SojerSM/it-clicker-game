import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  private money = signal(0);
  private exp = signal(0);

  getMoney() {
    return this.money.asReadonly();
  }

  getExp() {
    return this.exp.asReadonly();
  }
}
