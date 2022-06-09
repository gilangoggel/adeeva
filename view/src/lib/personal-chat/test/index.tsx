import {usePage} from "@inertiajs/inertia-react";
import { LoginForm } from './login-form'
import { useChat } from '../use-chat'
import { Context, useChatProvider } from '../context'
import {observer} from "mobx-react";
import {useEffect} from "react";
import { Logout } from './logout'
import { ChatForm } from './chat-form'
import { ChatBoxList } from './chat-box-list'
import { ReceiverInfo } from './receiver-info'

const Wrapper = observer( () => {
  const { auth } = usePage().props
  const [_, {updateReceiver}]  = useChatProvider();
  useEffect(()=>{
    const receiverMap = {
      'ADMINISTRATOR': {id: 2, name: "User"},
      'USER': {id : 1, name: "Admin"},
    }
    if (auth){
      updateReceiver(receiverMap[auth.role as keyof typeof receiverMap])
    }
  },[auth])
  return (
    <div>
      <h1>
        {auth.name}
      </h1>
      <ReceiverInfo/>
      <Logout/>
      <ChatBoxList/>
      <ChatForm/>
    </div>
  )

})

const Tests = () => {
  const { auth } = usePage().props;
  const ctx = useChat()
  const [{ws}, {updateSender}] = ctx;
  useEffect(()=>{
    if (auth){
      updateSender(auth)
    }
  },[auth])
  if (! auth){
    return <LoginForm/>
  }
  return (
    <Context.Provider value={ctx}>
      <Wrapper/>
    </Context.Provider>
  );
};
export default Tests;
