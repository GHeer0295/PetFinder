import React, { useEffect, useState } from 'react';
import "./Message.css"
import { Socket, io } from 'socket.io-client';
import { UUID } from 'crypto';

let socket = io('http://localhost:8000', { transports : ['websocket'] });

// Temp
interface CreateConversationMessage {
  convoMsgId: string;
  message: string;
  createdAt: Date;
  senderId: string;
  convoId: string;
}

const Message: React.FC = () => {
  const [messages, setMessages] = useState([{}])
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState<CreateConversationMessage[]>([]);
  // set upon selection
  const [curConversation, setCurConversation] = useState('');
  const [connectedRooms, setConnectedRooms] = useState(new Set());


  // on login, must join all convesation rooms to recieve messages in real time
  // for testing, using the same UUID for user and conversation
  let User_Convo = "f47ac10b-58cc-4372-a567-0e02b2c3d479";

  const getMessages = async (convoId: string) => {
    try {
      const res = await fetch(`http://localhost:8000/api/message/${convoId}`);
      const data = await res.json();
      setMessages(data);
      setCurConversation(convoId);

      return data;
    } catch(error) {
        console.log(error);
    }
  }

  const addMessage = (message : string, senderId: string) => {
    if(message && senderId) {
      const messageContainer = document.createElement('div');
      messageContainer.textContent = message;
      messageContainer.classList.add('message');

      if (senderId == User_Convo) {
          messageContainer.classList.add('sent');
          document.getElementById('messages')?.appendChild(messageContainer);
      } else {
          messageContainer.classList.add('received');
          document.getElementById('messages')?.appendChild(messageContainer);
      }
    }

    // push screen to the bottom to view the mot recent message
    setScrollPosition();
  }

  useEffect(() => {
    // TODO: Update Type any
    const addAllMessage = () => {
        for(let i = 0; i < messages.length; i++) {
            let cur: any = messages[i];
            addMessage(cur.message, cur.senderId);
        }
    }

    addAllMessage()
  }, [messages])

  const setScrollPosition = () => {
    const chatBody = document.getElementById('messages');
    if(chatBody && chatBody.scrollHeight > 0) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  useEffect(() => {
    const getConversations = async () => {
      console.log(`Getting conversations for user: ${User_Convo}`)
      const result = await fetch(`http://localhost:8000/api/conversations/${User_Convo}`, {
        method: "GET",
        headers: {
          "content-type": "application/json"
        }
      }).then(async (conversations) => setConversations(await conversations.json()))
    }

    // conversations on load
    getConversations();
  }, []);

  useEffect(() => {
    const getConversations = () => {
      const conversationList = document.getElementById('conversations-list');
      for(let i = 0; i < conversations.length; i++) {
        const conversation = conversations[i];
        const conversationItem = document.createElement('li');
        conversationItem.id = conversation.convoId;

        conversationItem.onclick = () => {
          getMessages(conversation.convoId);
          console.log(messages)
        }
        conversationList?.appendChild(conversationItem);
      }
    }

    getConversations();
  }, []);

  useEffect(() => {
    // join all conversations on load
    for(let i = 0; i < conversations.length; i++) {
        if(!connectedRooms.has(conversations[i].convoId))
            socket.emit('join', {convoId: conversations[i].convoId, userID: User_Convo});
    }
  });
  
  const sendMessage = () => {
    setMessageInput('');

    if (socket && messageInput.trim() !== '') {
        const newMessage: CreateConversationMessage = {
            convoMsgId: User_Convo,
            message: messageInput,
            createdAt: new Date(),
            senderId: User_Convo,
            convoId: User_Convo
        }
        
        socket.emit('private message', newMessage);
    }
  };

  // show input box onbly when on conversation
  const showInputcontainer = () => {
    const inputContainer = document.getElementById("message-input");
        if (inputContainer) {
            inputContainer.style.display = 'block';
        }
    }

  useEffect(() => {
    socket.off('get private message').on('get private message', (data: CreateConversationMessage) => {
      console.log(data);
      setMessages((message) => [...message, data])
    })

    socket.off("joined").on("joined", (data: any) => {
        setConnectedRooms(prevRooms => new Set(prevRooms.add(data)));
    });

  }, [socket]);

  return (
    <div className='App'>
      <div>
        <h1>List of Conversations</h1>
        <ul id='conversations-list'>
          {conversations.map((conversation) => (
            <li onClick={() => {getMessages(conversation.convoId); showInputcontainer();}}>{conversation.convoId}</li>
          ))}
        </ul>
      </div>

      <div>
        <div className="container" id='messages'></div>

        <div className="message-input" id="message-input">
          <input id='input' onChange={(e) => setMessageInput(e.target.value)}/>
          <button onClick={sendMessage}> Send </button> 
        </div>
      </div>
    </div>    
  );
};

export default Message;