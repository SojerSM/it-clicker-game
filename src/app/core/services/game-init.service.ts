import { Injectable } from '@angular/core';
import { HeroBuilderService } from '../../domains/heroes/services/hero-builder.service';
import { HeroRole } from '../../domains/heroes/types/enums/hero-role.enum';
import { GameStateService } from './game-state.service';
import { GameSaveService } from './game-save.service';
import { TicketQueueService } from '../../domains/progress/tickets/services/ticket-queue.service';
import { ProjectService } from '../../domains/progress/projects/services/project.service';

@Injectable({ providedIn: 'root' })
export class GameInitService {
  constructor(
    private heroBuilder: HeroBuilderService,
    private gameStateService: GameStateService,
    private gameSaveService: GameSaveService,
    private ticketQueueService: TicketQueueService,
    private projectService: ProjectService
  ) {}

  init(): void {
    const ceo = this.heroBuilder.build(HeroRole.CEO);

    this.gameStateService.updateHeroes((state) => {
      state.owned.push(ceo);
    });

    this.projectService.setFirstProject();
    this.manageState();
    this.manageTicketQueue();
  }

  ngOnDestroy(): void {
    this.gameSaveService.stopAutoSave();
  }

  private manageState(): void {
    const loadedState = this.gameSaveService.load();

    if (loadedState) {
      this.gameStateService.setState(loadedState);
    }

    this.gameSaveService.startAutoSave();
  }

  private manageTicketQueue(): void {
    this.ticketQueueService.start();
  }
}
