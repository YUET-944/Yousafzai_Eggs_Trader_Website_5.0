import PageBanner from '../components/PageBanner';
import TradingSolutionsSection from '../components/TradingSolutionsSection';
import { useCMSStore } from '../store/useCMSStore';

export default function SolutionsPage() {
  const banner = useCMSStore((s) => s.banners?.main?.solutions);
  const heroImages = banner?.images?.length ? banner.images : ['/images/placeholders/hospitality-catering.jpg'];

  return (
    <>
      <PageBanner title={banner?.title || 'Solutions'} subtitle={banner?.subtitle || ''} slideshowImages={heroImages} />
      <TradingSolutionsSection />
    </>
  );
}
