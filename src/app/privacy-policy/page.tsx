
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-headline text-primary text-center">Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <p className="text-center text-muted-foreground">
            At Into the Woods, we respect your privacy and are committed to safeguarding your personal information. This Privacy Policy explains how we collect, use, and protect your data when you interact with our website or services.
          </p>
          
          <Separator />

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">1. Information We Collect</h2>
            <p className="text-foreground/90">
              We may collect personal details such as your name, email address, shipping address, and order information to process purchases and enhance your experience. Additionally, we use cookies and similar technologies to improve website functionality and performance.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">2. How We Use Your Information</h2>
            <p className="text-foreground/90">Your information is used to:</p>
            <ul className="list-disc pl-5 space-y-1 text-foreground/90">
              <li>Process and fulfil your orders</li>
              <li>Communicate with you regarding your purchases and inquiries</li>
              <li>Send updates, offers, or relevant information (if you have opted in)</li>
              <li>Improve our products, services, and website experience</li>
            </ul>
             <p className="text-foreground/90 pt-2">
              We do not sell, rent, or trade your personal data to third parties.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">3. Sharing Your Information</h2>
            <p className="text-foreground/90">
             We only share your data with trusted service providers—such as payment processors, shipping partners, and technical support teams—strictly for the purpose of completing transactions and improving service delivery. All partners are required to maintain confidentiality and comply with applicable data protection regulations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">4. Data Security</h2>
            <p className="text-foreground/90">
              We implement industry-standard security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, please note that no online system can guarantee absolute security.
            </p>
          </section>

           <section className="space-y-2">
            <h2 className="text-xl font-headline font-semibold text-primary">5. Your Rights and Choices</h2>
             <p className="text-foreground/90">
              You may update, correct, or request deletion of your personal data at any time. You may also opt out of receiving promotional communications by following the unsubscribe instructions included in our emails.
             </p>
          </section>
          
          <Separator />

          <section className="space-y-2 text-center">
             <h2 className="text-xl font-headline font-semibold text-primary">6. Contact Us</h2>
             <p className="text-foreground/90">
                For any questions, concerns, or requests regarding your privacy or this policy, please contact us at: <a href="mailto:intothewoodsuae@gmail.com" className="text-accent underline">intothewoodsuae@gmail.com</a>
             </p>
          </section>

        </CardContent>
      </Card>
    </div>
  );
}
