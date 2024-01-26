import type { Ref } from 'vue';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { EventEnum } from 'proto';

export type SubEvent = {
  memberId: number;
};

export type StoredMsgsState = {
  [key: string]: MsgState[]
}

export type MsgState = {
  content: string;
  timestamp: number;
  senderName: string;
  isMine: boolean;
}

export type SendMsgParam = {
  content: string;
  roomId: number;
  name?: string;
};

export type ChatContext = {
  roomList: Ref<IRoomItem[]>;
  selectedRoomId: Ref<number>;
  storedMsgs: Ref<StoredMsgsState>;
  wsEventData: Ref<WsEventData | null>;
  setRoomList: (newRoomList: IRoomItem[]) => void;
  setSelectedRoomId: (newSelectedRoomId: number) => void;
  sendWsEvent: (event: EventEnum, data: any, entityName: string) => void;
};

export type WsEventData = {
  event: string;
  data: WsSearchEventData|WsAddRoomEventData|null;
};

export type WsAddRoomEventData = {
  success: boolean;
  rooms: any
}

export type WsSearchEventData = {
  email: string;
  name: string;
}[]

export interface IRoomItem {
  getRoomname(): string;
  getRoomid(): number;
}
