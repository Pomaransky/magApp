import { Component, Injectable } from '@angular/core';
// @ts-ignore
import * as fx from 'glfx-es6';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { AppFacade } from './app.facade';
import {
  FilterNameInterface,
  filterNames,
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
    url: '',
    selectedFile: new Blob(),
    reader: new FileReader(),
    canvas: fx.canvas(),
    texture: undefined,
    filename: '',
  };
  functionName: FunctionNamesEnum = FunctionNamesEnum.ink;
  filterNames: FilterNameInterface[] = filterNames;

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
    this.image.selectedFile = event.files[0];
    this.image.filename = event.files[0].name;
    this.image.reader.readAsDataURL(this.image.selectedFile);
    this.image.reader.onload = (_event) => {
      if (this.image.reader.result) {
        this.image.url = this.image.reader.result.toString();
      }
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
    this.image.url = '';
  }

  saveChanges() {
    this.image.texture = this.image.canvas.texture(
      document.getElementById('canvasImage')
    );
    this.image.canvas.draw(this.image.texture).update();
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
  invert() {
    let canvas = <HTMLCanvasElement>document.getElementById('canvasImage');
    let gl = canvas.getContext('webgl');
    if (gl) {
      let image = <HTMLImageElement>document.getElementById('image');
      // gl.clearColor(1.0, 0.8, 0.1, 0.0);
      // gl.clear(gl.COLOR_BUFFER_BIT);

      const vertShaderSource = `
			attribute vec2 position;

			varying vec2 texCoords;
			
			void main(){
				texCoords = (position + 1.0) / 2.0;
				texCoords.y = 1.0 - texCoords.y;
				gl_Position = vec4(position, 0, 1.0);
			}
			`;
      const fragShaderSource = `
			precision highp float;

			varying vec2 texCoords;

			uniform sampler2D textureSampler;

			void main(){
				vec4 color = texture2D(textureSampler, texCoords);
				if((color.r-1.0) < 0.0){
					color.r = (color.r - 1.0) * (-1.0);
				} else {
					color.r = color.r - 1.0;
				}
				if((color.g-1.0) < 0.0){
					color.g = (color.g - 1.0) * (-1.0);
				} else {
					color.g = color.g - 1.0;
				}
				if((color.b-1.0) < 0.0){
					color.b = (color.b - 1.0) * (-1.0);
				} else {
					color.b = color.b - 1.0;
				}

				gl_FragColor = color;
			}
			`;
      const vertShader = gl.createShader(gl.VERTEX_SHADER);
      const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
      if (vertShader && fragShader) {
        gl.shaderSource(vertShader, vertShaderSource);
        gl.shaderSource(fragShader, fragShaderSource);
        gl.compileShader(vertShader);
        gl.compileShader(fragShader);

        const program: any = gl.createProgram();
        gl.attachShader(program, vertShader);
        gl.attachShader(program, fragShader);

        gl.linkProgram(program);

        gl.useProgram(program);
        const vertices = new Float32Array([
          -1, -1, -1, 1, 1, 1,

          -1, -1, 1, 1, 1, -1,
        ]);
        const vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, 'position');

        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(positionLocation);

        //TEXTURE
        const tex = gl.createTexture();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          image
        );
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        //save changes
        this.saveChanges();
      }
    }
  }
}
