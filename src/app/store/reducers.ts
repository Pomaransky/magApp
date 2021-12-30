import { Action, createReducer, on } from '@ngrx/store';
import { AppStateInterface } from '../models/app.model';
import { showMenuAction } from './actions/showMenu.action';
import { hideMenuAction } from './actions/hideMenu.action';

const initialState: AppStateInterface = {
  isMenuVisible: false,
};

const appReducer = createReducer(
  initialState,
  on(
    showMenuAction,
    (state): AppStateInterface => ({ ...state, isMenuVisible: true })
  ),
  on(
    hideMenuAction,
    (state): AppStateInterface => ({ ...state, isMenuVisible: false })
  )
);

export function reducers(
  state: AppStateInterface,
  action: Action
): AppStateInterface {
  return appReducer(state, action);
}
