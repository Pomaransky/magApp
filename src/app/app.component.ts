import { GlfxFiltersService } from './services/glfx-filters.service';
import { Component, EventEmitter, Injectable, Output } from '@angular/core';
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
    texture: null,
    filename: '',
  };
  imageStore$: Observable<ImageInterface> = this.appFacade.imageStore$;
  functionNames = [FunctionNamesEnum.ink, FunctionNamesEnum.vibrance];
  filterNames = [
    {
      value: 'ink',
      name: 'Ink Filter',
    },
    {
      value: 'vibrance',
      name: 'Vibrance Filter',
    },
  ];

  isImageVisible$ = new BehaviorSubject<boolean>(false);

  isMenuVisible$: Observable<boolean> = this.appFacade.isMenuVisible$;

  constructor(private appFacade: AppFacade) {}

  showMenu(): void {
    this.appFacade.showMenu();
  }

  hideMenu(): void {
    // in this case is smth wrong with p-sidebar component from primeng which is calls 2 times hide menu action
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
    this.image.canvas.draw(this.image.texture).update();
    this.functionNames = [event.value];
    this.functionNames.forEach((functionName) => {
      this.appFacade.changeInputAttributes(
        inputAttributesForFilters[functionName]
      );
    });
  }

  selectImage(event: any) {
    if (this.image.canvas) {
      this.removeImage();
    }
    this.image.selectedFile = event.files[0];
    this.image.filename = event.files[0].name;
    this.image.reader.readAsDataURL(this.image.selectedFile);
    this.image.reader.onload = (_event) => {
      this.image.url = this.image.reader.result;
    };
    setTimeout(() => {
      this.appFacade.updateImage({
        url: this.image.url,
        selectedFile: this.image.selectedFile,
        reader: this.image.reader,
        canvas: fx.canvas(),
        texture: this.image.texture,
        filename: this.image.filename,
      });
      this.appFacade.hideMenu();
    }, 500);
  }

  editSelectedImage() {
    if (this.image.selectedFile) {
      let image = document.getElementById('image');
      this.image.texture = this.image.canvas.texture(image);
      this.image.canvas.draw(this.image.texture).update(); //before update use filters
      if (image?.parentNode) {
        this.image.canvas.classList.add('mx-auto');
        this.image.canvas.classList.add('max-w-full');
        this.isImageVisible$.next(true);
        image.parentNode.insertBefore(this.image.canvas, image);
        this.appFacade.updateImage(this.image);
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
    // this.appFacade.updateImage(this.image);
  }

  removeImage() {
    this.image.canvas.remove();
    this.isImageVisible$.next(false);
    this.image.url = null;
    // this.appFacade.updateImage(this.image);
  }
}
