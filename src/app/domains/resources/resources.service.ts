import { Injectable, signal } from '@angular/core';
import { BALANCE } from '../../core/config/balance/balance';

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  private money = signal(BALANCE.RESOURCE_MONEY);
  private exp = signal(BALANCE.RESOURCE_EXP);

  getMoney() {
    return this.money.asReadonly();
  }

  getExp() {
    return this.exp.asReadonly();
  }

  increaseMoney(value: number) {
    this.money.update((money) => money + value);
  }

  decreaseMoney(value: number) {
    const result = this.money() - value;
    this.money.set(result >= 0 ? result : 0);
  }

  increaseExp(value: number) {
    this.exp.update((exp) => exp + value);
  }

  decreaseExp(value: number) {
    const result = this.exp() - value;
    this.exp.set(result >= 0 ? result : 0);
  }
}
