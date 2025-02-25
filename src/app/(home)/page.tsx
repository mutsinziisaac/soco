import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";
import DownloadCTA from "./components/DownloadCTA";
import Footer from "./components/Footer";
import { getTweet } from "react-tweet/api";

export default async function Home() {
  const tweet1 = await getTweet("1892559239593312464").catch(() => null);
  const tweet2 = await getTweet("1892560347371852110").catch(() => null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Testimonials tweets={[tweet1, tweet2]} />
        <DownloadCTA />
      </main>
      <Footer />
    </div>
  );
}
