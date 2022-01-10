import { InputAttributesInterface } from './image.model';
import { ImageInterface } from 'src/app/models/image.model';

export interface AppStateInterface {
  isMenuVisible: boolean;
  inputAttributes: InputAttributesInterface;
  image: ImageInterface;
}
