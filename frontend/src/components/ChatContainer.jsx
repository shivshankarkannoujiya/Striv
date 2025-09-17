import React, { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceHolder from "./NoChatHistoryPlaceHolder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

const ChatContainer = () => {
  const { getMessageByUserId, messages, isMessagesLoading, selectedUser } =
    useMessageStore();

  const { authUser } = useAuthStore();

  useEffect(() => {
    getMessageByUserId(selectedUser._id);
  }, [selectedUser, getMessageByUserId]);

  return (
    <>
      <ChatHeader />
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {console.log("MSG", messages)}
        {messages?.length > 0 && !isMessagesLoading ? (
          <div className="max-w-3xl mx-auto space-y-6">
            {messages?.map((message) => (
              <div
                key={message._id}
                className={`chat ${
                  message.senderId === authUser._id ? `chat-end` : `chat-start`
                }`}
              >
                <div
                  className={`chat-bubble relative ${
                    message.senderId === authUser._id
                      ? `bg-cyan-600 text-white`
                      : `bg-slate-800 text-white`
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Shared"
                      className="rounded-lg h-48 object-cover"
                    />
                  )}
                  {message.text && <p className="mt-2">{message.text}</p>}
                  <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    {new Date(message.createdAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : isMessagesLoading ? (
            <MessagesLoadingSkeleton/>
        ) : (
          <NoChatHistoryPlaceHolder name={selectedUser.fullName} />
        )}
      </div>

      <MessageInput/>
    </>
  );
};

export default ChatContainer;
