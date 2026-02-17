import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export const metadata = {
  title: "Pricing — SpriteForge",
  description: "Choose the right plan for your game development needs.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ minHeight: "calc(100vh - 120px)", paddingTop: "60px" }}>
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
