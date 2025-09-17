import React from "react";
import { useMessageStore } from "../store/useMessageStore";

const ActiveTabSwitch = () => {
  const { activeTab, setActiveTab } = useMessageStore();

  return (
    <div className="flex justify-center w-full p-2">
      <div className="flex gap-5 bg-slate-900/20 rounded-lg p-1">
        <button
          onClick={() => setActiveTab("chats")}
          className={`px-10 py-2 rounded-md transition-colors duration-200 ${
            activeTab === "chats"
              ? "bg-cyan-600/20 text-white shadow-md"
              : "text-slate-400 hover:text-cyan-300"
          }`}
        >
          Chats
        </button>
        <button
          onClick={() => setActiveTab("contacts")}
          className={`px-10 py-2 rounded-md transition-colors duration-200 ${
            activeTab === "contacts"
              ? "bg-cyan-600/20 text-white shadow-md"
              : "text-slate-400 hover:text-cyan-300"
          }`}
        >
          Contacts
        </button>
      </div>
    </div>
  );
};

export default ActiveTabSwitch;
