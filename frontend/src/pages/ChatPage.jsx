import React from "react";
import { useMessageStore } from "../store/useMessageStore";
import {
  ProfileHeader,
  ActiveTabSwitch,
  ContactList,
  ChatList,
  ChatContainer,
  NoConverstationPlaceHolder,
} from "../components/index.js";

const ChatPage = () => {
  const { activeTab, selectedUser } = useMessageStore();
  return (
    <div className="w-full relative max-w-6xl h-[700px] flex">
      {/* left side */}
      <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col">
        <ProfileHeader />
        <ActiveTabSwitch />

        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {activeTab === "chats" ? <ChatList /> : <ContactList />}
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex flex-col bg-slate-900/50 backdrop-blur-sm">
        {selectedUser ? <ChatContainer /> : <NoConverstationPlaceHolder />}
      </div>
    </div>
  );
};

export default ChatPage;
