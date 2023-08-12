import { useEffect, useState } from "react";

import { InputWithIcon } from "components";

import { chatSocket, handleDate } from "helpers";
import { useSearchParams } from "react-router-dom";

export default function ListOfChats({ ...props }) {
  const [searchParams] = useSearchParams();

  const userSearchParam = searchParams.get("user");

  // list of conversations
  const [listOfConversations, setListOfConversations] = useState([]);

  useEffect(() => {
    // request for get all conversations
    chatSocket.getAllConversations({
      id: props.user?.coach?.id,
    });

    // llistener
    chatSocket.listenOnGetAllConversations((data) => {
      console.log("ddd", data);
      if (data) {
        setListOfConversations(data);
      }
    });

    // listen on updated conversations
    chatSocket.listenOnNewUpdatedConversation({
      id: props.user?.coach?.id,
    });

    // listen on listenOnCreateConversation
    chatSocket.listenOnCreateConversation((data) => {
      props.setCurrentConversationData(data);
      chatSocket.getAllChatsInConversation({
        conversationId: data._id,
      });
    });
  }, []);

  // create new conversation
  function createConversation(id) {
    chatSocket.createConversation({
      member_a_id: props.user?.coach?.id,
      member_b_id: id,
    });
  }

  // if there is query parameter
  useEffect(() => {
    if (userSearchParam) {
      createConversation(userSearchParam);
    }
  }, []);

  return (
    <div className="boxed chat-conversations-list">
      <InputWithIcon
        basic={{ onChange: (value) => console.log(value) }}
        name="chat-search"
        type="search"
        id="chat-search"
        icon="las la-search"
        placeholder="إبحث عن رسالة"
        noBorder
        containerStyle={{
          backgroundColor: "#F0F0F0",
          flexDirection: "row-reverse",
        }}
      />
      {listOfConversations.map((item, index) => (
        <button
          key={index}
          type="button"
          className="bg-transparent border-0 p-0 d-flex justify-content-between flex-wrap gap-2 chat-conversations-list-item w-100"
          onClick={() => {
            props.setCurrentConversationData(item);
            chatSocket.getAllChatsInConversation({
              conversationId: item._id,
            });
          }}
        >
          <div className="d-flex align-items-center gap-2">
            <img
              src={
                item?.member_b_id?.avatar ||
                "/assets/images/user-placeholder.png"
              }
              alt=""
              className="img-fluid chat-conversations-list-item-img"
            />
            <div className="flex-fill chat-conversations-list-item-info text-end">
              <span className="chat-box-header-info-name d-flex flex-column gap-1">
                {props.user?.coach?.id === item?.member_b_id?.id
                  ? item?.member_a_id?.name
                  : item?.member_b_id?.name}
                <span>{item?.chats[0]?.message}</span>
              </span>
            </div>
          </div>

          <span className="me-auto">{handleDate(item.updatedAt)}</span>
        </button>
      ))}
    </div>
  );
}
