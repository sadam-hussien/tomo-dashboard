import { useState } from "react";

import { InputWithIcon } from "components";

import { chatSocket } from "helpers";

export default function ListOfChats({ ...props }) {
  // list of conversations
  const [listOfConversations, setListOfConversations] = useState([
    {
      avatar: "/assets/images/avatar.png",
      name: "mohamrf ashraf",
      message: "إن شاء الله يا محمد.",
    },
  ]);

  // request for get all conversations
  chatSocket.getAllConversations({
    id: props.user?.coach?.id,
  });

  // llistener
  chatSocket.listenOnGetAllConversations((data) =>
    setListOfConversations(data)
  );

  // create new conversation
  function createConversation(id) {
    chatSocket.createConversation({
      member_a_id: props.user?.coach?.id,
      member_b_id: id,
    });
  }

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
      <div
        onClick={() =>
          createConversation("94ad8091-2188-4daa-8b8d-25cf35c7aeb6")
        }
      >
        click test create conversation
      </div>
      {listOfConversations.map((item, index) => (
        <button
          key={index}
          type="button"
          className="bg-transparent border-0 p-0 d-flex align-items-center gap-2 chat-conversations-list-item"
        >
          <img
            src={item.avatar}
            alt=""
            className="img-fluid chat-conversations-list-item-img"
          />
          <div className="flex-fill chat-conversations-list-item-info text-end">
            <span className="chat-box-header-info-name d-flex flex-column gap-1">
              {item.name}
              <span>{item.message}</span>
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
