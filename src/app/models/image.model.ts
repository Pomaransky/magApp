export interface ImageInterface {
  url: string | ArrayBuffer | null;
  selectedFile: Blob;
  reader: FileReader;
  canvas: any;
  texture: any;
  filename: string;
}
