import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlfxFiltersService {
  constructor() {}

  resuableFunction(
    event: any,
    canvas: any,
    texture: any,
    functionName: string
  ) {
    if (functionName === 'ink') {
      this.inkValueChange(event, canvas, texture);
    }
  }

  inkValueChange(event: any, canvas: any, texture: any) {
    canvas.draw(texture).ink(event.target.value).update();
  }
}
