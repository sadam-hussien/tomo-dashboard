import { Col, Row } from "react-bootstrap";

import { ChatBox, ListOfChats } from "../components";

import { useEffect, useState } from "react";

import { chatSocket } from "helpers";

import { useSelector } from "react-redux";

export default function Chat() {
  const { user } = useSelector((state) => state.auth);

  const [currentConversationData, setCurrentConversationData] = useState({});

  return (
    <section>
      <Row className="g-4">
        <Col lg={{ order: "first", span: 7 }} xs={{ order: "last" }}>
          <ChatBox
            user={user}
            currentConversationData={currentConversationData}
          />
        </Col>

        <Col lg={5}>
          <ListOfChats
            user={user}
            setCurrentConversationData={setCurrentConversationData}
          />
        </Col>
      </Row>
    </section>
  );
}
