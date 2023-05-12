import { Col, Row } from "react-bootstrap";

import { ChatBox, ListOfChats } from "../components";

import { useEffect, useState } from "react";

import { chatSocket } from "helpers";

import { useSelector } from "react-redux";

export default function Chat() {
  const { user } = useSelector((state) => state.auth);

  // const [listOfConversations, setListOfConversations] = useState([]);

  // const [currentConversationData, setCurrentConversationData] = useState({});

  // listen create conversation
  // chatSocket.listenOnCreateConversation((data) =>
  //   setCurrentConversationData(data)
  // );

  // list of conversations
  // useEffect(() => {
  //   // request for get all conversations
  //   chatSocket.getAllConversations({
  //     id: user?.coach?.id,
  //   });

  //   // llistener
  //   chatSocket.listenOnGetAllConversations((data) =>
  //     setListOfConversations(data)
  //   );

  //   // listen create conversation
  //   chatSocket.listenOnCreateConversation((data) =>
  //     setCurrentConversationData(data)
  //   );
  // }, [user]);

  return (
    <section>
      <Row>
        <Col lg={7}>
          <ChatBox user={user} />
        </Col>

        <Col lg={5}>
          <ListOfChats user={user} />
        </Col>
      </Row>
    </section>
  );
}
