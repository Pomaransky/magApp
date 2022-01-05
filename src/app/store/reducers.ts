import { Action, createReducer, on } from '@ngrx/store';
import { AppStateInterface } from '../models/app.model';
import { showMenuAction } from './actions/showMenu.action';
import { hideMenuAction } from './actions/hideMenu.action';
import { changeInputAttributesAction } from './actions/changeInputAttributes.action';
import { changeInputValueAction } from './actions/changeInputValue.action';

const initialState: AppStateInterface = {
  isMenuVisible: false,
  inputAttributes: {
    inputMin: '0',
    inputMax: '1',
    inputValue: '0',
    inputStep: '0.01',
  },
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
  ),
  on(changeInputAttributesAction, (state, action) => ({
    ...state,
    inputAttributes: action,
  })),
  on(changeInputValueAction, (state, action) => ({
    ...state,
    inputAttributes: {
      ...state.inputAttributes,
      inputValue: action.value,
    },
  }))
);

export function reducers(
  state: AppStateInterface,
  action: Action
): AppStateInterface {
  return appReducer(state, action);
}
