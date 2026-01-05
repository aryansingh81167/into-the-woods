'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function IdentifyPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-4 text-primary">
          Plant Identifier
        </h1>
        <p className="text-lg text-foreground/80">
          This feature is temporarily unavailable.
        </p>
      </div>

      <Card className="shadow-lg">
        <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold">Under Maintenance</h3>
          <p className="text-muted-foreground mt-2">
            The plant identification feature is currently being worked on. We apologize for the inconvenience. Please check back later.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
