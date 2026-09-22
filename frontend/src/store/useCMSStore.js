import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { defaultContent } from '../data/defaultContent';
import { api } from '../lib/api';
import { useAuthStore } from './useAuthStore';

const SECTION_ENDPOINT = {
  hero: 'hero',
  about: 'about',
  overview: 'overview',
  products: 'products',
  solutions: 'solutions',
  supplyChain: 'supply-chain',
  distribution: 'distribution',
  whyUs: 'why-us',
  statsBand: 'stats-band',
  industries: 'industries',
  process: 'process',
  quality: 'quality',
  contact: 'contact',
  company: 'company',
  testimonials: 'testimonials',
  faq: 'faq',
  ourCompanies: 'our-companies',
  footer: 'footer',
  banners: 'banners',
  cta: 'cta',
  aboutScenes: 'about-scenes',
  eggTraders: 'egg-traders',
};

function isPlainObject(value) {
  return value && typeof value === 'object' && !Array.isArray(value);
}

function mergeCmsValue(defaultValue, incomingValue) {
  if (incomingValue === null || incomingValue === undefined) return defaultValue;
  const sameType = typeof defaultValue === typeof incomingValue
    && Array.isArray(defaultValue) === Array.isArray(incomingValue);
  if (!sameType) return defaultValue;

  if (Array.isArray(incomingValue)) {
    return incomingValue.map((item, index) => {
      const defaultItem = defaultValue[index];
      return isPlainObject(defaultItem) && isPlainObject(item)
        ? mergeCmsValue(defaultItem, item)
        : item;
    });
  }

  if (isPlainObject(incomingValue)) {
    const result = { ...defaultValue };
    for (const key of Object.keys(incomingValue)) {
      if (key.startsWith('update') || key === 'apiInitialized' || key === 'apiLoading') continue;
      result[key] = Object.prototype.hasOwnProperty.call(defaultValue, key)
        ? mergeCmsValue(defaultValue[key], incomingValue[key])
        : incomingValue[key];
    }
    return result;
  }

  return incomingValue;
}

function deepMerge(defaults, persisted) {
  return normalizeCmsState(mergeCmsValue(defaults, persisted));
}

const REQUIRED_EGG_TRADERS_HERO = {
  h1Line1: 'Your trusted',
  h1Highlight: 'egg marketplace',
  h1Line2: '',
};

const SIMPLIFIED_EGG_TRADERS_BODY =
  'Egg Traders connects verified poultry farms with commercial buyers through clear pricing information, quality details, and a simpler ordering process.';

const OFFICIAL_PHONE_DISPLAY = '+92 315 8266006';
const OFFICIAL_PHONE_PATTERN = /^\+?0?92[-\s]?0?937[-\s]?269601$|^0937[-\s]?269601$/;
const EGG_TRADERS_BANNER_TITLES = {
  about: 'About Us',
  products: 'Our Products',
  contact: 'Contact Us',
};

function normalizeCompanyAddress(value) {
  if (typeof value !== 'string') return value;
  const trimmed = value.trim();
  return trimmed
    .replace(/Opposite\s+Mardan\s+Press\s+Club[\s,]+Mardan[\s,]+KPK[\s,]*Pakistan/gi, 'Plot 11 F, Rashakai Special Economic Zone')
    .replace(/Opposite\s+Mardan\s+Press\s+Club/gi, 'Plot 11 F, Rashakai Special Economic Zone')
    .replace(/Plot\s*11\s*F\s*Rashakai\s*Special\s*Economic\s*zone/gi, 'Plot 11 F, Rashakai Special Economic Zone')
    .replace(/Plot\s*11\s*F,?\s*Rashakai\s*Special\s*Economic\s*Zone/gi, 'Plot 11 F, Rashakai Special Economic Zone');
}

function normalizeContactContent(contact = {}, options = {}) {
  if (!isPlainObject(contact)) return contact;
  const { preserveMapPin = false } = options;
  return {
    ...contact,
    info: normalizeContactInfoItems(contact.info, preserveMapPin),
  };
}

