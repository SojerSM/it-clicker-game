import { Injectable } from '@angular/core';
import { HeroBuilderService } from '../../domains/heroes/services/hero-builder.service';
import { HeroRole } from '../../domains/heroes/types/enums/hero-role.enum';
import { Hero } from '../../domains/heroes/types/hero.model';
import { ProjectService } from '../../domains/progress/projects/services/project.service';
import { TicketQueueService } from '../../domains/progress/tickets/services/ticket-queue.service';
import { GameLoopService } from './game-loop.service';
import { GameSaveService } from './game-save.service';
import { GameStateService } from './game-state.service';
import { localStorageKeys } from '../config/localStorage';
import { GameStateBuilder } from './game-state-builder.service';
import { HeroDraft } from '../../domains/heroes/types/hero-draft';

@Injectable({ providedIn: 'root' })
export class GameInitService {
  constructor(
    private heroBuilder: HeroBuilderService,
    private gameStateService: GameStateService,
    private gameSaveService: GameSaveService,
    private ticketQueueService: TicketQueueService,
    private projectService: ProjectService,
    private gameLoopService: GameLoopService,
    private gameStateBuilder: GameStateBuilder
  ) {}

  /**
   * Initializing game when no state is stored in browser memory
   */
  init(): void {
    const draft = JSON.parse(
      localStorage.getItem(localStorageKeys.ceoDraft) ?? 'null'
    ) as HeroDraft | null;

    if (draft) {
      const ceo: Hero = this.heroBuilder.buildCEO(draft);

      this.gameStateService.updateHeroes((state) => {
        state.owned.push(ceo);
      });

      localStorage.removeItem(localStorageKeys.ceoDraft);

      const state = this.gameStateBuilder.buildState();
      this.gameSaveService.save(state);

      this.gameStateService.updateHeroes((state) => {
        state.owned.push(ceo);
        state.occupiedAvatars.push(ceo.avatar);
      });
    }

    this.projectService.setFirstProject();
    this.manageState();
    this.manageTicketQueue();

    console.log('Init done');
    this.gameLoopService.start();
    this.gameSaveService.startAutoSave();
  }

  ngOnDestroy(): void {
    this.gameSaveService.stopAutoSave();
  }

  private manageState(): void {
    const loadedState = this.gameSaveService.load();

    if (loadedState) {
      this.gameStateService.setState(loadedState);
    }
  }

  private manageTicketQueue(): void {
    this.ticketQueueService.start();
  }
}
