import React from 'react';
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
