import '@/styles/swiper.css'; 
import './globals.css';
import { ThemeProvider } from '@/context/ThemeContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LiveTicker from '@/components/LiveTicker';

export const metadata = {
  title: 'All Sports World — FIFA World Cup 2026',
  description: 'Your premier destination for FIFA World Cup 2026 coverage, live scores, team news, match schedules, and stadium guides.',
  keywords: 'World Cup 2026, FIFA, football, soccer, matches, teams, stadiums',
  openGraph: {
    title: 'All Sports World — FIFA World Cup 2026',
    description: 'Premium sports media platform covering the biggest event in football.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-bgPrimary text-textWhite antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Navbar />
          <LiveTicker />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
