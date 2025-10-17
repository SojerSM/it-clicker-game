import { Injectable, signal } from '@angular/core';
import { BASE_VALUES } from '../../core/config/base-values.config';

@Injectable({ providedIn: 'root' })
export class ResourcesService {
  private money = signal(BASE_VALUES.resources.money);
  private exp = signal(BASE_VALUES.resources.exp);

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
