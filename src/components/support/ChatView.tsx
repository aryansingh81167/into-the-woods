
'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/hooks/useAuth';
import { useSupport } from '@/hooks/use-support';
import { addDoc, collection, serverTimestamp, query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useFirebase } from '@/firebase';
import { errorEmitter, FirestorePermissionError } from '@/firebase';
import type { SupportMessage } from '@/hooks/use-support';

export const ChatView = () => {
  const { user } = useAuth();
  const { db } = useFirebase();
  const { conversationId, setConversationId, messages, setMessages } = useSupport();
  const [newMessage, setNewMessage] = useState('');
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  // Subscribe to messages for the current conversation
  useEffect(() => {
    if (!db || !conversationId) return;

    const messagesQuery = query(
      collection(db, 'supportChats', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SupportMessage[];
      setMessages(newMessages);
    }, (error) => {
      console.error("Error fetching messages:", error);
      const permissionError = new FirestorePermissionError({
        path: `supportChats/${conversationId}/messages`,
        operation: 'list',
      });
      errorEmitter.emit('permission-error', permissionError);
    });

    return () => unsubscribe();
  }, [db, conversationId, setMessages]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !db) return;

    let currentConversationId = conversationId;

    // Create a new conversation if one doesn't exist
    if (!currentConversationId) {
      const chatData = {
        userId: user.uid,
        status: 'open',
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastMessage: newMessage,
      };
      const chatRef = await addDoc(collection(db, 'supportChats'), chatData).catch(err => {
        errorEmitter.emit('permission-error', new FirestorePermissionError({
          path: 'supportChats',
          operation: 'create',
          requestResourceData: chatData
        }));
        throw err;
      });
      currentConversationId = chatRef.id;
      setConversationId(currentConversationId);
    }
    
    if (!currentConversationId) return;

    // Add the new message
    const messageData = {
      chatId: currentConversationId,
      senderId: user.uid,
      content: newMessage,
      type: 'text',
      read: false,
      timestamp: serverTimestamp(),
    };
    
    const messagesCollection = collection(db, 'supportChats', currentConversationId, 'messages');
    addDoc(messagesCollection, messageData).catch(err => {
      errorEmitter.emit('permission-error', new FirestorePermissionError({
        path: messagesCollection.path,
        operation: 'create',
        requestResourceData: messageData
      }));
    });

    setNewMessage('');
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Avatar className="h-8 w-8 border">
                <AvatarFallback><Bot /></AvatarFallback>
            </Avatar>
            <div className="bg-muted p-3 rounded-lg max-w-[80%]">
                <p className="text-sm">Hello {user?.displayName || 'there'}! How can we help you today?</p>
            </div>
          </div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${msg.senderId === user?.uid ? 'justify-end' : ''}`}
            >
              {msg.senderId !== user?.uid && (
                <Avatar className="h-8 w-8 border">
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
              )}
              <div
                className={`p-3 rounded-lg max-w-[80%] ${
                  msg.senderId === user?.uid
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              {msg.senderId === user?.uid && (
                <Avatar className="h-8 w-8 border">
                  {user.photoURL && <AvatarImage src={user.photoURL} alt="user" />}
                  <AvatarFallback><User /></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            autoComplete="off"
            disabled={!user}
          />
          <Button type="submit" size="icon" disabled={!newMessage.trim() || !user}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
        {!user && <p className="text-xs text-muted-foreground text-center mt-2">Please <a href="/login" className="underline">log in</a> to start a chat.</p>}
      </div>
    </div>
  );
};

    