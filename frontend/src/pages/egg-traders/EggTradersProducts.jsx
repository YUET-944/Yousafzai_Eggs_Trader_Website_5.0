import { useCMSStore } from '../../store/useCMSStore';
import ProductsSection from '../../components/ProductsSection';
import EggTradersPageBanner from '../../components/egg-traders/EggTradersPageBanner';

const HERO_IMAGE = '/images/white-eggs-product.jpg';

export default function EggTradersProducts() {
  const banner = useCMSStore((s) => s.banners?.eggTraders?.products);

  return (
    <>
      <EggTradersPageBanner
        title={banner?.title || 'Products & Grades'}
        subtitle={banner?.subtitle || 'Compare available egg products, formats, and grade references for commercial supply.'}
        image={HERO_IMAGE}
        imagePosition="center 64%"
      />
      <ProductsSection quotePath="/egg-traders/contact" />
    </>
  );
}
