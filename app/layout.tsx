import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Chenghao “Tommy” Jiang — 3D Vision & Game Design',
  description: 'The personal portfolio of Chenghao “Tommy” Jiang, a 3D vision researcher and game designer working across spatial intelligence, visual localization, and playable worlds.',
  icons: {
    icon: [
      { url: '/favicon.ico?v=tommy-8bit-1', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon-32x32.png?v=tommy-8bit-1', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png?v=tommy-8bit-1', sizes: '16x16', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png?v=tommy-8bit-1', sizes: '180x180', type: 'image/png' }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
