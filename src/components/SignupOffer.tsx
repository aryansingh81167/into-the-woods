'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X, Gift } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export function SignupOffer() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Show the offer card after a short delay on first visit
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('signup-offer-dismissed')) {
        setIsVisible(true);
      }
    }, 2000); // 2-second delay

    return () => clearTimeout(timer);
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    sessionStorage.setItem('signup-offer-dismissed', 'true');
  };

  const handleRegister = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    
    console.log({ name, email });
    
    toast({
      title: "Welcome!",
      description: "You've been registered. Your 10% discount will be applied at checkout.",
    });

    handleDismiss();
  };

  if (isDismissed) {
    return null;
  }

  return (
    <div className={cn(
      "fixed bottom-6 left-6 z-50 w-[calc(100vw-3rem)] max-w-sm transition-all duration-500 ease-in-out",
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
    )}>
      <Card className="shadow-2xl border-accent/50 bg-primary text-primary-foreground">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleDismiss}
          className="absolute top-2 right-2 h-7 w-7 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          aria-label="Dismiss"
        >
          <X className="h-5 w-5" />
        </Button>
        <CardHeader className="text-center">
          <div className="mx-auto bg-accent/20 text-accent rounded-full p-3 w-fit">
            <Gift className="h-8 w-8" />
          </div>
          <CardTitle className="font-headline text-primary-foreground text-2xl mt-2">Get 10% Off!</CardTitle>
          <CardDescription className="text-primary-foreground/80">Register now and receive an extra 10% off your first order.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-primary-foreground/90">Name</Label>
              <Input id="name" name="name" placeholder="Jane Doe" required className="bg-background/20 border-primary-foreground/20 placeholder:text-primary-foreground/50 text-primary-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-primary-foreground/90">Email Address</Label>
              <Input id="email" name="email" type="email" placeholder="jane.doe@example.com" required className="bg-background/20 border-primary-foreground/20 placeholder:text-primary-foreground/50 text-primary-foreground" />
            </div>
            <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-accent-foreground">
              Claim My Discount
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
