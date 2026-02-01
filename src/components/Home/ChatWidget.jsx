import React, { useState } from "react";
import ChatCircleDots from "../../assets/ChatCircleDots.png";
import send from "../../assets/send-one.png";

function ChatWidget() {
  const [showMessage, setShowMessage] = useState(false);
  const [input, setInput] = useState("");

  return (
    <div className="fixed bottom-16 right-6 z-50">
      <div className="relative">
        {/* Pop-up Chat Box */}
        {showMessage && (
          <div className="absolute bottom-full right-0 mb-4 w-80 bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-orange-500 h-2"></div>
            {/* Header */}
            <div className="bg-white-500 text-white px-4 py-3">
              <h3 className="text-lg font-semibold text-black">Maria Angela</h3>
              <p className="text-sm text-orange-500">Admin Support</p>
            </div>
            <hr className="border border-gray-300" />

            {/* Chat Body */}
            <div className="p-4 flex flex-col gap-3 max-h-64 overflow-y-auto text-sm mb-30">
              {/* Bot message */}
              <div className="bg-gray-100 p-2 rounded-lg w-max max-w-[80%]">
                Halo, Ada yang bisa kami bantu?
              </div>

              {/* User message */}
              <div className="bg-orange-100 p-2 rounded-lg w-max max-w-[80%] self-end">
                Saya kesulitan mencari kopi
              </div>
            </div>

            {/* Input area */}
            <div className="flex items-center border-gray-200 p-2">
              <input
                type="text"
                placeholder="Masukan Pesan Anda"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="grow px-3 py-2 text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
              <button
                onClick={() => {
                  alert("Pesan terkirim: " + input);
                  setInput("");
                  setShowMessage(false);
                }}
                className="ml-2 bg-orange-500 text-white p-2 rounded-xl hover:bg-orange-600 transition"
              >
                <img src={send} alt="send" className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Sticky Chat Button */}
        <button
          onClick={() => setShowMessage(!showMessage)}
          className="bg-orange-500 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition"
        >
          <img src={ChatCircleDots} alt="message" className="w-7 h-7" />
        </button>
      </div>
    </div>
  );
}

export default ChatWidget;
