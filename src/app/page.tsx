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
import { getSiteSettings, getHomepageSection, getAllProducts, getVisionMission, getWhyUsItems, getWhoWeServe, getPilotProgram, getContactInfo } from '@/lib/website-data';

export const dynamic = 'force-dynamic';

export default async function Home() {
  // Fetch all data from Supabase
  const [
    settings,
    heroSection,
    aboutSection,
    products,
    visionMission,
    whyUsItems,
    whoWeServeItems,
    pilotProgram,
    contactInfo,
  ] = await Promise.all([
    getSiteSettings(),
    getHomepageSection('hero'),
    getHomepageSection('about'),
    getAllProducts(),
    getVisionMission(),
    getWhyUsItems(),
    getWhoWeServe(),
    getPilotProgram(),
    getContactInfo(),
  ]);

  // Parse hero content
  const heroContent = heroSection?.content as { cta_primary?: string; cta_secondary?: string } | null;
  
  // Parse about content
  const aboutContent = aboutSection?.content as { description?: string } | null;

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero 
        title={heroSection?.title || undefined}
        subtitle={heroSection?.subtitle || undefined}
        ctaPrimary={heroContent?.cta_primary}
        ctaSecondary={heroContent?.cta_secondary}
      />
      <About 
        title={aboutSection?.subtitle || undefined}
        description={aboutContent?.description}
      />
      <Products products={products} />
      <WhyUs items={whyUsItems} />
      <WhoWeServe items={whoWeServeItems} />
      <Vision items={visionMission} />
      <PilotProgram data={pilotProgram} />
      <ContactForm contactInfo={contactInfo} />
      <Footer contactInfo={contactInfo} settings={settings} />
    </main>
  );
}