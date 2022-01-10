import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FunctionNamesEnum, ImageInterface } from 'src/app/models/image.model';
import { AppFacade } from './../../app.facade';
import { GlfxFiltersService } from './../../services/glfx-filters.service';

@Component({
  selector: 'app-new-filter-input',
  templateUrl: './new-filter-input.component.html',
  styleUrls: ['./new-filter-input.component.scss'],
})
export class NewFilterInputComponent implements OnInit {
  @Input() image: ImageInterface = {
    url: null,
    selectedFile: new Blob(),
    reader: new FileReader(),
    canvas: undefined,
    texture: undefined,
    filename: '',
  };
  imageStore$: Observable<ImageInterface> = this.appFacade.imageStore$;
  inputAttributes$ = this.appFacade.inputAttributes$;
  @Input() functionNames = [FunctionNamesEnum.ink];

  constructor(
    private appFacade: AppFacade,
    private glfxFiltersService: GlfxFiltersService
  ) {}

  resuableFunction(event: any, functionName: FunctionNamesEnum) {
    this.appFacade.changeInputValue(event.target.value);
    this.glfxFiltersService.resuableFunction(
      event,
      this.image.canvas,
      this.image.texture,
      functionName
    );
  }

  ngOnInit(): void {}
}
