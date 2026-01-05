
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Leaf } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="container mx-auto max-w-4xl px-4 py-12">
      <Card className="overflow-hidden">
        <div className="relative h-64 w-full">
            <Image 
                src="https://picsum.photos/seed/forest-path/1200/400"
                alt="A path into a lush forest"
                fill
                className="object-cover"
                data-ai-hint="forest path"
            />
             <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <h1 className="text-4xl md:text-5xl font-headline font-bold text-white text-center drop-shadow-md">About Us</h1>
            </div>
        </div>
        <CardContent className="p-6 md:p-8 space-y-8">
          <section className="text-center">
            <p className="text-lg md:text-xl text-muted-foreground italic">
                At Into the Woods, we believe every soul has roots longing to be rediscovered.
            </p>
          </section>
          
          <Separator />

          <section className="space-y-4 text-foreground/90 leading-relaxed">
            <p>
              We are a nature-inspired design atelier, dedicated to cultivating beauty, heritage, and serenity through living spaces, handcrafted art, and timeless design.
            </p>
            <p>
              From lush plants to sculpted wooden furniture, intricate sculptures, and bespoke décor, every creation we craft tells a story — a story of legacy, artistry, and the quiet grandeur of the natural world. We draw inspiration from organic textures, harmonious forms, and the enduring elegance of materials shaped by time.
            </p>
            <p>
              Our vision is to create more than just spaces — we curate experiences that embody a lifestyle of natural luxury. Each piece, each corner, and every detail invites a sense of calm, wonder, and connection to the earth. We blend nature, artistry, and comfort to design environments that feel alive, refined, and profoundly personal.
            </p>
            <p>
              Whether for a private home, a high-end retreat, or a brand seeking purpose-driven design, Into the Woods crafts living experiences where luxury meets authenticity, and heritage meets contemporary elegance.
            </p>
          </section>

          <Separator />

          <section className="space-y-4">
             <div className="flex items-center justify-center gap-3">
                <Leaf className="h-7 w-7 text-primary" />
                <h2 className="text-2xl md:text-3xl font-headline font-semibold text-primary text-center">The Mission</h2>
            </div>
            <div className="space-y-4 text-foreground/90 leading-relaxed">
                <p>
                    Our mission is to reconnect people with the raw beauty and quiet wisdom of nature — through plants, wooden crafts, furniture, sculptures, and thoughtfully designed spaces that celebrate legacy and natural luxury.
                </p>
                <p>
                    At Into the Woods, we believe design should awaken the senses and nurture the soul. Every handcrafted detail reflects our commitment to sustainability, artistry, and the timeless rhythm of the natural world.
                </p>
                <p>
                    We strive to inspire a lifestyle where nature, luxury, and heritage coexist harmoniously. From guiding new plant enthusiasts to curating refined interior experiences, we help our clients cultivate spaces and moments that thrive with life, elegance, and purpose.
                </p>
                <p>
                    Every leaf, every grain of wood, every sculpted form carries a story — a story of growth, artistry, and enduring beauty. Through our work, we aim to transform ordinary spaces into sanctuaries of inspiration, where natural luxury is not just seen but deeply felt.
                </p>
            </div>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
