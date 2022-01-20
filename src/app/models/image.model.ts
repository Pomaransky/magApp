export interface ImageInterface {
  url: string | ArrayBuffer | null;
  selectedFile: Blob;
  reader: FileReader;
  canvas: any;
  texture: any;
  filename: string;
}

export enum FunctionNamesEnum {
  ink = 'ink',
  vibrance = 'vibrance',
  brightness = 'brightness',
  contrast = 'contrast',
  edgeWork = 'edgeWork',
}

export interface FilterInputInterface {
  id: string;
  name: FunctionNamesEnum;
  min: string;
  max: string;
  step: string;
  value: string;
}

export interface InputAttributesInterface {
  inputMin: string;
  inputMax: string;
  inputValue: string;
  inputStep: string;
}

export interface FilterNameInterface {
  value: string;
  name: string;
}

export const inputAttributesForFilters = {
  ink: {
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
  brightness: {
    inputMin: '-1',
    inputMax: '1',
    inputValue: '0',
    inputStep: '0.01',
  },
  contrast: {
    inputMin: '-1',
    inputMax: '1',
    inputValue: '0',
    inputStep: '0.01',
  },
  edgeWork: {
    inputMin: '0',
    inputMax: '200',
    inputValue: '5',
    inputStep: '1',
  },
};

export const filterNames: FilterNameInterface[] = [
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
