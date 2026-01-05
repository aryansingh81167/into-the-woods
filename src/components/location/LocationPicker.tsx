
'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2, MapPin, LocateFixed, Save } from 'lucide-react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { useLocation, type LocationData } from '@/hooks/use-location';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

interface LocationPickerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DUBAI_COORDS = { lat: 25.2048, lng: 55.2708 };

export function LocationPicker({ isOpen, onClose }: LocationPickerProps) {
  const { location, setLocation, isLocationLoading: isLocationContextLoading } = useLocation();
  const { toast } = useToast();

  const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>(location ? { lat: location.latitude, lng: location.longitude } : DUBAI_COORDS);
  const [markerPos, setMarkerPos] = useState<google.maps.LatLngLiteral | null>(mapCenter);
  const [addressDetails, setAddressDetails] = useState<Partial<LocationData>>({
    fullAddress: location?.fullAddress || '',
    houseNumber: location?.houseNumber || '',
    landmark: location?.landmark || '',
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const mapId = process.env.NEXT_PUBLIC_GOOGLE_MAPS_MAP_ID;

  // Sync internal state when the global location context changes
  useEffect(() => {
    if (location && isOpen) {
      const newPos = { lat: location.latitude, lng: location.longitude };
      setMapCenter(newPos);
      setMarkerPos(newPos);
      setAddressDetails({
        fullAddress: location.fullAddress,
        houseNumber: location.houseNumber,
        landmark: location.landmark,
      });
    } else if (!location && isOpen) {
      // If no location is set, default to Dubai and try to get user's location
      setMapCenter(DUBAI_COORDS);
      setMarkerPos(DUBAI_COORDS);
      handleUseCurrentLocation();
    }
  }, [location, isOpen]);

  const parseAddress = (result: google.maps.GeocoderResult): Partial<LocationData> => {
    const address: Partial<LocationData> = { fullAddress: result.formatted_address };
    let streetNumber = '';
    let route = '';

    for (const component of result.address_components) {
        if (component.types.includes('street_number')) streetNumber = component.long_name;
        if (component.types.includes('route')) route = component.long_name;
        if (component.types.includes('locality')) address.city = component.long_name;
        if (component.types.includes('administrative_area_level_1')) address.state = component.long_name;
        if (component.types.includes('country')) address.country = component.long_name;
        if (component.types.includes('postal_code')) address.postalCode = component.long_name;
    }
    // Combine street number and route for house number, or use just the route
    address.houseNumber = streetNumber ? `${streetNumber} ${route}` : route;
    return address;
  };
  
const handleGeocode = useCallback((lat: number, lng: number) => {
    if (!window.google?.maps) {
      console.warn("Google Maps not loaded yet");
      // Don't toast here, it can be annoying if it happens frequently
      return;
    }

    if (!lat || !lng) {
      console.warn("Invalid coordinates for geocoding:", lat, lng);
      return;
    }

    setIsGeocoding(true);
    setError(null);
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
      setIsGeocoding(false);
      if (status === "OK" && results && results[0]) {
        const parsedAddress = parseAddress(results[0]);
        setAddressDetails(prev => ({
          ...prev,
          ...parsedAddress,
          latitude: lat,
          longitude: lng
        }));
      } else {
        console.warn("Geocoding failed with status:", status);
        toast({
          variant: "destructive",
          title: "Could not find address",
          description: "Please try a different location or enter the address manually.",
        });
        // Do not throw an error, allow manual entry
        setAddressDetails(prev => ({
            ...prev,
            fullAddress: 'Address not found. Please enter manually.',
        }));
      }
    });
  }, [toast]);


  const handleMapDrag = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setMarkerPos(newPos);
    }
  };

  const handleMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      const newPos = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      setMapCenter(newPos);
      setMarkerPos(newPos);
      handleGeocode(newPos.lat, newPos.lng);
    }
  };

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    setError(null);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setMapCenter(newPos);
          setMarkerPos(newPos);
          handleGeocode(newPos.lat, newPos.lng);
          setIsLoading(false);
        },
        (err) => {
          console.error(err);
          setError('Could not get location. Please enable location services.');
          toast({
            variant: 'destructive',
            title: 'Location Access Denied',
            description: 'Please enable location permissions in your browser to use this feature.',
          });
          setIsLoading(false);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
      setIsLoading(false);
    }
  };

  const handleConfirmLocation = async () => {
    if (!markerPos) {
      toast({ variant: 'destructive', title: 'Error', description: 'No location selected.' });
      return;
    }
    const finalLocation: LocationData = {
        latitude: markerPos.lat,
        longitude: markerPos.lng,
        fullAddress: addressDetails.fullAddress || '',
        houseNumber: addressDetails.houseNumber || '',
        landmark: addressDetails.landmark || '',
        city: addressDetails.city || '',
        state: addressDetails.state || '',
        country: addressDetails.country || '',
        postalCode: addressDetails.postalCode || '',
        source: 'map', // or 'gps' if applicable
    };
    
    await setLocation(finalLocation);
    toast({ title: 'Location Updated!', description: 'Your delivery address has been saved.' });
    onClose();
  };

  if (!apiKey) {
      return (
          <Dialog open={isOpen} onOpenChange={onClose}>
              <DialogContent>
                  <DialogHeader>
                      <DialogTitle>Configuration Error</DialogTitle>
                      <DialogDescription>
                          The Google Maps API key is missing. Please add it to your environment variables to use the location feature.
                      </DialogDescription>
                  </DialogHeader>
              </DialogContent>
          </Dialog>
      );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] grid-rows-[auto_1fr_auto] p-0 max-h-[90vh]">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-headline text-primary">Confirm Your Delivery Location</DialogTitle>
          <DialogDescription>
            Drag the pin to the exact delivery spot or use your current location.
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid md:grid-cols-2 gap-6 px-6 overflow-y-auto">
            <div className="relative rounded-lg overflow-hidden h-full min-h-[300px]">
                <APIProvider apiKey={apiKey}>
                    <Map
                        center={mapCenter}
                        zoom={16}
                        mapId={mapId}
                        onDragEnd={handleMapDrag}
                        gestureHandling={'greedy'}
                        disableDefaultUI={true}
                    >
                      {markerPos && (
                          <AdvancedMarker
                              position={markerPos}
                              draggable={true}
                              onDragEnd={handleMarkerDragEnd}
                          >
                              <Pin
                                  background={'hsl(var(--primary))'}
                                  borderColor={'hsl(var(--primary))'}
                                  glyphColor={'hsl(var(--primary-foreground))'}
                              />
                          </AdvancedMarker>
                      )}
                    </Map>
                </APIProvider>
            </div>
            <div className="space-y-4 flex flex-col">
                <Button onClick={handleUseCurrentLocation} disabled={isLoading} variant="outline" className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <LocateFixed className="mr-2 h-4 w-4" />}
                    Use Current Location
                </Button>

                {error && <p className="text-sm text-destructive text-center">{error}</p>}

                <div className="flex-grow space-y-3">
                    <div className="space-y-1">
                        <Label htmlFor="fullAddress">Full Address</Label>
                         {isGeocoding ? (
                             <Skeleton className="h-10 w-full" />
                         ) : (
                            <Input id="fullAddress" value={addressDetails.fullAddress || ''} readOnly disabled />
                         )}
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="houseNumber">Apt / House No. / Street</Label>
                        <Input 
                            id="houseNumber"
                            placeholder="e.g. Apt 505, Green Tower"
                            value={addressDetails.houseNumber || ''}
                            onChange={(e) => setAddressDetails(prev => ({ ...prev, houseNumber: e.target.value }))} 
                        />
                    </div>
                     <div className="space-y-1">
                        <Label htmlFor="landmark">Nearby Landmark</Label>
                        <Input 
                            id="landmark"
                            placeholder="e.g. Near Grand Mosque"
                            value={addressDetails.landmark || ''}
                            onChange={(e) => setAddressDetails(prev => ({ ...prev, landmark: e.target.value }))}
                        />
                    </div>
                </div>
            </div>
        </div>

        <DialogFooter className="p-6 pt-4 bg-background border-t">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleConfirmLocation} disabled={isGeocoding || isLocationContextLoading}>
            {(isGeocoding || isLocationContextLoading) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <Save className="mr-2 h-4 w-4" />
            Confirm Location
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
