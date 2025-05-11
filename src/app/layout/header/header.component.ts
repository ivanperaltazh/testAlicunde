import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'app-header',
  imports: [NavbarComponent],
  template: `<app-navbar></app-navbar>`,
  styleUrl: './header.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent { }
