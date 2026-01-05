
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Bot, X, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const handleToggle = () => {
    toast({
      title: "Use New Support Widget",
      description: "AI chat has been integrated into the new support widget in the bottom right.",
    });
  };

  return (
    <>
      <div className={cn("fixed bottom-6 right-6 z-50")}>
         <Button
            size="icon"
            className="rounded-full h-16 w-16 shadow-lg bg-primary hover:bg-primary/90"
            onClick={handleToggle}
            aria-label="Toggle Chatbot"
          >
            {isOpen ? <X className="h-8 w-8" /> : <Bot className="h-8 w-8" />}
          </Button>
      </div>
    </>
  );
}

    