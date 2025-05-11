import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-home',
  imports: [ ],
  template: `<p>Home wokrs</p>`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {

}
