import React, { useRef, useState, useEffect } from 'react';
import { Input } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import './Chat.css'; 

export default function Chat({ socket }) {
  const bottomRef = useRef();
  const messageRef = useRef();
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageList((current) => [...current, data]);
    });

    return () => socket.off('receive_message');
  }, [socket, messageList]);

  const handleSubmit = () => {
    const message = messageRef.current.value;
    if (!message.trim()) return;

    socket.emit('message', message);
    clearInput();
    focusInput();
  };

  const clearInput = () => {
    messageRef.current.value = '';
  };

  const focusInput = () => {
    messageRef.current.focus();
  };

  const getEnterKey = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const scrollDown = () => {
    bottomRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="chat-container">
      <div className="chat-body">
        {messageList.map((message, index) => (
          <div
            className={`message-container ${
              message.authorId === socket.id && 'message-mine'
            }`}
            key={index}
          >
            <div className="message-author"><strong>{message.author}</strong></div>
            <div className="message-text">{message.text}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="chat-footer">
        <Input inputRef={messageRef} placeholder="Mensagem" onKeyDown={getEnterKey} fullWidth />
        <SendIcon sx={{ m: 1, cursor: 'pointer' }} onClick={handleSubmit} color="primary" />
      </div>
    </div>
  );
}
