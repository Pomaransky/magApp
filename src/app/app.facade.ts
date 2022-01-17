import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { InputAttributesInterface } from './models/image.model';
import { changeInputAttributesAction } from './store/actions/changeInputAttributes.action';
import { changeInputValueAction } from './store/actions/changeInputValue.action';
import { changeSaveStatusAction } from './store/actions/changeSaveStatus.action';
import { hideMenuAction } from './store/actions/hideMenu.action';
import { showMenuAction } from './store/actions/showMenu.action';
import {
  inputAttributesSelector,
  isMenuVisibleSelector,
  saveStatusSelector,
} from './store/selectors';

@Injectable()
export class AppFacade {
  isMenuVisible$: Observable<boolean> = this.store.pipe(
    select(isMenuVisibleSelector)
  );
  inputAttributes$: Observable<InputAttributesInterface> = this.store.pipe(
    select(inputAttributesSelector)
  );
  saveStatus$: Observable<boolean> = this.store.pipe(
    select(saveStatusSelector)
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

  changeInputValue(value: string): void {
    this.store.dispatch(changeInputValueAction({ value }));
  }

  changeSaveStatus(saveStatus: boolean) {
    this.store.dispatch(changeSaveStatusAction({ saveStatus }));
  }
}
