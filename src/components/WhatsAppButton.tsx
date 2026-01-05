
'use client';

import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { Phone } from 'lucide-react';
import { useSupport } from '@/hooks/use-support';

export function WhatsAppButton() {
  const { setView } = useSupport();

  return (
    <div className={cn("fixed bottom-28 right-6 z-50")}>
       <Button 
          size="icon" 
          className="rounded-full h-16 w-16 shadow-lg"
          onClick={() => setView('call')}
          aria-label="Call us"
        >
            <Phone className="h-8 w-8" />
        </Button>
    </div>
  );
}

    