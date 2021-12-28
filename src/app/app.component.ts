import { Component, Injectable } from '@angular/core';
// @ts-ignore
import * as fx from 'glfx-es6';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
@Injectable()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url: string | ArrayBuffer | null = null;
  selectedFile: Blob = new Blob();
  reader = new FileReader();
  canvas: any;
  texture: any;
  filename: string = '';
  isImageVisible$ = new BehaviorSubject<boolean>(false);

  selectImage(event: any) {
    if (this.canvas) {
      this.canvas.remove();
      this.isImageVisible$.next(false);
    }
    this.selectedFile = event.files[0];
    this.filename = event.files[0].name;
    this.reader.readAsDataURL(this.selectedFile);
    this.reader.onload = (_event) => {
      this.url = this.reader.result;
    };
  }

  editImage() {
    if (this.selectedFile) {
      this.canvas = fx.canvas();
      let image = document.getElementById('image');
      this.texture = this.canvas.texture(image);
      this.canvas.draw(this.texture).update(); //before update use filters
      if (image?.parentNode) {
        this.canvas.classList.add('mx-auto');
        this.isImageVisible$.next(true);
        image.parentNode.insertBefore(this.canvas, image);
      }
    }
  }

  downloadImage() {
    this.canvas.update();
    let link = document.createElement('a');
    let dotIndex = this.filename.indexOf('.');
    this.filename = this.filename.slice(0, dotIndex);
    link.download = `${this.filename}-editedByMagApp.png`;
    link.href = this.canvas.toDataURL();
    link.click();
  }
}
