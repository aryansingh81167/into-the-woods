
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X, MessageSquare, Phone, HelpCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useSupport } from '@/hooks/use-support';
import { ChatView } from './ChatView';
import { CallView } from './CallView';
import { FaqView } from './FaqView';

export function SupportWidget() {
  const { isOpen, setIsOpen, view, setView } = useSupport();

  const handleToggle = () => setIsOpen(prev => !prev);
  
  const views = {
    chat: {
      component: <ChatView />,
      title: 'Live Chat',
    },
    call: {
      component: <CallView />,
      title: 'Call Support',
    },
    faq: {
      component: <FaqView />,
      title: 'Help Center',
    },
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <Button
                    size="icon"
                    className="rounded-full h-16 w-16 shadow-lg bg-primary hover:bg-primary/90"
                    onClick={handleToggle}
                    aria-label="Open Support Widget"
                >
                    <Bot className="h-8 w-8" />
                </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full h-full sm:h-[70vh] sm:max-h-[600px] sm:w-[400px]"
          >
            <Card className="shadow-2xl flex flex-col h-full w-full sm:rounded-lg">
              <CardHeader className="flex flex-row items-center justify-between border-b p-4">
                <CardTitle className="font-headline text-primary text-xl">
                  {views[view].title}
                </CardTitle>
                <Button variant="ghost" size="icon" onClick={handleToggle} className="h-8 w-8">
                    <X className="h-5 w-5 text-muted-foreground"/>
                    <span className="sr-only">Close support widget</span>
                </Button>
              </CardHeader>
              <CardContent className="flex-1 p-0 overflow-hidden">
                {views[view].component}
              </CardContent>
              <CardFooter className="p-2 border-t grid grid-cols-3 gap-1">
                <Button variant={view === 'chat' ? 'secondary' : 'ghost'} onClick={() => setView('chat')}>
                    <MessageSquare className="mr-2 h-4 w-4"/> Chat
                </Button>
                 <Button variant={view === 'call' ? 'secondary' : 'ghost'} onClick={() => setView('call')}>
                    <Phone className="mr-2 h-4 w-4"/> Call
                </Button>
                 <Button variant={view === 'faq' ? 'secondary' : 'ghost'} onClick={() => setView('faq')}>
                    <HelpCircle className="mr-2 h-4 w-4"/> FAQ
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

    