import React, { useEffect, useState } from 'react';
import "./Message.css"
import { Socket, io } from 'socket.io-client';
import { isLoggedIn } from '../../services/authService';
import { v4 as uuidv4 } from 'uuid';
import { error } from 'console';
import { Navigate, useNavigate } from 'react-router';
import { getUserProfile } from '../../services/profileService';

const port = process.env.PORT || 8000;
let socket = io(`:${port}`, { transports : ['websocket'] })

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
  const [messageInput, setMessageInput] = useState<string>('');
  const [conversations, setConversations] = useState<CreateConversationMessage[]>([]);
  // TODO: Get User's name to show up as the conversation title
  const [curConversation, setCurConversation] = useState<string>('');
  const [connectedRooms, setConnectedRooms] = useState(new Set());
  const [user, setUser] = useState<string>("");
  const [map, setMap] = useState(new Map());
  const navigate = useNavigate()

  // push scroll down to view the most recent messages
  const setScrollPosition = () => {
    const chatBody = document.getElementById('messages');
    if(chatBody && chatBody.scrollHeight > 0) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  // Get messages for clicked-on conversation
  const getMessages = async (convoId: string) => {
    try {
      const res = await fetch(`/api/message/${convoId}`);
      const data = await res.json();
      setMessages(data);
      setCurConversation(convoId);

      return data;
    } catch(error) {
        console.log(error);
    }
  }

  // load messages into front-end container
  const addMessage = (message : string, senderId: string) => {
    if(message && senderId) {
      const messageContainer = document.createElement('div');
      messageContainer.textContent = message;

      if(message.length > 50) {
        messageContainer.style.width = '28em';
      }
      messageContainer.classList.add('message');

      if (senderId == user) {
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

  // clear messages that were shown before
  const clearScreen = () => {
    const messageContainer: HTMLElement | null = document.getElementById("messages");
    if(messageContainer) {
      messageContainer.innerHTML = "";
    }
  }

  // Send message on enter
  const sendMessage = (e : any) => {
    e.preventDefault();
    const inputBox: HTMLInputElement | null = document.getElementById("input") as HTMLInputElement;
    if (inputBox) {
      inputBox.value = "";
    }

    setMessageInput('');

    if (socket && messageInput.trim() !== '') {
        const newMessage: CreateConversationMessage = {
            convoMsgId: uuidv4(),
            message: messageInput,
            createdAt: new Date(),
            senderId: user,
            convoId: curConversation
        }
        
        socket.emit('private message', newMessage);
    }
  };

  // show input box onbly when on conversation
  const showInputcontainer = () => {
    const inputContainer = document.getElementById("message-input");
    if (inputContainer)
        inputContainer.style.display = 'block';

  }

  const showConversation = () => {
    const container = document.getElementById("conversation-name");
    if(container)
      container.style.display = 'block';
  }

  // on login, must join all convesation rooms to recieve messages in real time
  useEffect(() => {
    const getUser = async () => {

      try {
        let profile = await getUserProfile('');
        setUser(profile[0].uid!);
      } catch(error) {
        console.log(error);
        navigate("/login");
      }
    }

    getUser();
  }, []);

  // Load messages onto front-end
  useEffect(() => {
    clearScreen();

    // TODO: Update Type any
    const addAllMessage = () => {
        for(let i = 0; i < messages.length; i++) {
            let cur: any = messages[i];
            addMessage(cur.message, cur.senderId);
        }
    }

    addAllMessage()
  }, [messages])

  // Get Conversations on load
  useEffect(() => {

    const getConversations = async () => {
      console.log(`Getting conversations for user: ${user}`);
      try {
        const response = await fetch(`/api/conversations/user/${user}`, {
          method: "GET",
          headers: {
            "content-type": "application/json"
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        setConversations(data.data)
        let newMap = new Map(Object.entries(data.mapping));
        setMap(newMap);
      } catch (error) {
        console.error('Error fetching conversations:', error);
        throw error;
      }

    };
    
    if(user) {
      getConversations();
    }

  }, [user]);

  // Create conversation list when conversations have been set
  useEffect(() => {
    const CreateConversations_list = () => {
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

    CreateConversations_list();
  }, [conversations]);

   // join all conversations on load
  useEffect(() => {
    for(let i = 0; i < conversations.length; i++) {
        if(!connectedRooms.has(conversations[i].convoId))
            socket.emit('join', {convoId: conversations[i].convoId, userID: user});
    }
  });
  
  // Socket Events
  useEffect(() => {
    socket.off('get private message').on('get private message', (data: CreateConversationMessage) => {
      console.log(data);
      setMessages((message) => [...message, data])
    })

    socket.off("joined").on("joined", (data: any) => {
        setConnectedRooms(prevRooms => new Set(prevRooms.add(data)));
    });

  }, [socket]);

  const handleKeyDown = (e : any) => {
    if(e.key === 'Enter') {
      sendMessage(e)
      e.preventDefault()
      e.currentTarget.value = "";
    }
  }

  return (
    <div className='App'>
      <div className='messages-bar' id='messages-bar'>
        {conversations.map((conversations) => (
          <div>
            <a className="conversation-name" onClick={() => {getMessages(conversations.convoId); showInputcontainer(); showConversation()}}>{map.get(conversations.convoId)}</a>
          </div>
        ))}
      </div>
      <div className='messages'>

        <div id="conversation-name" className='Conversation-name' style={{display: "none"}}>
          <div id="user-image" className='basis-full flex justify-center mt-3'>
            <img className='rounded-full w-16 h-16 object-cover border-4 hover:shadow-md' src='https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'></img>
          </div>
          <div>{map.get(curConversation)}</div>
        </div>

        <br></br>
        <div className="container" id='messages'></div>

        <div className="message-input" id="message-input">
          <input id='input' className='input-box' onKeyDown={handleKeyDown} onChange={(e) => setMessageInput(e.target.value)}/>
          <button className="send-button" id="input-field" onClick={(e) => sendMessage(e)}>Send</button> 
        </div>
      </div>
    </div>  
  );
};

export default Message;