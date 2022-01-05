import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InputAttributesInterface } from './models/image.model';
import { changeInputAttributesAction } from './store/actions/changeInputAttributes.action';
import { hideMenuAction } from './store/actions/hideMenu.action';
import { showMenuAction } from './store/actions/showMenu.action';
import {
  inputAttributesSelector,
  isMenuVisibleSelector,
} from './store/selectors';

@Injectable()
export class AppFacade {
  isMenuVisible$: Observable<boolean> = this.store.pipe(
    select(isMenuVisibleSelector)
  );
  inputAttributes$: Observable<InputAttributesInterface> = this.store.pipe(
    select(inputAttributesSelector)
  );

  constructor(private store: Store) {}

  showMenu(): void {
    this.store.dispatch(showMenuAction());
  }

  hideMenu(): void {
    this.store.dispatch(hideMenuAction());
  }

  changeInputAttributes(inputAttributes: InputAttributesInterface): void {
    this.store.dispatch(changeInputAttributesAction(inputAttributes));
  }
}
