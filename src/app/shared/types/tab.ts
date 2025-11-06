import { Type } from '@angular/core';

export interface Tab {
  id: number;
  title: string;
  component: Type<any>;
}
