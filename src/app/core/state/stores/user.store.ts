import { Injectable, signal, computed } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserStore {
  private readonly _user = signal<User | null>(null);

  readonly user = computed(() => this._user());
  readonly isLoggedIn = computed(() => !!this._user());

  setUser(user: User) {
    this._user.set(user);
  }

  clearUser() {
    this._user.set(null);
  }
}

