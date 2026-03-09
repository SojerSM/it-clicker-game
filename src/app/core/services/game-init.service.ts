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
import { ProjectGeneratorService } from '../../domains/progress/projects/services/project-generator.service';

@Injectable({ providedIn: 'root' })
export class GameInitService {
  constructor(
    private heroBuilder: HeroBuilderService,
    private gameStateService: GameStateService,
    private gameSaveService: GameSaveService,
    private ticketQueueService: TicketQueueService,
    private gameLoopService: GameLoopService,
    private gameStateBuilder: GameStateBuilder,
    private projectGenerator: ProjectGeneratorService
  ) {}

  ngOnDestroy(): void {
    this.gameSaveService.stopAutoSave();
  }

  start(): void {
    const savedState = this.gameSaveService.load();

    if (savedState) {
      this.gameStateService.setState(savedState);
    } else {
      this.init();
    }
  }

  /**
   * Initializing game when no state is stored in browser memory
   */
  private init(): void {
    const draft = JSON.parse(
      localStorage.getItem(localStorageKeys.ceoDraft) ?? 'null'
    ) as HeroDraft | null;

    if (draft) {
      const ceo: Hero = this.heroBuilder.buildCEO(draft);
      localStorage.removeItem(localStorageKeys.ceoDraft);

      const state = this.gameStateBuilder.buildState();

      state.heroes.owned.push(ceo);
      state.heroes.occupiedAvatars.push(ceo.avatar);
      state.project.current = this.projectGenerator.generateProject();

      this.gameStateService.setState(state);
      this.gameSaveService.save(state);
    }

    this.manageTicketQueue();
    this.gameLoopService.start();
    this.gameSaveService.startAutoSave();

    console.log('Init done');
  }

  private manageTicketQueue(): void {
    this.ticketQueueService.start();
  }
}
