import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { StoryProvider } from './motion/StoryEngine';
import GlobalEnvironment from './motion/GlobalEnvironment';
import Layout from './components/Layout';
import EggTradersLayout from './components/egg-traders/EggTradersLayout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import OurJourneyPage from './pages/OurJourneyPage';
import ProductsPage from './pages/ProductsPage';
import ProcessPage from './pages/ProcessPage';
import QualityPage from './pages/QualityPage';
import ContactPage from './pages/ContactPage';
import SolutionsPage from './pages/SolutionsPage';
import OurTeamPage from './pages/OurTeamPage';
import CareersPage from './pages/CareersPage';
import CareerDetailPage from './pages/CareerDetailPage';
import EggTradersPage from './pages/EggTradersPage';
import EggTradersAbout from './pages/egg-traders/EggTradersAbout';
import EggTradersProducts from './pages/egg-traders/EggTradersProducts';
import EggTradersProcess from './pages/egg-traders/EggTradersProcess';
import EggTradersQuality from './pages/egg-traders/EggTradersQuality';
import EggTradersSolutions from './pages/egg-traders/EggTradersSolutions';
import EggTradersContact from './pages/egg-traders/EggTradersContact';
import AdminLogin from './pages/admin/AdminLogin';
import AdminApp from './pages/admin/AdminApp';
import { useCMSStore } from './store/useCMSStore';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const initFromApi = useCMSStore((s) => s.initFromApi);

  useEffect(() => {
    initFromApi();
  }, [initFromApi]);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // https://www.desmos.com/calculator/brs54l4xou
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      window.__lenis = null;
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <BrowserRouter>
      <StoryProvider>
        <GlobalEnvironment>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/our-journey" element={<OurJourneyPage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/solutions" element={<SolutionsPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/quality" element={<QualityPage />} />
              <Route path="/our-team" element={<OurTeamPage />} />
              <Route path="/careers" element={<CareersPage />} />
              <Route path="/careers/:slug" element={<CareerDetailPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Route>
            <Route element={<EggTradersLayout />}>
              <Route path="/egg-traders" element={<EggTradersPage />} />
              <Route path="/egg-traders/about" element={<EggTradersAbout />} />
              <Route path="/egg-traders/products" element={<EggTradersProducts />} />
              <Route path="/egg-traders/solutions" element={<EggTradersSolutions />} />
              <Route path="/egg-traders/process" element={<EggTradersProcess />} />
              <Route path="/egg-traders/quality" element={<EggTradersQuality />} />
              <Route path="/egg-traders/contact" element={<EggTradersContact />} />
            </Route>
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminApp />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </GlobalEnvironment>
      </StoryProvider>
    </BrowserRouter>
  );
}
