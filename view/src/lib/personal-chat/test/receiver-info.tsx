import { useChatProvider } from '../context'
import {observer} from "mobx-react";

export const ReceiverInfo = observer( () => {
  const [{store}]  = useChatProvider();
  return (
    <div>
      <p>
        name : {store.receiver ? store.receiver.name : ""}
      </p>
      <p>
        online : {store.receiver ? store.receiver.online?'online':'false' : "-"}
      </p>
      <p>
        online : {store.receiver ? store.receiver.isTyping?'is-typing':'not-typing' : "-"}
      </p>
    </div>
  );
});