function normalizeContactInfoItems(info, preserveMapPin = false) {
  if (!Array.isArray(info)) return info;
  return info.map((item) => {
    if (!isPlainObject(item)) return item;
    const value = typeof item.value === 'string' ? item.value.trim() : item.value;
    if (item.icon === 'Phone' && typeof value === 'string' && OFFICIAL_PHONE_PATTERN.test(value)) {
      return { ...item, value: OFFICIAL_PHONE_DISPLAY };
    }
    if (item.icon === 'MapPin' && typeof value === 'string') {
      return { ...item, value: preserveMapPin ? value : normalizeCompanyAddress(value) };
    }
    return item;
  });
}

function normalizeEggTradersContent(eggTraders = {}) {
  const hero = isPlainObject(eggTraders.hero) ? eggTraders.hero : {};
  const body = typeof hero.body === 'string' ? hero.body : '';
  const needsSimpleBody = /specialized poultry and egg marketplace|real-time pricing|transparent quality scores|seamless procurement workflows/i.test(body);

  return {
    ...eggTraders,
    hero: {
      ...hero,
      ...REQUIRED_EGG_TRADERS_HERO,
      body: needsSimpleBody || !body.trim()
        ? SIMPLIFIED_EGG_TRADERS_BODY
        : body,
    },
    contact: normalizeContactContent(eggTraders.contact, { preserveMapPin: true }),
  };
}

function normalizeEggTradersBanners(banners = {}) {
  if (!isPlainObject(banners)) return banners;
  const result = { ...banners };
  for (const [key, title] of Object.entries(EGG_TRADERS_BANNER_TITLES)) {
    if (isPlainObject(result[key])) {
      result[key] = { ...result[key], title };
    }
  }
  if (isPlainObject(result.contact)) {
    result.contact = {
      ...result.contact,
      subtitle: 'Share your requirements and our team will respond within 2 business hours.',
    };
  }
  return result;
}

function normalizeBannersContent(banners = {}) {
  if (!isPlainObject(banners)) return banners;
  return {
    ...banners,
    eggTraders: normalizeEggTradersBanners(banners.eggTraders),
  };
}

const UPDATED_FOOTER_COPYRIGHT =
  '© 2026 M/S Yousafzai Agri Foods & Poultry Farms. All rights reserved.';

function normalizeFooterContent(footer = {}) {
  if (!isPlainObject(footer)) return footer;
  const copyright = typeof footer.copyright === 'string' ? footer.copyright : '';
  const normalized = copyright
    .replace(/Yousafzai Agro Foods/gi, 'Yousafzai Agri Foods')
    .replace(/Yousafzai Eggs Traders/gi, 'Yousafzai Agri Foods')
    .replace(/Agro Foods/gi, 'Agri Foods');
  return {
    ...footer,
    copyright: normalized || UPDATED_FOOTER_COPYRIGHT,
  };
}

