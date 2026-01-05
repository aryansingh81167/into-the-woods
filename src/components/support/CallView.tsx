
'use client';

import { Phone, PhoneOutgoing, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const CallView = () => {
  const phoneNumber = "+97141234567";
  const whatsappNumber = "917977018117";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Hello, I need support.")}`;

  return (
    <div className="p-4 space-y-6">
      <div className="text-center">
        <h3 className="font-bold text-lg text-primary">Talk to an expert</h3>
        <p className="text-sm text-muted-foreground">Get instant help over the phone.</p>
      </div>

      <Card>
        <CardContent className="p-4 space-y-4">
          <a href={`tel:${phoneNumber}`} className="w-full">
            <Button className="w-full h-14" size="lg">
              <PhoneOutgoing className="mr-3" />
              Call Us Now
            </Button>
          </a>
          <div className="text-center">
            <p className="font-bold text-xl">{phoneNumber}</p>
            <p className="text-xs text-muted-foreground">Standard call charges may apply</p>
          </div>
        </CardContent>
      </Card>
      
       <Card>
        <CardContent className="p-4 space-y-4">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
            <Button className="w-full h-14 bg-green-600 hover:bg-green-700" size="lg">
              <Phone className="mr-3" />
              Chat on WhatsApp
            </Button>
          </a>
          <div className="text-center">
            <p className="font-bold text-xl">+{whatsappNumber}</p>
            <p className="text-xs text-muted-foreground">Chat with us directly on WhatsApp</p>
          </div>
        </CardContent>
      </Card>

      <Separator />

      <div className="text-center text-muted-foreground">
        <div className="flex items-center justify-center gap-2">
            <Clock className="h-4 w-4" />
            <p className="font-semibold">Business Hours:</p>
        </div>
        <p className="text-sm">Sunday - Thursday, 9:00 AM - 6:00 PM (GMT+4)</p>
      </div>
    </div>
  );
};

    