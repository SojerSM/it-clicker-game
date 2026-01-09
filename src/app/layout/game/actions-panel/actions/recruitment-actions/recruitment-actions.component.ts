import { Component } from '@angular/core';
import { JobOfferButtonComponent } from '../../../../../domains/recruitment/components/job-offer-button/job-offer-button.component';

@Component({
  selector: 'app-recruitment-actions',
  imports: [JobOfferButtonComponent],
  templateUrl: './recruitment-actions.component.html',
  styleUrl: './recruitment-actions.component.scss',
})
export class RecruitmentActionsComponent {}
