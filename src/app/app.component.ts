import { Component } from '@angular/core';
// @ts-ignore
import * as fx from 'glfx-es6';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url: any;
  selectedFile: Blob = new Blob();
  reader = new FileReader();
  canvas: any;

  selectImage(event: any) {
    this.selectedFile = event.files[0];
    this.reader.readAsDataURL(this.selectedFile);
    this.reader.onload = (_event) => {
      this.url = this.reader.result;
    };
  }
  editImage() {
    if (this.selectedFile) {
      this.canvas = fx.canvas();
      let image = document.getElementById('image');
      let texture = this.canvas.texture(image);
      this.canvas.draw(texture).ink(0.25).update();
      if (image?.parentNode) {
        image.parentNode.insertBefore(this.canvas, image);
        image.parentNode.removeChild(image);
      }
    }
  }
  downloadImage() {
    this.canvas.update();
    var link = document.createElement('a');
    link.download = 'filename.png';
    link.href = this.canvas.toDataURL();
    link.click();
  }
}
