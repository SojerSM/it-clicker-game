import { Component, Input } from '@angular/core';

/**
 * General tag element to display statuses etc.
 *
 * @param label as title inside tag
 * @param color as hexadecimal or string value if custom background is required
 *              (white by default)
 * @param textColor as hexadecimal or string value if custom text color is
 *                  required (black by default)
 */
@Component({
  selector: 'app-tag',
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss',
})
export class TagComponent {
  @Input({ required: true }) label!: string;
  @Input({ required: false }) color?: string;
  @Input({ required: false }) textColor?: string;
}
