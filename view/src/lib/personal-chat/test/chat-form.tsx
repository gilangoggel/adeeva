import {useRef} from "react";
import { useChatProvider } from '../context'
import {observer} from "mobx-react";

export const ChatForm = observer( () => {
  const [{store}, { emitTyping, sentMessage }]  = useChatProvider();
  const inputRef = useRef<HTMLInputElement>();
  const onKeyup = () => {
    if (store.sender && ! store.sender.isTyping){
      emitTyping()
    }
  }
  const onSubmit = (e: any) => {
    e.preventDefault();
    const input = inputRef.current;
    if (input){
      sentMessage(input.value);
      input.value = "";
    }
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onKeyUp={onKeyup} type="text" ref={inputRef as any}/>
        <button type="submit">
          sent
        </button>
        <p>
          {}
        </p>
      </form>
    </div>
  );
});
