import { useState } from "react";

import { Formik, Form } from "formik";

import { chatSocket, handleDate } from "helpers";

import { DynamicFileUploaderInput, InputWithIcon } from "components";

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

  const chatList = [
    {
      type: "receiver",
      message:
        "انا خلصت الجدول انهارده اقدر اجدد امتي وعاوز اعرف اقدر اغير البرنامج ولا",
      created_at: new Date("10-05-2023"),
    },
    {
      type: "sender",
      message: "تقدر تجدد في وقت وتغير للبرنامج المناسب ليك ",
      created_at: new Date("10-06-2023"),
      seen_at: new Date("10-06-2023"),
    },
    {
      type: "receiver",
      message: "تمام شكرا ليك",
      created_at: new Date("10-07-2023"),
    },
  ];

  return (
    <div className="boxed chat-box chat-height d-flex flex-column">
      {/* header  */}
      <div className="d-flex align-items-center justify-content-between chat-box-header">
        {/* info  */}
        <div className="chat-box-header-info d-flex align-items-center gap-3">
          <img
            src="/assets/images/avatar.png"
            alt="avatar"
            className="img-fluid"
          />
          <span className="chat-box-header-info-name d-flex flex-column gap-1">
            mohamrf ashraf
            <span>نشط الأن</span>
          </span>
        </div>

        <button type="button" className="bg-transparent p-0 border-0">
          <i className="las la-ellipsis-h"></i>
        </button>
      </div>
      {/* body  */}
      <div className="chat-box-body flex-fill d-flex flex-column">
        {/* chat content  */}
        <div className="flex-fill chat-box-body-list">
          {chatList.map((item, index) => (
            <div
              key={index}
              className={`chat-box-body-list-item d-flex gap-2 ${item.type}`}
            >
              {item.type === "receiver" && (
                <img
                  src="/assets/images/avatar.png"
                  alt=""
                  className="img-fluid chat-box-body-list-item-avatar"
                />
              )}

              <div className="chat-box-body-list-item-info">
                <div className="d-flex align-items-center gap-2">
                  {item.type === "receiver" && (
                    <span className="chat-box-body-list-item-info-name">
                      mohamrf ashraf
                    </span>
                  )}
                  <span className="chat-box-body-list-item-info-date">
                    {handleDate(item.created_at)}
                  </span>
                </div>

                <div className="chat-box-body-list-item-info-message">
                  {item.message}
                </div>

                {item.type === "sender" && item.seen_at && (
                  <div className="chat-box-body-list-item-info-seen d-flex align-items-center gap-2">
                    <img
                      src="/assets/images/avatar.png"
                      alt=""
                      className="img-fluid chat-box-body-list-item-info-seen-img"
                    />
                    <span>شاهد 9:10 صباحا</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {/* form  */}
        <Formik initialValues={{ message: "", file: "" }} onSubmit={handleSubmit}>
          {() => (
            <Form>
              <div className="chat-box-body-form d-flex align-items-center gap-4">
                <div className="d-flex align-items-center flex-fill chat-box-body-form-input h-100">
                  <button
                    type="button"
                    className="chat-box-body-form-emoji bg-transparent border-0 p-0 h-100"
                  >
                    <i className="las la-smile"></i>
                  </button>
                  <InputWithIcon
                    type="text"
                    name="message"
                    placeholder="إكتب رسالتك ....."
                    id="message-text"
                    noBorder
                    containerStyle={{ marginBottom: 0, flex: 1 }}
                  />
                </div>

                <button
                  type="button"
                  className="chat-box-body-form-camera chat-box-body-form-btn border-0 p-0"
                >
                  <i className="las la-camera"></i>
                </button>

                <DynamicFileUploaderInput
                  item={{ name: "file", id: "chat-file-uploading" }}
                >
                  <UploadingBtn />
                </DynamicFileUploaderInput>

                <button
                  type="submit"
                  className="chat-box-body-form-btn chat-box-body-form-submit p-0 border-0"
                >
                  <i className="las la-paper-plane"></i>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

function UploadingBtn() {
  return (
    <div className="cursor-pointer chat-box-body-form-file chat-box-body-form-btn">
      <i className="las la-paperclip"></i>{" "}
    </div>
  );
}
