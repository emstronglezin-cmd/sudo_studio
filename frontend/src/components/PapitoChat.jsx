import React from 'react';

const handleSendMessage = (message) => {
  console.log(`Sending message: ${message}`);
  // Simulate AI response
  setTimeout(() => {
    console.log(`AI Response: This is a simulated response to: ${message}`);
  }, 1000);
};

const PapitoChat = () => {
  const [messages, setMessages] = React.useState([]);
  const [input, setInput] = React.useState('');

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'user', text: input }]);
      handleSendMessage(input);
      setInput('');
    }
  };

  return (
    <div className="bg-[#252526] text-[#d4d4d4] w-80 h-full border-l border-[#3c3c3c] flex flex-col">
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === 'user' ? 'text-right' : 'text-left'}>
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="p-2 border-t border-[#3c3c3c]">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="w-full p-2 bg-[#1e1e1e] text-[#d4d4d4] border border-[#3c3c3c]"
        />
        <button onClick={sendMessage} className="mt-2 bg-[#007acc] text-white px-4 py-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default PapitoChat;