import { IMessageModel } from '../models/type'
import {observer} from "mobx-react";

export const ChatBox = observer( ({ message }: {message: IMessageModel}) => {
  return (
    <div>
      <p>
        {message.sender_name}
      </p>
      <p>
        {message.message}
      </p>
    </div>
  );
});
