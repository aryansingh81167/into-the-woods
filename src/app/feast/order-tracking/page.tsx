
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Package, Moped, Home, Clock, UtensilsCrossed } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const trackingSteps = [
  { status: 'Order Confirmed', icon: <CheckCircle /> },
  { status: 'Preparing Your Food', icon: <Package /> },
  { status: 'Rider on the way', icon: <Moped /> },
  { status: 'Delivered', icon: <Home /> },
];

export default function FeastOrderTrackingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes in seconds

  useEffect(() => {
    // Simulate order progress
    const progressInterval = setInterval(() => {
      setCurrentStep((prev) => (prev < trackingSteps.length - 1 ? prev + 1 : prev));
    }, 45000); // Move to next step every 45 seconds

    // Countdown timer
    const timerInterval = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(timerInterval);
    };
  }, []);
  
  const progressPercentage = (currentStep / (trackingSteps.length - 1)) * 100;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-lg px-4 py-8">
        <div className="flex items-center gap-3 mb-8">
            <Link href="/feast" className="text-primary">
                <UtensilsCrossed className="h-7 w-7" />
            </Link>
            <div>
                 <h1 className="text-3xl font-bold font-headline text-primary">Track Your Feast</h1>
                 <p className="text-muted-foreground">Order #INQUE-F-4D5E6F</p>
            </div>
        </div>
       

        <Card className="shadow-lg">
          <CardHeader>
             <div className="flex justify-between items-center">
                 <CardTitle className="text-lg font-semibold">Live Status</CardTitle>
                 <div className="flex items-center gap-2 text-primary font-bold">
                    <Clock className="h-5 w-5" />
                    <span>{minutes}:{seconds < 10 ? `0${seconds}` : seconds} min left</span>
                 </div>
             </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="mb-6">
                <Progress value={progressPercentage} className="h-2" />
            </div>
            
            <div className="space-y-6">
              {trackingSteps.map((step, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={`flex flex-col items-center ${index === trackingSteps.length - 1 ? 'h-8' : 'min-h-[60px]'}`}>
                     <div className={`h-8 w-8 rounded-full flex items-center justify-center ${index <= currentStep ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
                      {step.icon}
                    </div>
                    {index < trackingSteps.length - 1 && (
                      <div className={`w-0.5 flex-grow ${index < currentStep ? 'bg-primary' : 'bg-border'}`} />
                    )}
                  </div>
                  <div>
                    <p className={`font-semibold ${index <= currentStep ? 'text-primary' : 'text-muted-foreground'}`}>{step.status}</p>
                    {index === 1 && currentStep >= 1 && <p className="text-sm text-muted-foreground">The restaurant is preparing your food.</p>}
                    {index === 2 && currentStep >= 2 && <p className="text-sm text-muted-foreground">Your rider is on the way to you!</p>}
                    {index === 3 && currentStep >= 3 && <p className="text-sm text-muted-foreground">Your order has arrived. Enjoy your meal!</p>}
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-6" />

            {/* Map Placeholder */}
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Map preview is loading...</p>
            </div>

             <Button asChild variant="outline" className="w-full mt-6">
              <Link href="/feast">Order Again</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
