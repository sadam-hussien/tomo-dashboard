import { useEffect, useState } from "react";

import { Formik, Form } from "formik";

import { chatSocket, handleDate } from "helpers";

import { DynamicFileUploaderInput, InputWithIcon } from "components";

import EmojiPicker from "emoji-picker-react";
import { usePost } from "hooks";
import { apiUploadImage } from "server";
import { Spinner } from "react-bootstrap";

export default function ChatBox({ ...props }) {
  const [emojiIsShow, setEmojiIsShow] = useState(false);

  const { currentConversationData } = props;

  const [chatList, setChatList] = useState([]);

  // upload img
  const { mutate: mutateImageUploading, isLoading: isLoadingImageUploading } =
    usePost({
      queryFn: apiUploadImage,
    });

  useEffect(() => {
    // listen create conversation
    chatSocket.listenOnGetAllChatsInConversation((data) => {
      setChatList(data);
    });
  }, []);

  // handle submit
  function handleSubmit(values, actions) {
    if (currentConversationData?._id) {
      chatSocket.sendMessage({
        conversationId: currentConversationData?._id,
        message: values.message,
        file: values.file || "",
        type: "text",
        receiverId:
          props.user?.coach?.id === currentConversationData?.member_a_id
            ? currentConversationData?.member_b_id
            : currentConversationData?.member_a_id,
        senderId: props.user?.coach?.id,
      });
      actions.resetForm();
    }
  }

  if (!Object.keys(currentConversationData).length) {
    return (
      <div className="boxed chat-box chat-height d-flex flex-column">
        <img
          src="/assets/images/chat.jpg"
          alt=""
          className="img-fluid chat-empty-img"
        />
      </div>
    );
  }

  return (
    <div className="boxed chat-box chat-height d-flex flex-column">
      {/* header  */}
      <div className="d-flex align-items-center justify-content-between chat-box-header">
        {/* info  */}
        <div className="chat-box-header-info d-flex align-items-center gap-3">
          <img
            src={
              currentConversationData?.member_b_id?.avatar ||
              "/assets/images/user-placeholder.png"
            }
            alt="avatar"
            className="img-fluid d-none d-md-block"
          />
          <span className="chat-box-header-info-name d-flex flex-column gap-1">
            {currentConversationData?.member_b_id?.name}
            <span>
              {currentConversationData?.member_b_in_conversation
                ? "نشط الان"
                : "غير نشط"}
            </span>
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
              className={`chat-box-body-list-item d-flex gap-2 ${
                item.sender === props.user?.coach?.id ? "sender" : "receiver"
              }`}
            >
              {item.sender !== props.user?.coach?.id && (
                <img
                  src={
                    currentConversationData?.member_b_id?.avatar ||
                    "/assets/images/user-placeholder.png"
                  }
                  alt=""
                  className="img-fluid chat-box-body-list-item-avatar d-none d-md-block"
                />
              )}

              <div className="chat-box-body-list-item-info">
                <div className="d-flex align-items-center gap-2">
                  {item.sender !== props.user?.coach?.id && (
                    <span className="chat-box-body-list-item-info-name">
                      {currentConversationData?.member_b_id?.name}
                    </span>
                  )}
                  <span className="chat-box-body-list-item-info-date">
                    {handleDate(item.updatedAt)}
                  </span>
                </div>

                {/* handle message  */}
                <div className="chat-box-body-list-item-info-message">
                  {item.file && (
                    <img src={item.file} alt="" className="img-fluid" />
                  )}

                  {item.message && <span>{item.message}</span>}
                </div>

                {item.sender === props.user?.coach?.id &&
                  item.receiver_is_seen && (
                    <i className="las la-check-double"></i>
                    // <div className="chat-box-body-list-item-info-seen d-flex align-items-center gap-2">
                    //   <img
                    //     src="/assets/images/avatar.png"
                    //     alt=""
                    //     className="img-fluid chat-box-body-list-item-info-seen-img"
                    //   />
                    //   <span>شاهد 9:10 صباحا</span>
                    // </div>
                  )}
              </div>
            </div>
          ))}
        </div>
        {/* form  */}
        <Formik
          initialValues={{ message: "", file: "" }}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <div className="chat-box-body-form d-flex align-items-center gap-4 position-relative">
                <div className="d-flex align-items-center flex-fill chat-box-body-form-input h-100 position-relative">
                  <div className={`emoji-box ${emojiIsShow ? "active" : ""}`}>
                    <EmojiPicker
                      onEmojiClick={(e) => {
                        setFieldValue("message", values.message + e.emoji);
                        setEmojiIsShow((prev) => !prev);
                      }}
                    />
                  </div>
                  <button
                    type="button"
                    className="chat-box-body-form-emoji bg-transparent border-0 p-0 h-100"
                    onClick={() => setEmojiIsShow((prev) => !prev)}
                  >
                    <i className="las la-smile"></i>
                  </button>
                  <InputWithIcon
                    type="text"
                    name="message"
                    placeholder="إكتب رسالتك ....."
                    id="message-text"
                    autoComplete={"off"}
                    noBorder
                    containerStyle={{ marginBottom: 0, flex: 1 }}
                  />
                </div>

                <button
                  type="button"
                  className="chat-box-body-form-camera chat-box-body-form-btn border-0 p-0 d-none d-md-block"
                >
                  <i className="las la-camera"></i>
                </button>
                <div className="d-none d-lg-block">
                  <DynamicFileUploaderInput
                    item={{ name: "file", id: "chat-file-uploading" }}
                    serverCallback={mutateImageUploading}
                  >
                    <UploadingBtn
                      name="file"
                      isLoading={isLoadingImageUploading}
                    />
                  </DynamicFileUploaderInput>
                </div>

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

function UploadingBtn({ files, deleteFile, isLoading }) {
  return (
    <>
      <div className="cursor-pointer chat-box-body-form-file chat-box-body-form-btn">
        <i className="las la-paperclip"></i>
      </div>
      {isLoading || files ? (
        <div className="position-absolute chat-uploading-img">
          <div className="position-relative">
            <img
              src={
                files
                  ? typeof files === "string"
                    ? files
                    : window.URL.createObjectURL(files)
                  : "/assets/images/placholder.png"
              }
              alt="placholder"
              className="img-fluid subscription-upload-img-img"
            />
            {isLoading && (
              <>
                <div className="position-absolute overlay-when-uploading-image d-flex align-items-center justify-content-center">
                  <Spinner
                    as="span"
                    animation="border"
                    size="md"
                    role="status"
                    aria-hidden="true"
                  />
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
