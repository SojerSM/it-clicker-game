import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TicketGeneratorService {
  generateAlias(projectName: string) {
    const words = projectName.split(' ').filter((word) => word.length >= 3);

    const alias = words
      .slice(0, 3)
      .map((w) => w[0].toUpperCase())
      .join('');

    return alias;
  }
}
