import { Component, inject, linkedSignal } from '@angular/core';
import { LayoutComponent } from './layout/layout/layout.component';
import { UserStore } from './core/state/stores/user.store';
import { LoginComponent } from './features/login/login.component';


@Component({
    selector: 'app-root',
    imports: [LayoutComponent,LoginComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent {
  private readonly userStore = inject(UserStore);
  isLoggedIn = linkedSignal(this.userStore.isLoggedIn);
}
