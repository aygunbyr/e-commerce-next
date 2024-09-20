import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import 'react-toastify/dist/ReactToastify.css';

import './globals.css';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ClientProvider from '@/components/client-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'E-Commerce App',
  description: 'E-Commerce Web site developed for educational purposes.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100 text-gray-900`}>
        <ClientProvider>
          <Header />
          <main className="container mb-4 min-h-screen max-xl:w-96">
            {children}
          </main>
          <Footer />
        </ClientProvider>
      </body>
    </html>
  );
}
