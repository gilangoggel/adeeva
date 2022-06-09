import { useChatProvider } from '../context'
import {observer} from "mobx-react";
import { ChatBox } from './chat-box'

export const ChatBoxList = observer( () => {
  const [{messages}]  = useChatProvider();

  return (
    <div>
      {
        messages.map(item=>(
          <ChatBox message={item} key={item.id}/>
        ))
      }
    </div>
  );
});
