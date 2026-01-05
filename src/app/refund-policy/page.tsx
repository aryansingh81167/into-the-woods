
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary text-center">Refund &amp; Return Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-center text-muted-foreground">
            At Into the Woods, we are committed to ensuring that every item meets the highest standards of quality. If you are not completely satisfied with your purchase, we are here to assist you. Please review our refund and return policy below.
          </p>
          
          <Separator />

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">1. General Policy</h2>
            <p className="text-foreground/90">
              Customers may request a refund, replacement, or coupon within 7 days of delivery if they are not satisfied with their purchase. We strive to resolve all concerns promptly and fairly.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">2. Eligibility for Refunds</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>Items arrive damaged, defective, or significantly different from their description.</li>
              <li>Plants must be returned in their original condition and packaging, where possible.</li>
              <li>Custom or personalized orders (e.g., bespoke sculptures, branded wooden artifacts) are non-refundable unless damaged or defective.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">3. Non-Refundable Items</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
                <li>Perishable goods such as cut flowers or delicate plants are sensitive to shipping.</li>
                <li>Items that have been altered, planted, or used.</li>
                <li>Gift cards.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">4. How to Request a Refund</h2>
             <ol className="list-decimal pl-5 space-y-1 text-foreground/90">
                <li>Contact our support team at <a href="mailto:intothewoodsuae@gmail.com" className="text-accent underline">intothewoodsuae@gmail.com</a> within 7 days of receiving your order.</li>
                <li>Provide your order number, photos of the item (if damaged), and a brief description of the issue.</li>
                <li>Once approved, we will guide you through the return process.</li>
            </ol>
          </section>

           <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">5. Refund Process</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>Approved refunds will be processed within 5–6 business days.</li>
              <li>Refunds will be issued via the original payment method.</li>
              <li>Shipping costs are non-refundable unless the return is due to an error on our part.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">6. Exchanges &amp; Coupon Codes</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
                <li>Damaged or defective items can be exchanged for a replacement of equal value.</li>
                <li>If a replacement is unavailable, we may issue coupon codes as an alternative.</li>
            </ul>
          </section>
          
           <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">7. Shipping Returns</h2>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
                <li>Customers are responsible for return shipping costs unless the item is damaged, defective, or a result of our error.</li>
                <li>We recommend using a trackable shipping service to ensure the safe return of your item.</li>
            </ul>
          </section>

          <Separator />

          <section className="space-y-2 text-center">
             <h2 className="text-xl font-headline font-semibold text-primary">8. Questions</h2>
             <p className="text-foreground/90">
                For any questions about your order, returns, or refunds, please contact us at <a href="mailto:intothewoodsuae@gmail.com" className="text-accent underline">intothewoodsuae@gmail.com</a>. Our team is happy to assist you.
             </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
