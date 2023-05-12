import { chatSocket } from "helpers";
import { useState } from "react";

export default function ListOfChats({ ...props }) {
  // list of conversations
  const [listOfConversations, setListOfConversations] = useState([]);

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
    <div className="boxed">
      <div
        onClick={() =>
          createConversation("94ad8091-2188-4daa-8b8d-25cf35c7aeb6")
        }
      >
        click test create conversation
      </div>
      {listOfConversations.map((item) => (
        <>list</>
      ))}
    </div>
  );
}
