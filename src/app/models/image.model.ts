export interface ImageInterface {
  url: string | ArrayBuffer | null;
  selectedFile: Blob;
  reader: FileReader;
  canvas: any;
  texture: any;
  filename: string;
}

export enum FunctionNamesEnum {
  inkValueChange = 'inkValueChange',
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
