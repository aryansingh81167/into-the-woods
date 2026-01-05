
import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import { Chatbot } from '@/components/Chatbot';
import { SignupOffer } from '@/components/SignupOffer';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { CartClientProvider } from '@/hooks/use-cart-client';
import { ThemeProvider } from '@/components/ThemeProvider';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { InqueCartClientProvider } from '@/hooks/use-inque-cart-client';
import { FeastCartClientProvider } from '@/hooks/use-feast-cart-client';
import { VoltCartClientProvider } from '@/hooks/use-volt-cart-client';
import { LocationProvider } from '@/hooks/use-location';
import { SupportProvider } from '@/hooks/use-support';
import { SupportWidget } from '@/components/support/SupportWidget';

export const metadata: Metadata = {
  title: 'INQUE',
  description: 'A marketplace for plant lovers, by plant lovers.',
  icons: {
    icon: '/inque-logo.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;700&family=Work+Sans:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body text-foreground antialiased')}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <LocationProvider>
              <CartClientProvider>
                <InqueCartClientProvider>
                  <FeastCartClientProvider>
                    <VoltCartClientProvider>
                      <SupportProvider>
                        <div className="relative flex min-h-dvh flex-col">
                          <Header />
                          <main className="flex-1">{children}</main>
                          <Footer />
                        </div>
                        <SupportWidget />
                        <SignupOffer />
                        <Toaster />
                      </SupportProvider>
                    </VoltCartClientProvider>
                  </FeastCartClientProvider>
                </InqueCartClientProvider>
              </CartClientProvider>
            </LocationProvider>
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

    