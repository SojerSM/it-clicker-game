import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { GameSaveService } from '../../core/services/game-save.service';
import { GameStateService } from '../../core/services/game-state.service';

export const gameResolver: ResolveFn<void> = (route, state) => {
  const gameSaveService = inject(GameSaveService);
  const gameStateService = inject(GameStateService);
  const router = inject(Router);

  const storagedState = gameSaveService.load();

  if (storagedState === null) {
    router.navigate(['/hero-creator']);
  } else {
    gameStateService.setState(storagedState);
    gameSaveService.startAutoSave();
  }
};
