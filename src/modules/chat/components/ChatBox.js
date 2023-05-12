import { useState } from "react";

import { Formik, Form, Field } from "formik";

import { chatSocket } from "helpers";

export default function ChatBox({ ...props }) {
  // chat data
  const [currentConversationData, setCurrentConversationData] = useState({});

  // listen create conversation
  chatSocket.listenOnCreateConversation((data) =>
    setCurrentConversationData(data)
  );

  // handle submit
  function handleSubmit(values) {
    if (currentConversationData?._id) {
      chatSocket.sendMessage({
        conversationId: currentConversationData?._id,
        message: values.message,
        type: "text",
        receiver: "",
        sender: props.user?.coach?.id,
      });
    }
  }

  return (
    <div className="boxed">
      <div className="d-flex align-items-center"></div>
      <Formik
        initialValues={{
          message: "",
          file: "",
        }}
        onSubmit={handleSubmit}
      >
        {() => (
          <Form>
            <Field type="text" name="message" />
            <button type="submit">submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
