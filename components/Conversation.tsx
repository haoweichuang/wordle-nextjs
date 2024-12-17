import React from "react";

function Conversation() {
  return (
    <div className="conversation-container flex flex-col w-full h-full max-w-full">
      <div className="conversation-head flex items-center justify-center  h-[20px]">
        Conversation
      </div>
      <div className="conversation-body flex-1 rounded-lg bg-gray-100 m-10"></div>
    </div>
  );
}

export default Conversation;