function normalizeCompanyContent(company = {}) {
  if (!isPlainObject(company)) return company;
  const sub = typeof company.sub === 'string' ? company.sub : '';
  const tagline = typeof company.tagline === 'string' ? company.tagline : '';
  return {
    ...company,
    sub: /^Eggs Traders/i.test(sub) ? 'Agri Foods' : sub.replace(/Agro Foods/gi, 'Agri Foods'),
    tagline: tagline
      ? tagline.replace(/A trusted name in egg trading and poultry farming since 1960[^'"]*/gi,
          "From farm-fresh eggs to liquid egg processing — Yousafzai AGRI Foods has been a trusted partner in Pakistan's poultry industry since 1960.")
      : tagline,
  };
}

function normalizeChairmanContent(chairman = {}) {
  if (!isPlainObject(chairman)) return chairman;
  const name = typeof chairman.name === 'string' ? chairman.name : '';
  const quote = typeof chairman.quote === 'string' ? chairman.quote : '';
  const fixedQuote = quote
    .replace(/^\s*["""]+|["""]+\s*$/g, '')
    .trim()
    .replace(/\bsupply eggs\b/gi, 'supply liquid eggs');
  return {
    ...chairman,
    quote: fixedQuote || chairman.quote,
    name: name.replace(/Sana[-\s]?ullah/gi, 'Sanaullah') || 'Sanaullah',
  };
}

const MISSION_ITEMS_LIQUID = [
  'Supply fresh & hygienic liquid eggs',
  'Maintain strict quality control & food safety',
  'Expand into value-added liquid egg products',
  'Build long-term trust with clients & partners',
];

function normalizeMissionContent(mission = {}) {
  if (!isPlainObject(mission)) return mission;
  const items = Array.isArray(mission.items) ? mission.items : [];
  const fixedItems = items.map((item) => {
    if (typeof item !== 'string') return item;
    return item
      .replace(/\bSupply fresh\s*&\s*hygienic eggs\b/gi, 'Supply fresh & hygienic liquid eggs')
      .replace(/\bExpand into value-added egg products like liquid eggs\b/gi, 'Expand into value-added liquid egg products')
      .replace(/\bExpand into value-added egg products\b/gi, 'Expand into value-added liquid egg products');
  });
  // If items are empty or missing, use defaults
  return {
    ...mission,
    items: fixedItems.length ? fixedItems : MISSION_ITEMS_LIQUID,
  };
}

const ABOUT_HERO_SLIDES = [
  '/images/client-final/Process_line.webp',
  '/images/client-final/cold-storage-products.webp',
  '/images/client-final/whole-egg-liquid-product.webp',
];

function normalizeAboutScenesContent(aboutScenes = {}) {
  if (!isPlainObject(aboutScenes)) return aboutScenes;
  const vm = isPlainObject(aboutScenes.visionMission) ? aboutScenes.visionMission : {};
  const hero = isPlainObject(aboutScenes.hero) ? aboutScenes.hero : {};
  return {
    ...aboutScenes,
    hero: {
      ...hero,
      slides: ABOUT_HERO_SLIDES,
    },
    chairman: normalizeChairmanContent(aboutScenes.chairman),
    mission: normalizeMissionContent(aboutScenes.mission),
    visionMission: {
      ...vm,
      bgImage: '/images/client-final/Process_line.webp',
    },
  };
}

function normalizeProcessContent(process = []) {
  if (!Array.isArray(process)) return process;

  return process.map((item) => {
    if (!isPlainObject(item)) return item;
    const title = typeof item.title === 'string' ? item.title : '';
    const normalizedTitle = title.replace(/Candling\s*&\s*Grading/gi, 'Grading');
    return normalizedTitle !== title ? { ...item, title: normalizedTitle } : item;
  });
}

function normalizeProductsContent(products = {}) {
  if (!isPlainObject(products)) return products;
  const defaults = Array.isArray(defaultContent.products?.items) ? defaultContent.products.items : [];
  const currentItems = Array.isArray(products.items) ? products.items : [];
  const seen = new Set(currentItems.map((item) => (isPlainObject(item) && typeof item.name === 'string' ? item.name : '')));
  const missingDefaults = defaults.filter((item) => !(isPlainObject(item) && typeof item.name === 'string' && seen.has(item.name)));

  return {
    ...products,
    items: currentItems.length >= defaults.length ? currentItems : [...currentItems, ...missingDefaults],
  };
}

function normalizeOurCompaniesContent(ourCompanies = {}) {
  if (!isPlainObject(ourCompanies)) return ourCompanies;
  if (!Array.isArray(ourCompanies.companies)) return ourCompanies;

  return {
    ...ourCompanies,
    companies: ourCompanies.companies.map((company) => {
      if (isPlainObject(company) && company.id === 'egg-traders') {
        return { ...company, name: 'Yousafzai Egg Traders' };
      }
      return company;
    }),
  };
}

function normalizeAboutContent(about = {}) {
  if (!isPlainObject(about)) return about;
  const quote = typeof about.quote === 'string' ? about.quote : '';
  return {
    ...about,
    quote: quote.replace(/\bsupply eggs\b/gi, 'supply liquid eggs'),
  };
}

function normalizeCmsState(state) {
  if (!isPlainObject(state)) return state;
  return {
    ...state,
    about: normalizeAboutContent(state.about),
    contact: normalizeContactContent(state.contact),
    banners: normalizeBannersContent(state.banners),
    footer: normalizeFooterContent(state.footer),
    company: normalizeCompanyContent(state.company),
    aboutScenes: normalizeAboutScenesContent(state.aboutScenes),
    process: normalizeProcessContent(state.process),
    products: normalizeProductsContent(state.products),
    ourCompanies: normalizeOurCompaniesContent(state.ourCompanies),
    eggTraders: isPlainObject(state.eggTraders)
      ? normalizeEggTradersContent(state.eggTraders)
      : state.eggTraders,
  };
}

const saveTimers = {};
let saveRequestId = 0;

const SAVE_DELAY = 500;

function setSaveState(patch) {
  useCMSStore.setState(patch);
}

function getFriendlySaveError(err) {
  if (err?.status === 401 || err?.status === 403) {
    return 'Your session has expired. Please sign in again.';
  }
  return "Changes couldn't be saved. We'll try again when you make another edit.";
}

async function saveSectionNow(key, requestId) {
  const ep = SECTION_ENDPOINT[key];
  if (!ep) return;
  if (requestId !== useCMSStore.getState().saveRequestId) return;
  const state = useCMSStore.getState();
  setSaveState({
    saveStatus: 'saving',
    saveMessage: 'Saving...',
    saveError: null,
    lastSavedSection: key,
  });
  try {
    await api.updateCmsSection(ep, state[key]);
    if (requestId !== useCMSStore.getState().saveRequestId) return;
    setSaveState({
      saveStatus: 'saved',
      saveMessage: 'Changes saved',
      saveError: null,
      lastSavedAt: Date.now(),
      lastSavedSection: key,
    });
  } catch (err) {
    console.warn(`Failed to save ${key} to API:`, err.message);
    if (requestId !== useCMSStore.getState().saveRequestId) return;
    const sessionExpired = err?.status === 401 || err?.status === 403;
    const message = getFriendlySaveError(err);
    setSaveState({
      saveStatus: sessionExpired ? 'session-expired' : 'error',
      saveMessage: message,
      saveError: message,
      lastSavedSection: key,
    });
    if (sessionExpired) {
      useAuthStore.getState().setSessionMessage?.(message);
      window.setTimeout(() => {
        useAuthStore.getState().logout();
      }, 1400);
    }
  }
}

function scheduleSaveSection(key) {
  const ep = SECTION_ENDPOINT[key];
  if (!ep) return;
  if (saveTimers[key]) window.clearTimeout(saveTimers[key]);
  const requestId = saveRequestId + 1;
  saveRequestId = requestId;
  setSaveState({
    saveStatus: 'dirty',
    saveMessage: 'Unsaved changes',
    saveError: null,
    saveRequestId: requestId,
    lastSavedSection: key,
  });
  saveTimers[key] = window.setTimeout(() => {
    saveSectionNow(key, requestId);
  }, SAVE_DELAY);
}

export const useCMSStore = create(
  persist(
    (set, get) => ({
      ...defaultContent,
      apiInitialized: false,
      apiLoading: false,
      saveStatus: 'idle',
      saveMessage: 'Changes save automatically',
      saveError: null,
      saveRequestId: 0,
      lastSavedAt: null,
      lastSavedSection: null,

      initFromApi: async () => {
        if (get().apiInitialized || get().apiLoading) return;
        set({ apiLoading: true });
        try {
          const raw = await api.getCmsAll();
          const data = raw.data || raw;
          const merged = { ...defaultContent };
          for (const key of Object.keys(SECTION_ENDPOINT)) {
            const pv = data[key] ?? data[SECTION_ENDPOINT[key]];
            const dv = merged[key];
            merged[key] = mergeCmsValue(dv, pv);
          }
          set({ ...normalizeCmsState(merged), apiInitialized: true, apiLoading: false });
        } catch {
          set({ apiInitialized: true, apiLoading: false });
        }
      },

      updateHero: (data) => {
        set((s) => ({ hero: { ...s.hero, ...data } }));
        scheduleSaveSection('hero');
      },
      updateAbout: (data) => {
        set((s) => ({ about: { ...s.about, ...data } }));
        scheduleSaveSection('about');
      },
      updateProducts: (data) => {
        set((s) => ({ products: { ...s.products, ...data } }));
        scheduleSaveSection('products');
      },
      updateSolutions: (data) => {
        set((s) => ({ solutions: { ...s.solutions, ...data } }));
        scheduleSaveSection('solutions');
      },
      updateSupplyChain: (data) => {
        set((s) => ({ supplyChain: { ...s.supplyChain, ...data } }));
        scheduleSaveSection('supplyChain');
      },
      updateDistribution: (data) => {
        set((s) => ({ distribution: { ...s.distribution, ...data } }));
        scheduleSaveSection('distribution');
      },
      updateWhyUs: (data) => {
        set((s) => ({ whyUs: { ...s.whyUs, ...data } }));
        scheduleSaveSection('whyUs');
      },
      updateStatsBand: (data) => {
        set((s) => ({ statsBand: { ...s.statsBand, ...data } }));
        scheduleSaveSection('statsBand');
      },
      updateIndustries: (industries) => {
        set({ industries });
        scheduleSaveSection('industries');
      },
      updateProcess: (process) => {
        set({ process });
        scheduleSaveSection('process');
      },
      updateOverview: (data) => {
        set((s) => ({ overview: { ...s.overview, ...data } }));
        scheduleSaveSection('overview');
      },
      updateQuality: (data) => {
        set((s) => ({ quality: { ...s.quality, ...data } }));
        scheduleSaveSection('quality');
      },
      updateContact: (data) => {
        set((s) => ({ contact: normalizeContactContent({ ...s.contact, ...data }) }));
        scheduleSaveSection('contact');
      },
      updateFooter: (data) => {
        set((s) => ({ footer: { ...s.footer, ...data } }));
        scheduleSaveSection('footer');
      },
      updateBanners: (data) => {
        set((s) => ({ banners: normalizeBannersContent({ ...s.banners, ...data }) }));
        scheduleSaveSection('banners');
      },
      updateCta: (data) => {
        set((s) => ({ cta: { ...s.cta, ...data } }));
        scheduleSaveSection('cta');
      },
      updateAboutScenes: (data) => {
        set((s) => ({ aboutScenes: { ...s.aboutScenes, ...data } }));
        scheduleSaveSection('aboutScenes');
      },
      updateCompany: (data) => {
        set((s) => ({ company: { ...s.company, ...data } }));
        scheduleSaveSection('company');
      },
      updateTestimonials: (testimonials) => {
        set({ testimonials });
        scheduleSaveSection('testimonials');
      },
      updateFaq: (faq) => {
        set({ faq });
        scheduleSaveSection('faq');
      },
      updateTeam: (team) => {
        set((s) => ({ about: { ...s.about, team } }));
        scheduleSaveSection('about');
      },
      updateCertifications: (certs) => {
        set((s) => ({ quality: { ...s.quality, certs } }));
        scheduleSaveSection('quality');
      },
      updateProductItems: (items) => {
        set((s) => ({ products: { ...s.products, items } }));
        scheduleSaveSection('products');
      },
      updateProductSpecs: (specs) => {
        set((s) => ({ products: { ...s.products, specs } }));
        scheduleSaveSection('products');
      },
      updateOurCompanies: (data) => {
        set((s) => ({ ourCompanies: { ...s.ourCompanies, ...data } }));
        scheduleSaveSection('ourCompanies');
      },
      updateEggTraders: (data) => {
        set((s) => ({ eggTraders: normalizeEggTradersContent({ ...s.eggTraders, ...data }) }));
        scheduleSaveSection('eggTraders');
      },
    }),
    {
      name: 'yousafzai-cms',
      storage: createJSONStorage(() => localStorage),
      merge: (persisted, current) => deepMerge(current, persisted),
      partialize: (state) => {
        const {
          apiInitialized: _apiInitialized,
          apiLoading: _apiLoading,
          saveStatus: _saveStatus,
          saveMessage: _saveMessage,
          saveError: _saveError,
          saveRequestId: _saveRequestId,
          lastSavedAt: _lastSavedAt,
          lastSavedSection: _lastSavedSection,
          ...rest
        } = state;
        return rest;
      },
    }
  )
);
