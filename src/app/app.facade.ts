import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { hideMenuAction } from './store/actions/hideMenu.action';
import { showMenuAction } from './store/actions/showMenu.action';
import { isMenuVisibleSelector } from './store/selectors';

@Injectable()
export class AppFacade {
  isMenuVisible$: Observable<boolean> = this.store.pipe(
    select(isMenuVisibleSelector)
  );

  constructor(private store: Store) {}

  showMenu(): void {
    this.store.dispatch(showMenuAction());
  }

  hideMenu(): void {
    this.store.dispatch(hideMenuAction());
  }
}
