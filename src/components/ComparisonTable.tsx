
import { Check, X, Minus, Leaf, Flower, Sprout } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const comparisonData = [
    {
        feature: 'Plant Quality',
        nursery: { text: 'Poor health; pruned to hide problems', icon: <X className="text-destructive mx-auto" /> },
        us: { text: 'The best; MSPA+* plants only', icon: <Check className="text-green-600 mx-auto" /> },
        others: { text: 'Inconsistent', icon: <X className="text-destructive mx-auto" /> },
    },
    {
        feature: 'Pests',
        nursery: { text: 'Almost always', icon: <X className="text-destructive mx-auto" /> },
        us: { text: 'Triple-checked', icon: <Check className="text-green-600 mx-auto" /> },
        others: { text: 'Coin-toss', icon: <Minus className="text-muted-foreground mx-auto" /> },
    },
    {
        feature: 'Repotting',
        nursery: { text: 'Immediately needed', icon: <X className="text-destructive mx-auto" /> },
        us: { text: 'Fresh soil; not needed', icon: <Check className="text-green-600 mx-auto" /> },
        others: { text: 'Varies', icon: <Minus className="text-muted-foreground mx-auto" /> },
    },
    {
        feature: 'Growing Conditions',
        nursery: { text: 'Outdoor grown; will stress indoors', icon: <X className="text-destructive mx-auto" /> },
        us: { text: 'Specialty-grown & ready for indoors', icon: <Check className="text-green-600 mx-auto" /> },
        others: { text: 'Mix of grower standards', icon: <X className="text-destructive mx-auto" /> },
    },
    {
        feature: 'After-Sale Support',
        nursery: { text: 'None', icon: <X className="text-destructive mx-auto" /> },
        us: { text: 'WhatsApp; SOS calls', icon: <Check className="text-green-600 mx-auto" /> },
        others: { text: 'Email only', icon: <X className="text-destructive mx-auto" /> },
    },
    {
        feature: 'Guarantee',
        nursery: { text: 'No refund', icon: <X className="text-destructive mx-auto" /> },
        us: { text: '14-day full refund', icon: <Check className="text-green-600 mx-auto" /> },
        others: { text: 'No refund', icon: <X className="text-destructive mx-auto" /> },
    },
    {
        feature: 'Pots',
        nursery: { text: 'Low quality; meh', icon: <X className="text-destructive mx-auto" /> },
        us: { text: 'Beautiful and made by us', icon: <Check className="text-green-600 mx-auto" /> },
        others: { text: 'Overpriced', icon: <X className="text-destructive mx-auto" /> },
    },
    {
        feature: 'Price',
        nursery: { text: '$', icon: null },
        us: { text: '$$', icon: null },
        others: { text: '$$$$$', icon: null },
    },
];

const ColumnHeader = ({ icon, title, image }: { icon?: React.ReactNode, title: string, image?: string }) => (
    <div className="flex flex-col items-center gap-4 py-4 text-center">
        {image ? (
            <div className="relative h-20 w-20">
                <Image src={image} alt={title} width={80} height={80} className="object-contain" data-ai-hint="plant pot"/>
            </div>
        ) : (
            <div className="h-20 w-20 flex items-center justify-center">{icon}</div>
        )}
        <h4 className="font-headline font-semibold text-primary">{title}</h4>
    </div>
);

export function ComparisonTable() {
    return (
        <section className="bg-background py-16 md:py-24">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <h2 className="font-headline text-4xl md:text-5xl font-bold text-primary mb-4">
                        Us vs Regrets
                    </h2>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                        No over-pruning, root-rotting, or pest-hiding. Just 100% high-quality plants from the world's best growers.
                    </p>
                </div>
                
                {/* Desktop View: Table */}
                <div className="hidden lg:block">
                    <div className="grid grid-cols-4 border-t border-dashed">
                        {/* Empty cell for alignment */}
                        <div className="border-r border-dashed"></div>

                        {/* Headers */}
                        <div className="border-r border-dashed">
                            <ColumnHeader icon={<Flower size={48} className="text-muted-foreground" />} title="Plant Nurseries" />
                        </div>
                        <div className="bg-green-50 rounded-lg border-r border-dashed">
                            <ColumnHeader image="/grey.png" title="Into The Woods" />
                        </div>
                        <div>
                            <ColumnHeader icon={<Sprout size={48} className="text-muted-foreground" />} title="Others" />
                        </div>

                        {/* Data Rows */}
                        {comparisonData.map((row) => (
                            <React.Fragment key={row.feature}>
                                <div className="border-t border-dashed border-r flex items-center p-4">
                                    <h5 className="font-semibold text-foreground/80">{row.feature}</h5>
                                </div>
                                <div className="border-t border-dashed border-r text-center p-4">
                                    {row.nursery.icon}
                                    <p className="text-sm text-muted-foreground mt-1">{row.nursery.text}</p>
                                </div>
                                <div className="border-t border-dashed border-r bg-green-50 text-center p-4">
                                    {row.us.icon}
                                    <p className="text-sm text-primary font-medium mt-1">{row.us.text}</p>
                                </div>
                                <div className="border-t border-dashed text-center p-4">
                                    {row.others.icon}
                                    <p className="text-sm text-muted-foreground mt-1">{row.others.text}</p>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Mobile View: List */}
                <div className="block lg:hidden space-y-8">
                    {comparisonData.map(row => (
                        <div key={row.feature} className="border rounded-lg p-4">
                            <h4 className="text-lg font-headline font-semibold text-primary mb-4 text-center">{row.feature}</h4>
                            <div className="grid grid-cols-1 gap-4 text-center">
                                <div className="border-b pb-4">
                                    <h5 className="font-semibold text-muted-foreground mb-2">Plant Nurseries</h5>
                                    {row.nursery.icon}
                                    <p className="text-sm text-muted-foreground mt-1">{row.nursery.text}</p>
                                </div>
                                <div className="border-b pb-4 bg-primary/5 p-4 rounded-md">
                                    <h5 className="font-semibold text-primary mb-2">Into The Woods</h5>
                                     {row.us.icon}
                                     <p className="text-sm text-primary font-medium mt-1">{row.us.text}</p>
                                </div>
                                <div>
                                    <h5 className="font-semibold text-muted-foreground mb-2">Others</h5>
                                    {row.others.icon}
                                    <p className="text-sm text-muted-foreground mt-1">{row.others.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                 <div className="mt-8 text-center text-xs text-muted-foreground max-w-2xl mx-auto">
                    <p>*MSPA+ is the highest quality grade used by Dutch growers. Plants rated MSPA+ are determined to be healthy, visually attractive, and free from pests & diseases.</p>
                </div>
            </div>
        </section>
    );
}
