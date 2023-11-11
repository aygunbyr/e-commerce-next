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
      <body className={inter.className}>
        <div className="flex min-h-screen flex-col bg-gray-50 font-inter">
          <ClientProvider>
            <Header />
            <main className="container mb-20 flex-1 px-1 text-gray-900 max-xl:w-96">
              {children}
            </main>
            <Footer />
          </ClientProvider>
        </div>
      </body>
    </html>
  );
}
