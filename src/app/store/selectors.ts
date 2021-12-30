import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppStateInterface } from '../models/app.model';

export const appFeatureSelector =
  createFeatureSelector<AppStateInterface>('app');

export const isMenuVisibleSelector = createSelector(
  appFeatureSelector,
  (appState: AppStateInterface) => {
    return appState.isMenuVisible;
  }
);
