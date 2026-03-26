import { Component } from '@angular/core';
import { ClickableImpactDirective } from '../../../../../shared/directives/clickable-impact.directive';
import { ProgressBarComponent } from '../../../../../shared/components/progress-bar/progress-bar.component';
import { GameStateService } from '../../../../../core/services/game-state.service';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-messages-app-panel',
  imports: [ClickableImpactDirective, ProgressBarComponent],
  templateUrl: './messages-app-panel.component.html',
  styleUrl: './messages-app-panel.component.scss',
})
export class MessagesAppPanelComponent {
  constructor(private gameStateService: GameStateService, private emailService: EmailService) {}

  get floatingText(): string {
    return 'test';
  }

  get emailMaxSize(): number {
    return this.gameStateService.emailState().maxSize;
  }

  get remaining(): number {
    const unanswered = this.gameStateService.emailState().unanswered;

    return this.emailMaxSize - unanswered;
  }

  onEmailClick(): void {
    this.emailService.answerEmail();
    console.log('invoke');
  }
}
