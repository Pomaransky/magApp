import { Action, createReducer, on } from '@ngrx/store';
import { AppStateInterface } from '../models/app.model';
import { showMenuAction } from './actions/showMenu.action';
import { hideMenuAction } from './actions/hideMenu.action';
import { changeInputAttributesAction } from './actions/changeInputAttributes.action';
import { changeInputValueAction } from './actions/changeInputValue.action';
// @ts-ignore
import * as fx from 'glfx-es6';
import { updateImageAction } from './actions/updateImage.action';

const initialState: AppStateInterface = {
  isMenuVisible: false,
  inputAttributes: {
    inputMin: '0',
    inputMax: '1',
    inputValue: '0',
    inputStep: '0.01',
  },
  image: {
    url: null,
    selectedFile: new Blob(),
    reader: new FileReader(),
    canvas: fx.canvas(),
    texture: null,
    filename: '',
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
  })),
  on(updateImageAction, (state, action) => ({
    ...state,
    image: action.image,
  }))
);

export function reducers(
  state: AppStateInterface,
  action: Action
): AppStateInterface {
  return appReducer(state, action);
}
