import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { defaultContent } from '../data/defaultContent';

import HeroSection from '../components/HeroSection';
import ProductsSection from '../components/ProductsSection';
import WhyLiquidEggSection from '../components/WhyLiquidEggSection';
import SupplyChainSection from '../components/SupplyChainJourney/SupplyChainSection';
import QualitySection from '../components/QualitySection';
import IndustriesSection from '../components/IndustriesSection';
import ApplicationsSection from '../components/ApplicationsSection';
import AboutSection from '../components/AboutSection';
import PackagingSection from '../components/PackagingSection';
import LogisticsSection from '../components/LogisticsSection';
import FAQSection from '../components/FAQSection';
import ContactSection from '../components/ContactSection';

export default function HomePage() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  const { 
    hero, 
    websiteImages, 
    products, 
    whyLiquidEgg, 
    quality, 
    industries, 
    applications, 
    about, 
    packaging, 
    logistics, 
    faq, 
    contact 
  } = defaultContent;

  return (
    <>
      <HeroSection data={hero} websiteImages={websiteImages} />
      <ProductsSection data={products} websiteImages={websiteImages} />
      <WhyLiquidEggSection data={whyLiquidEgg} />
      <SupplyChainSection />
      <QualitySection data={quality} />
      <IndustriesSection data={industries} websiteImages={websiteImages} />
      <ApplicationsSection data={applications} />
      <AboutSection data={about} />
      <PackagingSection data={packaging} />
      <LogisticsSection data={logistics} />
      <FAQSection data={faq} />
      <ContactSection data={contact} />
    </>
  );
}
