import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Inter } from 'next/font/google';
import { FirebaseClientProvider } from '@/firebase';
import { ThemeProvider } from '@/context/ThemeContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'TraceRight.ai',
  description: 'An intelligent supply chain management platform.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ThemeProvider>
        <body className={`${inter.variable} font-sans antialiased`}>
            <FirebaseClientProvider>
              {children}
              <Toaster />
            </FirebaseClientProvider>
        </body>
      </ThemeProvider>
    </html>
  );
}
