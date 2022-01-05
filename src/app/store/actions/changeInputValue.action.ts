import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const changeInputValueAction = createAction(
  ActionTypes.CHANGE_INPUT_VALUE,
  props<{ value: string }>()
);
