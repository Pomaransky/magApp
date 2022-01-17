import { AppFacade } from './../../app.facade';
import { Component, Input } from '@angular/core';
import { FunctionNamesEnum, ImageInterface } from 'src/app/models/image.model';
import { GlfxFiltersService } from './../../services/glfx-filters.service';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
export class FilterInputComponent {
  inputAttributes$ = this.appFacade.inputAttributes$;

  @Input() image: ImageInterface = {
    url: null,
    selectedFile: new Blob(),
    reader: new FileReader(),
    canvas: undefined,
    texture: undefined,
    filename: '',
  };

  @Input() functionName = FunctionNamesEnum.ink;

  constructor(
    private glfxFiltersService: GlfxFiltersService,
    private appFacade: AppFacade
  ) {}

  resuableFunction(event: any) {
    this.appFacade.changeInputValue(event.target.value);
    this.glfxFiltersService.resuableFunction(
      event,
      this.image.canvas,
      this.image.texture,
      this.functionName
    );
    this.appFacade.changeSaveStatus(false);
  }
}
