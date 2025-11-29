import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { firstValueFrom } from 'rxjs';
import { EffectService } from '../../domains/effect/services/effect.service';
import { StressEffectService } from '../../domains/effect/services/stress-effect.service';
import { HeroBuilderService } from '../../domains/heroes/services/hero-builder.service';
import { HeroRole } from '../../domains/heroes/types/enums/hero-role.enum';
import { ProjectService } from '../../domains/progress/projects/services/project.service';
import { TicketQueueService } from '../../domains/progress/tickets/services/ticket-queue.service';
import { GameLoopService } from './game-loop.service';
import { GameSaveService } from './game-save.service';
import { GameStateService } from './game-state.service';

@Injectable({ providedIn: 'root' })
export class GameInitService {
  constructor(
    private heroBuilder: HeroBuilderService,
    private gameStateService: GameStateService,
    private gameSaveService: GameSaveService,
    private ticketQueueService: TicketQueueService,
    private projectService: ProjectService,
    private translateService: TranslateService,
    private gameLoopService: GameLoopService
  ) {}

  async init(): Promise<void> {
    return firstValueFrom(this.translateService.use('en')).then(() => {
      const ceo = this.heroBuilder.build(HeroRole.CEO);

      this.gameStateService.updateHeroes((state) => {
        state.owned.push(ceo);
      });

      this.projectService.setFirstProject();
      this.manageState();
      this.manageTicketQueue();

      console.log('Init done');
      this.gameLoopService.start();
    });
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
