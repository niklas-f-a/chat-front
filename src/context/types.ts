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
