import { Type } from '@angular/core';

export interface ActionsPanelTab {
  id: number;
  title: string;
  component: Type<any>;
}
