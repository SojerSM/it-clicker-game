import { ResolveFn } from '@angular/router';
import { GameInitService } from '../../core/services/game-init.service';
import { inject } from '@angular/core';

export const gameResolver: ResolveFn<void> = () => {
  const gameInitService = inject(GameInitService);

  gameInitService.start();
};
