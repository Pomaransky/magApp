import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ImageInterface, InputAttributesInterface } from './models/image.model';
import { changeInputAttributesAction } from './store/actions/changeInputAttributes.action';
import { changeInputValueAction } from './store/actions/changeInputValue.action';
import { hideMenuAction } from './store/actions/hideMenu.action';
import { showMenuAction } from './store/actions/showMenu.action';
import { updateImageAction } from './store/actions/updateImage.action';
import {
  imageSelector,
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
  imageStore$: Observable<ImageInterface> = this.store.pipe(
    select(imageSelector)
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

  updateImage(image: ImageInterface) {
    this.store.dispatch(updateImageAction({ image }));
  }
}
