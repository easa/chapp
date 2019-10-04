import { ShChatModel} from '../shared/ShChat.model';

export class CathModel {
  public name: string;
  public room: string;
  // public messages: ShChatModel[];

  // constructor(name: string, messages: ShChatModel[]) {
  constructor(name: string, room: string) {

      this.name = name;
      this.room = room;
    // this.messages = messages;
  }
}
