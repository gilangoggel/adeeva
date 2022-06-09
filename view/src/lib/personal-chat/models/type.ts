import { chat } from './chat';
import { message } from './message';
import { subcriber } from './subcriber';
import {IModelType, Instance} from "mobx-state-tree";

type Helper<T extends IModelType<any, any>> = Instance<T['Type']>;

export type IChatModel = Helper<typeof chat>;
export type IMessageModel = Helper<typeof message>;
export type ISubriberModel = Helper<typeof subcriber>;
