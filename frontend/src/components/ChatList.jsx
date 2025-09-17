import React, { useEffect } from "react";
import { useMessageStore } from "../store/useMessageStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatFound from "./NoChatFound";

const ChatList = () => {
  const { getMyChatFriends, chats, isUsersLoading, setSelectedUser } =
    useMessageStore();

  useEffect(() => {
    getMyChatFriends();
  }, [getMyChatFriends]);

  if (isUsersLoading) return <UserLoadingSkeleton />;
  if (chats?.length === 0) return <NoChatFound />;

  console.log(chats);
  return (
    <>
      {chats?.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
          <div className="flex items-center gap-3">
            <div className={`avatar avatar-online`}>
              <div className="size-12 rounded-full">
                <img
                  src={chat.profilePic || `/avatar.png`}
                  alt={chat.fullName}
                />
              </div>
            </div>
            <h4 className="text-slate-200 font-medium truncate">
              {chat.fullName}
            </h4>
          </div>
        </div>
      ))}
    </>
  );
};

export default ChatList;
