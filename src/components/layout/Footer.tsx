'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';


export function Footer() {
  const whatsappNumber = "917977018117";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      toast({
        title: 'Thank You for Subscribing!',
        description: 'Your 10% discount code is: WELCOME10',
      });
      setEmail('');
    } else {
      toast({
        variant: 'destructive',
        title: 'Invalid Email',
        description: 'Please enter a valid email address.',
      });
    }
  };

  return (
    <footer className="border-t mt-12 bg-card text-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Sign Up Section */}
          <div className="space-y-4 lg:col-span-1">
            <h3 className="font-headline text-lg text-foreground">Sign Up — 10% off your first order</h3>
            <form onSubmit={handleSubscribe} className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="rounded-r-none focus:ring-accent text-card-foreground bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Button type="submit" className="rounded-l-none border-l-0 bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
            </form>
            <div className="flex items-center space-x-4">
              <Link href="#" className="text-foreground/80 transition-colors hover:text-foreground">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-foreground/80 transition-colors hover:text-foreground">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-foreground/80 transition-colors hover:text-foreground">
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:col-span-3">
              {/* Get Help Section */}
              <div className="space-y-3">
                <h3 className="font-headline text-lg text-foreground">Get Help</h3>
                <ul className="space-y-2">
                  <li><Link href="/about-us" className="text-foreground/80 hover:text-foreground transition-colors">About Us</Link></li>
                  <li><Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">For Businesses</Link></li>
                  <li><Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">Designer Program</Link></li>
                  <li><Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">Contact Us</Link></li>
                </ul>
              </div>

              {/* Our Terms Section */}
              <div className="space-y-3">
                <h3 className="font-headline text-lg text-foreground">Our Terms</h3>
                <ul className="space-y-2">
                    <li><Link href="/refund-policy" className="text-foreground/80 hover:text-foreground transition-colors">Refund Policy</Link></li>
                    <li><Link href="/shipping-policy" className="text-foreground/80 hover:text-foreground transition-colors">Shipping Policy</Link></li>
                    <li><Link href="/privacy-policy" className="text-foreground/80 hover:text-foreground transition-colors">Privacy Policy</Link></li>
                    <li><Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">Terms of Service</Link></li>
                </ul>
              </div>

              {/* Contact Section */}
              <div className="space-y-3">
                 <h3 className="font-headline text-4xl text-foreground">itw.</h3>
                 <ul className="space-y-2">
                    <li><a href="mailto:intothewoodsuae@gmail.com" className="text-foreground/80 hover:text-foreground transition-colors">Email: intothewoodsuae@gmail.com</a></li>
                    <li><a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="text-foreground/80 hover:text-foreground transition-colors flex items-center gap-2">WhatsApp: +91 7977018117</a></li>
                </ul>
              </div>
          </div>
        </div>
        
        <div className="border-t border-border mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-foreground/80">
            <div className="flex gap-4 items-center">
              <p>&copy; {new Date().getFullYear()} Into The Woods. All rights reserved.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-4 md:mt-0">
            </div>
        </div>
      </div>
    </footer>
  );
}

    