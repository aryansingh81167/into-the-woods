
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function ShippingPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary text-center">Shipping Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-center text-muted-foreground">
            At Into the Woods, we take pride in delivering your orders safely and efficiently. Please review our shipping guidelines below.
          </p>
          
          <Separator />

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">1. Order Processing</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>Standard orders are typically processed within 4–5 business days.</li>
              <li>Custom or handcrafted items may require 10–15 business days for preparation.</li>
              <li>You will receive a confirmation email once your order has been processed and shipped.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">2. Shipping Methods & Delivery Times</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>Standard Shipping: 10–15 business days</li>
              <li>Express Shipping: 5–8 business days</li>
              <li>Delivery times may vary depending on your location and product availability.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">3. Shipping Charges</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>Shipping costs are calculated at checkout based on your order size, weight, and destination.</li>
              <li>Free standard shipping may be available on orders above a specified amount; please refer to our website for current promotions.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">4. Handling & Packaging</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>All items are carefully packaged to ensure they arrive in perfect condition.</li>
              <li>Plants, fragile items, sculptures, and wooden artifacts are packaged with extra care to prevent damage during transit.</li>
              <li>Please inspect your order upon arrival and notify us immediately if there is any visible damage.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">5. International Shipping</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>We welcome international orders. Shipping costs and delivery times vary depending on the destination.</li>
              <li>Customers are responsible for customs duties, taxes, and import fees.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">6. Delays & Issues</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>While we make every effort to deliver on time, occasional delays may occur due to weather, carrier issues, or unforeseen circumstances.</li>
              <li>In the event of a delay, we will notify you promptly and provide tracking updates.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">7. Lost or Damaged Shipments</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>If your package is lost or damaged, please contact us at intothewoodsuae@gmail.com within 48 hours of delivery.</li>
              <li>We will assist you in filing a claim with the carrier and arranging a replacement or refund if necessary.</li>
            </ul>
          </section>
          
          <Separator />

          <section className="space-y-2 text-center">
             <h2 className="text-xl font-headline font-semibold text-primary">8. Questions</h2>
             <p className="text-foreground/90">
                For any questions regarding shipping, delivery, or packaging, please contact us at <a href="mailto:intothewoodsuae@gmail.com" className="text-accent underline">intothewoodsuae@gmail.com</a>. Our team is happy to assist you.
             </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
