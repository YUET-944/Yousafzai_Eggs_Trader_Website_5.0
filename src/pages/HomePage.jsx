import HeroSection from '../components/HeroSection';
import SupplyChainSection from '../components/SupplyChainJourney/SupplyChainSection';
import SupplyChainControlCenter from '../components/SupplyChainControlCenter';
import CTASection from '../components/CTASection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <SupplyChainSection />
      <SupplyChainControlCenter />
      <CTASection />
    </>
  );
}
