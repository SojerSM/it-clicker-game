import { Injectable } from '@angular/core';
import { Company } from '../types/company.model';

@Injectable({ providedIn: 'root' })
export class CompanyBuilderService {
  build(): Company {
    return {
      name: 'Your super company',
      level: 1,
      exp: 0,
      expToLvlUp: 5,
    };
  }
}
