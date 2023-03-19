import React, { useRef, useState } from "react";
import "./ChatComponent.css";
import Input from "../Input";
import Button from "../Button";
import Logo from "../Logo";
import { Link } from "react-router-dom";
import * as C from "../AddClinicFile/styles";

const ChatComponent = () => {
  const [body, setBody] = useState("");
  const [sender, setSender] = useState("");
  const [dateTime, setDateTime] = useState("");
  const [id, setId] = useState("");
  const messageStorage = JSON.parse(localStorage.getItem("message_db"));

  const [formValue, setFormValue] = useState("");

  const handleForm = () => {
    if (!body) {
      alert("Mensagem vazia!");
      return;
    }
    setSender("user");
    setDateTime(Date());
    setId(Math.random() * 100);
    const addMessage = (body) => {
      let sender = "user";
      let dateTime = Date();
      let id = Math.random() * 100;
      const messageStorage = JSON.parse(localStorage.getItem("message_db"));
      let newMessage;

      if (messageStorage) {
        newMessage = [...messageStorage, { body, sender, dateTime, id }];
      } else {
        newMessage = [{ body, sender, dateTime, id }];
      }

      localStorage.setItem("message_db", JSON.stringify(newMessage));

      return;
    };
    const res = addMessage(body);
  };

  const ChatRoom = () => {
    return (
      <>
        <C.Container >
          <C.Label>Chat</C.Label>
          <div className="chat-wrapper">
            {messageStorage &&
              messageStorage.map((msg) => (
                <ChatMessage key={msg.id} message={msg} />
              ))}

            <Input
              type="string"
              placeholder="Message"
              value={body}
              onChange={(e) => [setBody(e.target.value)]}
            />
            <Button Text="Enviar" onClick={handleForm} />
          </div>
        </C.Container>
      </>
    );
  };

  function ChatMessage(props) {
    const { body, sender, dateTime, id } = props.message;

    const messageClass = sender === "user" ? "sent" : "received";

    return (
      <>
        <div className={`message ${messageClass}`}>
          <p className="message-body">{body}</p>
        </div>
      </>
    );
  }

  return (
    <>
        <div className="chat">
          <ChatRoom />
        </div>

    </>
  );
};

export default ChatComponent;
