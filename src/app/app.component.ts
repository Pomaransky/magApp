import { Component, Injectable } from '@angular/core';
// @ts-ignore
import * as fx from 'glfx-es6';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AppFacade } from './app.facade';
import {
  FunctionNamesEnum,
  ImageInterface,
  inputAttributesForFilters,
} from './models/image.model';
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  image: ImageInterface = {
    url: null,
    selectedFile: new Blob(),
    reader: new FileReader(),
    canvas: fx.canvas(),
    texture: undefined,
    filename: '',
  };
  functionName = FunctionNamesEnum.ink;
  filterNames = [
    {
      value: 'ink',
      name: 'Ink Filter',
    },
    {
      value: 'vibrance',
      name: 'Vibrance Filter',
    },
    {
      value: 'brightness',
      name: 'Brightness Filter',
    },
    {
      value: 'contrast',
      name: 'Contrast Filter',
    },
    {
      value: 'edgeWork',
      name: 'Edge Work Filter',
    },
  ];

  isImageVisible$ = new BehaviorSubject<boolean>(false);
  isMenuVisible$: Observable<boolean> = this.appFacade.isMenuVisible$;
  isChangesSaved$: Observable<boolean> = this.appFacade.saveStatus$;

  constructor(private appFacade: AppFacade) {}

  showMenu(): void {
    this.appFacade.showMenu();
  }

  hideMenu(): void {
    this.isMenuVisible$
      .pipe(
        take(1),
        tap((isMenuVisible) => {
          if (isMenuVisible) {
            this.appFacade.hideMenu();
          }
        })
      )
      .subscribe();
  }

  changeSelected(event: any) {
    this.functionName = event.value;
    if (this.functionName === FunctionNamesEnum.edgeWork) {
      this.image.canvas.draw(this.image.texture).edgeWork(5).update();
      this.appFacade.changeSaveStatus(false);
    } else {
      this.image.canvas.draw(this.image.texture).update();
      this.appFacade.changeSaveStatus(true);
    }
    this.appFacade.changeInputAttributes(
      inputAttributesForFilters[this.functionName]
    );
  }

  selectImage(event: any) {
    if (this.image.canvas) {
      this.removeImage();
    }
    console.log(event.files[0]);
    this.image.selectedFile = event.files[0];
    this.image.filename = event.files[0].name;
    this.image.reader.readAsDataURL(this.image.selectedFile);
    this.image.reader.onload = (_event) => {
      this.image.url = this.image.reader.result;
    };
    setTimeout(() => {
      this.appFacade.hideMenu();
    }, 500);
  }

  editSelectedImage() {
    if (this.image.selectedFile) {
      let image = document.getElementById('image');
      this.image.texture = this.image.canvas.texture(image);
      this.image.canvas.draw(this.image.texture).update();
      if (image?.parentNode) {
        this.image.canvas.classList.add('mx-auto');
        this.image.canvas.classList.add('max-w-full');
        this.image.canvas.setAttribute('id', 'canvasImage');
        this.isImageVisible$.next(true);
        image.parentNode.insertBefore(this.image.canvas, image);
      }
    }
  }

  downloadImage() {
    this.image.canvas.update();
    let link = document.createElement('a');
    let dotIndex = this.image.filename.indexOf('.');
    this.image.filename = this.image.filename.slice(0, dotIndex);
    link.download = `${this.image.filename}-editedByMagApp.png`;
    link.href = this.image.canvas.toDataURL();
    link.click();
    this.removeImage();
  }

  removeImage() {
    this.image.canvas.remove();
    this.isImageVisible$.next(false);
    this.image.url = null;
  }

  saveChanges() {
    this.image.canvas.update();
    this.image.texture = this.image.canvas.texture(
      document.getElementById('canvasImage')
    );
    this.appFacade.changeSaveStatus(true);
  }

  discardChanges() {
    this.image.canvas.update();
    let image = document.getElementById('image');
    this.image.texture = this.image.canvas.texture(image);
    this.image.canvas.draw(this.image.texture).update();
    this.appFacade.changeInputValue('0');
    this.appFacade.changeSaveStatus(true);
  }
}
