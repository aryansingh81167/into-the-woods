
'use client';

import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface LogoProps {
    width?: number;
    height?: number;
    className?: string;
}

export const Logo = ({ width = 100, height = 100, className }: LogoProps) => {
    const pathname = usePathname();
    // This logic is simplified to always show the inque logo for now to avoid server render issues
    const isMarketplace = pathname.startsWith('/products');

    const logoSrc = '/inque-logo.svg';
    const logoAlt = 'INQUE Logo';

    return (
        <Image 
            src={logoSrc}
            alt={logoAlt}
            width={width}
            height={height}
            className={className}
            data-ai-id="logo"
            priority
        />
    );
};
