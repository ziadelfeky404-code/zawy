import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Products } from '@/components/Products';
import { WhyUs } from '@/components/WhyUs';
import { WhoWeServe } from '@/components/WhoWeServe';
import { Vision } from '@/components/Vision';
import { PilotProgram } from '@/components/PilotProgram';
import { ContactForm } from '@/components/ContactForm';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <WhyUs />
      <WhoWeServe />
      <Vision />
      <PilotProgram />
      <ContactForm />
      <Footer />
    </main>
  );
}
