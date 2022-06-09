import { Virtuoso,VirtuosoHandle } from 'react-virtuoso'
import {observer} from "mobx-react";
import {useChatProvider} from "@libs/personal-chat";
import { MessageBox } from './message-box'
import {useEffect, useRef} from "react";

const Content = (index: number, data: any) => {
  return (
    <div>
      <MessageBox store={data}/>
    </div>
  )
}

export const MessageContainer = observer( () => {
  const [ {store}] = useChatProvider()
  const messages = store.chatMessage;
  const ref = useRef<VirtuosoHandle>();

  useEffect(()=>{
    const v = ref.current;
    if (v){
      v.scrollToIndex(messages.length - 1)
    }
  })

  return (
    <div className='content' style={{flex:1, background:'rgba(0,0,0,0.08)'}}>
      <Virtuoso
        ref={ref as any}
        data={messages.slice()}
        totalCount={messages.length}
        itemContent={Content}
        followOutput='smooth'
      />
    </div>
  );
});
