import { InputAttributesInterface } from './image.model';

export interface AppStateInterface {
  isMenuVisible: boolean;
  inputAttributes: InputAttributesInterface;
  saveStatus: boolean;
}
