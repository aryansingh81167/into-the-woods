
'use client';

import { DocumentData, Timestamp } from 'firebase/firestore';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './useAuth';
import { useFirebase } from '@/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

export interface SupportMessage {
  id: string;
  chatId: string;
  senderId: string;
  content: string;
  type: 'text' | 'image';
  read: boolean;
  timestamp: Timestamp | DocumentData;
}

type SupportView = 'chat' | 'call' | 'faq';

interface SupportContextType {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  view: SupportView;
  setView: (view: SupportView) => void;
  conversationId: string | null;
  setConversationId: React.Dispatch<React.SetStateAction<string | null>>;
  messages: SupportMessage[];
  setMessages: React.Dispatch<React.SetStateAction<SupportMessage[]>>;
}

const SupportContext = createContext<SupportContextType | undefined>(undefined);

export const SupportProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState<SupportView>('chat');
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<SupportMessage[]>([]);
  const { user } = useAuth();
  const { db } = useFirebase();

  // Function to set view and open widget
  const openAndSetView = (newView: SupportView) => {
    setView(newView);
    if (!isOpen) {
      setIsOpen(true);
    }
  };

  // Find existing conversation for the user
  useEffect(() => {
    if (user && db) {
      const findConversation = async () => {
        const chatsRef = collection(db, 'supportChats');
        const q = query(chatsRef, where('userId', '==', user.uid), where('status', '==', 'open'));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          // Assuming user has only one open conversation
          const conversationDoc = querySnapshot.docs[0];
          setConversationId(conversationDoc.id);
        } else {
          setConversationId(null);
          setMessages([]);
        }
      };
      findConversation();
    } else {
      setConversationId(null);
      setMessages([]);
    }
  }, [user, db]);

  return (
    <SupportContext.Provider value={{
      isOpen,
      setIsOpen,
      view,
      setView: openAndSetView,
      conversationId,
      setConversationId,
      messages,
      setMessages,
    }}>
      {children}
    </SupportContext.Provider>
  );
};

export const useSupport = () => {
  const context = useContext(SupportContext);
  if (context === undefined) {
    throw new Error('useSupport must be used within a SupportProvider');
  }
  return context;
};

    