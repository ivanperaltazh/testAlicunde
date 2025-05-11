import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
    selector: 'app-modal',
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ModalComponent {
  @Input() message: string = '';
  public show = false;

  constructor(private cdr: ChangeDetectorRef) {}

  openModal() {
    this.show = true;
    this.cdr.detectChanges();
  }

  closeModal() {
    this.show = false;
    this.cdr.detectChanges();
  }
}
