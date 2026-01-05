
'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ShoppingCart, User, Zap, HardDrive, UtensilsCrossed, Sofa, Sparkles, MapPin, ChevronDown, Shield } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { useInqueCart } from '@/hooks/use-inque-cart';
import { useFeastCart } from '@/hooks/use-feast-cart';
import { useVoltCart } from '@/hooks/use-volt-cart';
import { Badge } from '../ui/badge';
import { useAuth } from '@/hooks/useAuth';
import { useFirebase } from '@/firebase';
import { signOut } from 'firebase/auth';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ThemeToggle } from '../ThemeToggle';
import { Skeleton } from '../ui/skeleton';
import { InqueSearch } from '../inque/InqueSearch';
import { useState } from 'react';
import { useLocation } from '@/hooks/use-location';
import { LocationPicker } from '../location/LocationPicker';

const serviceTabs = [
  { name: 'Flash', subtitle: 'Instant needs, zero wait', href: '/', icon: <Zap className="h-7 w-7" /> },
  { name: 'Feast', subtitle: 'Food delivered to your door', href: '/feast', icon: <UtensilsCrossed className="h-7 w-7" /> },
  { name: 'Volt', subtitle: 'Smart electronics & gadgets', href: '/volt', icon: <HardDrive className="h-7 w-7" /> },
  { name: 'Services', subtitle: 'Book professional help', href: '/services', icon: <Sparkles className="h-7 w-7" /> },
  { name: 'Space', subtitle: 'Style your living', href: '/products', icon: <Sofa className="h-7 w-7" /> },
]

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { getCartItemCount: getSpaceCartItemCount } = useCart();
  const { getCartItemCount: getFlashCartItemCount } = useInqueCart();
  const { getCartItemCount: getFeastCartItemCount } = useFeastCart();
  const { getCartItemCount: getVoltCartItemCount } = useVoltCart();
  const { user, loading: isUserLoading, isAdmin } = useAuth();
  const { auth } = useFirebase();
  const { location, isLocationLoading } = useLocation();
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  const handleSignOut = async () => {
    if (!auth) return;
    await signOut(auth);
    router.push('/');
  }

  const getActiveStore = () => {
    if (pathname.startsWith('/feast')) return 'feast';
    if (pathname.startsWith('/volt')) return 'volt';
    if (pathname.startsWith('/services')) return 'services';
    if (pathname.startsWith('/products') || pathname.startsWith('/shop') || pathname.startsWith('/cart')) return 'space';
    if (pathname.startsWith('/admin')) return 'admin';
    return 'flash';
  }

  const activeStore = getActiveStore();
  const activeTabHref = serviceTabs.find(tab => tab.name.toLowerCase() === activeStore)?.href || '/';
  
  let itemCount = 0;
  let cartLink = '/inque/cart';

  switch (activeStore) {
    case 'flash':
      itemCount = getFlashCartItemCount();
      cartLink = '/inque/cart';
      break;
    case 'feast':
      itemCount = getFeastCartItemCount();
      cartLink = '/feast/cart';
      break;
    case 'volt':
        itemCount = getVoltCartItemCount();
        cartLink = '/volt/cart';
        break;
    case 'space':
      itemCount = getSpaceCartItemCount();
      cartLink = '/cart';
      break;
  }

  const showSearchBar = ['flash', 'feast', 'volt'].includes(activeStore);
  
  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-card shadow-sm text-card-foreground">
        <div className="container mx-auto max-w-6xl px-4 pt-4">
          
          {/* Service Tabs */}
          <div className="flex justify-around items-center py-2">
            {serviceTabs.map((tab) => (
              <Link href={tab.href} key={tab.name} className="flex-1">
                <div
                  className={cn(
                    'flex flex-col items-center justify-center gap-1 rounded-lg p-2 transition-colors duration-200 h-[70px] w-full',
                    activeTabHref === tab.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted/50'
                  )}
                >
                  <div className={cn(
                      'flex items-center justify-center rounded-full h-10 w-10',
                      activeTabHref === tab.href ? 'bg-primary text-primary-foreground' : 'bg-muted'
                  )}>
                    {tab.icon}
                  </div>
                  <span className="font-semibold text-[10px] uppercase tracking-wider">{tab.name}</span>
                </div>
              </Link>
            ))}
          </div>

           {/* Location and Actions Row */}
           <div className="flex justify-between items-center h-16 border-t mt-2">
             <Button
                variant="ghost"
                className="h-auto p-1 -ml-2"
                onClick={() => setIsLocationPickerOpen(true)}
              >
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="ml-2 text-left">
                    {isLocationLoading ? (
                      <>
                        <Skeleton className="h-4 w-20 mb-1" />
                        <Skeleton className="h-3 w-28" />
                      </>
                    ) : (
                      <>
                        <p className="text-sm font-bold leading-tight line-clamp-1">
                          {location?.city || "Set Location"}
                        </p>
                        <p className="text-xs text-muted-foreground leading-tight line-clamp-1">
                          {location ? (location.fullAddress.length > 30 ? location.fullAddress.substring(0, 30) + '...' : location.fullAddress) : 'Select your delivery address'}
                        </p>
                      </>
                    )}
                  </div>
                   <ChevronDown className="h-4 w-4 text-muted-foreground ml-1" />
                </div>
              </Button>

            <div className="flex items-center space-x-2">
              {isAdmin && (
                <Button asChild variant="ghost" size="icon" className="rounded-full">
                  <Link href="/admin">
                    <Shield className="h-5 w-5 text-primary" />
                  </Link>
                </Button>
              )}
              {isUserLoading ? (
                <Skeleton className="h-9 w-9 rounded-full" />
              ) : user ? (
                 <Link href="/profile">
                    <Avatar className="h-9 w-9 cursor-pointer">
                    {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
                    <AvatarFallback>{user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                    </Avatar>
                </Link>
              ) : (
                <Button asChild variant="ghost" size="icon" className="rounded-full">
                    <Link href="/login">
                    <User className="h-5 w-5 text-muted-foreground" />
                    </Link>
                </Button>
              )}
               <Button variant="ghost" size="icon" asChild>
                  <Link href={cartLink} className="relative text-muted-foreground">
                      <ShoppingCart className="h-5 w-5" />
                      {itemCount > 0 && (
                        <Badge variant="destructive" className="absolute -right-2 -top-1 h-4 w-4 justify-center rounded-full p-0 text-xs">
                          {itemCount}
                        </Badge>
                      )}
                      <span className="sr-only">View Cart</span>
                  </Link>
              </Button>
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        {showSearchBar && (
             <div className="container mx-auto max-w-6xl px-4 pb-4">
                <InqueSearch store={activeStore as 'flash' | 'feast' | 'volt'} />
            </div>
        )}
      </header>
      <LocationPicker
        isOpen={isLocationPickerOpen}
        onClose={() => setIsLocationPickerOpen(false)}
      />
    </>
  );
}
