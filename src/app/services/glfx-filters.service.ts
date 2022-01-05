import { Injectable } from '@angular/core';
import { FunctionNamesEnum } from '../models/image.model';

@Injectable({
  providedIn: 'root',
})
export class GlfxFiltersService {
  constructor() {}

  resuableFunction(
    event: any,
    canvas: any,
    texture: any,
    functionName: FunctionNamesEnum
  ) {
    this[functionName](event, canvas, texture);
  }

  ink(event: any, canvas: any, texture: any) {
    canvas.draw(texture).ink(event.target.value).update();
  }
  vibrance(event: any, canvas: any, texture: any) {
    canvas.draw(texture).vibrance(event.target.value).update();
  }
}
