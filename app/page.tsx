import Bio from "@/components/Bio";
import Links from "@/components/Links";
import PortfolioSection from "@/components/PortfolioSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-background-green">
      <Bio />
      <PortfolioSection />
      <Links />
    </main>
  );
}
