export type ChatSpace = {
  chatRooms: ChatRoom[];
  createdAt: Date;
  createdBy: Date;
  id: string;
  img: string | null; // defaulta
  updatedAt: Date;
  name: string;
};

export type ChatRoom = {
  chatSpaceId: string;
  createdAt: Date;
  id: string;
  name: string;
  updatedAt: Date;
  messages: Message[];
};

export type Message = {
  id: string;
  content: string;
  userId: number;
  createdAt: Date;
  updateAt: Date;
};

export type PersonalChatRoom = {
  chatRoomId: string;
  createdAt: Date;
  updatedAt: Date;
  id: string;
  personalSpaceId: string;
  user1: string;
  user2: string;
};

export type PersonalSpace = {
  id: string;
  userId: string;
  chatRooms: {
    PersonalRoom: PersonalChatRoom;
    chatSpaceId: string | null;
    createdAt: Date;
    updatedAt: Date;
    id: string;
    name: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
  img: string;
};
