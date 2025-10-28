import type { Metadata } from 'next';
import { Poppins, Nunito_Sans } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-heading'
});

const nunitoSans = Nunito_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-body'
});

export const metadata: Metadata = {
  title: 'Beauty Marketplace',
  description: 'Your beauty services marketplace',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${nunitoSans.variable}`}>
      <body className="font-body">
        {children}
      </body>
    </html>
  );
}