import { createAction, props } from '@ngrx/store';
import { InputAttributesInterface } from 'src/app/models/image.model';
import { ActionTypes } from '../actionTypes';

export const changeInputAttributesAction = createAction(
  ActionTypes.CHANGE_INPUT_ATTRIBUTES,
  props<InputAttributesInterface>()
);
