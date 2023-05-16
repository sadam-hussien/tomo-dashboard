import socket from "socket";

export function getAllConversations({ ...args }) {
  socket.emit("conversationScroll", {
    id: args.id,
  });
}

export function listenOnGetAllConversations(callback) {
  socket.on("conversationOnScroll", (data) => {
    callback(data);
  });
}

export function createConversation({ ...args }) {
  socket.emit("conversation", {
    member_a_id: args.member_a_id,
    member_b_id: args.member_b_id,
    status: "public",
  });
}

export function listenOnCreateConversation(callback) {
  socket.on("newConversation", (data) => {
    callback(data);
  });
}

export function sendMessage({ ...args }) {
  socket.emit("chat", {
    conversation: args.conversationId,
    message: args.message,
    type: args.type,
    receiver: args.receiverId,
    sender: args.senderId,
  });
}

export function listenOnNewUpdatedConversation({ ...args }) {
  socket.on("newUpdatedConversation", (data) => {
    if (data.status) {
      getAllConversations({ id: args.id });
      getAllChatsInConversation({ conversationId: data.conversationId });
    }
  });
}

export function getAllChatsInConversation({ ...args }) {
  socket.emit("AllChatsInConversation", {
    id: args.conversationId,
  });
}

export function listenOnGetAllChatsInConversation(callback) {
  socket.on("allChatsBetweenUsersInConversation", (data) => {
    callback(data);
  });
}
