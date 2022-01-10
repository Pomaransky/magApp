import { createAction, props } from '@ngrx/store';
import { ActionTypes } from '../actionTypes';
import { ImageInterface } from 'src/app/models/image.model';

export const updateImageAction = createAction(
  ActionTypes.UPDATE_IMAGE,
  props<{ image: ImageInterface }>()
);
