import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { QueryProvider } from '@/store/QueryProvider';
import { ReduxProvider } from '@/store/ReduxProvider';
import './globals.scss';
import styles from './layout.module.scss';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  ),
  title: {
    default: 'Starsoft NFT Marketplace',
    template: '%s | Starsoft NFT',
  },
  description:
    'Marketplace de NFTs com carrinho de compras. Explore, compre e gerencie seus itens digitais.',
  keywords: ['NFT', 'marketplace', 'Ethereum', 'Web3', 'Starsoft'],
  authors: [{ name: 'Starsoft' }],
  openGraph: {
    type: 'website',
    locale: 'pt_BR',
    siteName: 'Starsoft NFT Marketplace',
    title: 'Starsoft NFT Marketplace',
    description: 'Marketplace de NFTs com carrinho de compras.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Starsoft NFT Marketplace',
    description: 'Marketplace de NFTs com carrinho de compras.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={poppins.variable} style={{ height: '100%' }}>
      <body>
        <a href="#main-content" className={styles.skipLink}>
          Ir para o conteúdo
        </a>
        <QueryProvider>
          <ReduxProvider>{children}</ReduxProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
