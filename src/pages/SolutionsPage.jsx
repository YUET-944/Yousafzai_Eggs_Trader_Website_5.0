import PageBanner from '../components/PageBanner';
import TradingSolutionsSection from '../components/TradingSolutionsSection';
import { useCMSStore } from '../store/useCMSStore';

export default function SolutionsPage() {
  const banner = useCMSStore((s) => s.banners?.main?.solutions);

  return (
    <>
      <PageBanner title={banner?.title || 'Solutions'} subtitle={banner?.subtitle || ''} slideshowImages={banner?.images || null} />
      <TradingSolutionsSection />
    </>
  );
}
