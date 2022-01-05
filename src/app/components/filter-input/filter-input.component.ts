import { AppFacade } from './../../app.facade';
import { Component, Input, OnInit } from '@angular/core';
import {
  FilterInputInterface,
  FunctionNamesEnum,
  ImageInterface,
} from 'src/app/models/image.model';
import { GlfxFiltersService } from './../../services/glfx-filters.service';

@Component({
  selector: 'app-filter-input',
  templateUrl: './filter-input.component.html',
  styleUrls: ['./filter-input.component.scss'],
})
export class FilterInputComponent implements OnInit {
  inputAttributes$ = this.appFacade.inputAttributes$;

  @Input() image: ImageInterface = {
    url: null,
    selectedFile: new Blob(),
    reader: new FileReader(),
    canvas: undefined,
    texture: undefined,
    filename: '',
  };

  @Input() functionName = FunctionNamesEnum.inkValueChange;

  filtersX = {
    inkValueChange: {
      inputMin: '0',
      inputMax: '1',
      inputValue: '0',
      inputStep: '0.01',
    },
    vibrance: {
      inputMin: '-1',
      inputMax: '1',
      inputValue: '0',
      inputStep: '0.01',
    },
  };

  constructor(
    private glfxFiltersService: GlfxFiltersService,
    private appFacade: AppFacade
  ) {}

  ngOnInit(): void {
    this.appFacade.changeInputAttributes(this.filtersX[this.functionName]);
  }
  resuableFunction(event: any) {
    this.glfxFiltersService.resuableFunction(
      event,
      this.image.canvas,
      this.image.texture,
      this.functionName
    );
  }
}
