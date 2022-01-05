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
};
