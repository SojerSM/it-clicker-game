import { Injectable } from '@angular/core';
import { HeroAttribute } from '../types/hero-attribute';

@Injectable({ providedIn: 'root' })
export class AttributeGridBuilderService {
  buildGridWithDimensions(attributes: HeroAttribute[], x: number, y: number): HeroAttribute[][] {
    const maxItems = x * y;

    const rows: HeroAttribute[][] = [];
    let currentRow: HeroAttribute[] = [];

    let count = 0;

    for (const attribute of attributes) {
      if (!attribute.isPurchased) {
        currentRow.push(attribute);
        count++;

        if (currentRow.length === x) {
          rows.push(currentRow);
          currentRow = [];
        }

        if (count >= maxItems) break;
      }
    }

    if (currentRow.length > 0) {
      rows.push(currentRow);
    }

    console.log(rows);

    return rows;
  }
}
