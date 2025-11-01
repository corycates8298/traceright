
import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { FirebaseClientProvider } from '@/firebase/client-provider';
import { ThemeProvider } from '@/context/ThemeContext';
import { FeatureFlagsProvider } from '@/components/FeatureFlagsContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'TraceRight.ai | Supply Chain Command',
  description: 'An intelligent supply chain management platform.',
  icons: null,
};

export const viewport: Viewport = {
  themeColor: 'black',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <FirebaseClientProvider>
          <FeatureFlagsProvider>
            <ThemeProvider>
              {children}
              <Toaster />
            </ThemeProvider>
          </FeatureFlagsProvider>
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
