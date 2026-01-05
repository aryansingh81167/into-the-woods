'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is your return policy?',
    answer:
      "We offer a 14-day full refund on all plants if you're not satisfied. Please refer to our detailed Refund & Return Policy page for more information on eligibility and process.",
    category: 'shipping',
  },
  {
    question: 'How long does shipping take?',
    answer:
      'Standard orders are processed in 4-5 business days and typically arrive within 10-15 business days. Express options are available. Custom items may take longer.',
    category: 'shipping',
  },
  {
    question: 'Do you ship internationally?',
    answer:
      'Yes, we welcome international orders! Shipping costs and times vary by destination. Please note that customers are responsible for any customs duties or import fees.',
    category: 'shipping',
  },
  {
    question: 'How do I care for my new plant?',
    answer:
      'Each plant on our website has a detailed care guide on its product page, with instructions for summer, winter, and growing seasons. For more specific issues, our AI Plant Identifier or live chat support can help!',
    category: 'care',
  },
  {
    question: 'What if my plant arrives damaged?',
    answer:
      'Please contact us at intothewoodsuae@gmail.com within 48 hours of delivery with photos of the damage. We will assist you with a claim and arrange for a replacement or refund.',
    category: 'care',
  },
  {
    question: 'How do INQUE Points work?',
    answer:
      'You earn INQUE Points on every purchase across all our services (Flash, Feast, Volt, Space). You can then apply these points at checkout for a discount on future orders. Every 20 dirhams spent earns you 1 point, and points can be redeemed for discounts.',
    category: 'account',
  },
   {
    question: 'How can I become a seller?',
    answer:
      'We\'d love to have you! You can start the process by navigating to the "Become a Seller" page on our website. The process involves a few simple steps to verify your details and list your products.',
    category: 'account',
  },
];

export const FaqView = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const filteredFaqs = faqs.filter(faq => 
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );


  return (
    <ScrollArea className="h-full">
        <div className="p-4">
        <div className="text-center mb-6">
            <h3 className="font-bold text-lg text-primary">Help Center</h3>
            <p className="text-sm text-muted-foreground">Find answers to common questions.</p>
        </div>

        <div className="relative mb-6">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input 
                    placeholder="Search for a question..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
        </div>

        <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
            </AccordionItem>
            ))}
        </Accordion>

        {filteredFaqs.length === 0 && (
            <p className="text-center text-muted-foreground mt-6">No matching questions found.</p>
        )}
        </div>
    </ScrollArea>
  );
};
