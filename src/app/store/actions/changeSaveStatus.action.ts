import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';

export const changeSaveStatusAction = createAction(
  ActionTypes.CHANGE_SAVE_STATUS,
  props<{ saveStatus: boolean }>()
);
