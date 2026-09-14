import { useEffect, useRef } from 'react';
import { teamData } from '../data/teamData';
import PageBanner from '../components/PageBanner';

const TEAM_HERO_IMAGE = '/images/client-final/processing-line-product.png';

/* ─────────────────────────────────────────────
   Organogram node — uses data-level for stagger
───────────────────────────────────────────── */
function TeamNode({ node, level = 0 }) {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;
  const isRoleOnly = !node.name;

  return (
    <div className="org-node-wrapper" data-level={level}>
      <div className={`org-card${isRoleOnly ? ' org-card-role-only' : ''}`} style={{ '--stagger': level * 0.12 + 's' }}>
        <div className="org-card-accent" />
        {isRoleOnly ? (
          <div className="org-card-placeholder-role">{node.role || 'Role title'}</div>
        ) : (
          <>
            <div className="org-card-name">{node.name}</div>
            <div className="org-card-role">{node.role || 'Role title'}</div>
          </>
        )}
      </div>

      {hasChildren && (
        <div className="org-children">
          {node.children.map((child) => (
            <TeamNode key={child.id || child.name} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Page
───────────────────────────────────────────── */
export default function OurTeamPage() {
  const orgRef = useRef(null);

  /* Intersection Observer — trigger .org-in on the section */
  useEffect(() => {
    const el = orgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('org-in');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="our-team-page">

      {/* ── HERO ── */}
      <div className="our-team-hero-wrap">
        <PageBanner
          title="Our Team"
          subtitle="Meet the experienced executives and agricultural specialists driving Yousafzai Eggs Traders."
          slideshowImages={[TEAM_HERO_IMAGE]}
          hideBreadcrumb
          fullScreen
        />
      </div>

      {/* ── ORGANOGRAM ── */}
      <section className="org-section" aria-label="Organisation chart" ref={orgRef}>
        <div className="org-section-head">
          <h2 className="org-section-title">Our Leadership Hierarchy</h2>
          <p className="org-section-sub">A dedicated hierarchy committed to quality, operations, and growth.</p>
        </div>
        <div className="org-tree-scroll">
          <div className="org-tree">
            <TeamNode node={teamData} level={0} />
          </div>
        </div>
      </section>

      <style>{`
        /* ─── PAGE BASE ─── */
        .our-team-page {
          background: #fbf7f0;
          color: #111111;
        }

        /* ─── HERO OVERRIDES (match Products/Quality/Process pattern) ─── */
        .our-team-hero-wrap .page-hero {
          box-sizing: border-box;
          min-height: 100svh;
          padding: clamp(96px, 13svh, 132px) 0 clamp(42px, 8svh, 72px);
          background-color: #2C4724;
        }

        @supports (height: 100dvh) {
          .our-team-hero-wrap .page-hero {
            min-height: 100dvh;
          }
        }

        .our-team-hero-wrap .page-hero > .container {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Make image fully visible and well-cropped */
        .our-team-hero-wrap .banner-slideshow .slide-img {
          background-size: cover;
          background-repeat: no-repeat;
          background-position: center 58%;
          filter: saturate(94%) contrast(106%);
        }

        .our-team-hero-wrap .banner-slideshow .slide-img.active {
          opacity: 1;
        }

        /* Dark overlay so white text reads clearly */
        .our-team-hero-wrap .page-hero-bg {
          background:
            linear-gradient(180deg, rgba(17,17,17,0.5) 0%, rgba(17,17,17,0.34) 46%, rgba(17,17,17,0.58) 100%),
            radial-gradient(90% 80% at 50% 35%, rgba(222,81,10,0.18) 0%, rgba(17,17,17,0.14) 52%, rgba(17,17,17,0.5) 100%);
        }

        .our-team-hero-wrap .page-hero-bg::before {
          opacity: 0.12;
        }

        /* Bottom fade into the organogram section */
        .our-team-hero-wrap .banner-bottom-fade {
          height: 64px;
          background: linear-gradient(to bottom, rgba(251,247,240,0), rgba(251,247,240,0.72));
        }

        /* White text treatment */
        .our-team-hero-wrap .page-hero-title {
          color: #ffffff;
          background: none;
          -webkit-text-fill-color: #ffffff;
          text-shadow: 0 16px 38px rgba(0,0,0,0.42);
          filter: none;
          font-size: clamp(3rem, 6vw, 5rem);
        }

        .our-team-hero-wrap .page-hero-sub {
          color: rgba(255,255,255,0.88);
          text-shadow: 0 8px 24px rgba(0,0,0,0.40);
        }

        @media (max-width: 860px) {
          .our-team-hero-wrap .page-hero {
            min-height: 100svh;
            padding: clamp(86px, 12svh, 112px) 0 clamp(34px, 7svh, 54px);
          }

          @supports (height: 100dvh) {
            .our-team-hero-wrap .page-hero {
              min-height: 100dvh;
            }
          }

          .our-team-hero-wrap .page-hero-title {
            font-size: clamp(2.4rem, 10vw, 3.2rem);
            margin-bottom: 16px;
          }

          .our-team-hero-wrap .banner-slideshow .slide-img {
            background-position: center 36%;
          }
        }

        /* ─── ORGANOGRAM SECTION ─── */
        .org-section {
          padding: 72px 0 120px;
        }

        .org-section-head {
          text-align: center;
          padding: 0 24px;
          margin-bottom: 56px;
        }

        .org-section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(1.6rem, 3vw, 2.2rem);
          font-weight: 700;
          color: #111111;
          margin: 0 0 12px;
          letter-spacing: -0.02em;
        }

        .org-section-sub {
          font-size: 1rem;
          color: rgba(17,17,17,0.60);
          max-width: 56ch;
          margin: 0 auto;
          line-height: 1.65;
        }

        /* ─── TREE SCROLL WRAPPER
             overflow-x: auto  → allows horizontal scroll on very small screens
             NO overflow-y     → height grows naturally with content
             This fixes the internal vertical scrollbar issue.
        ─── */
        .org-tree-scroll {
          width: 100%;
          overflow: visible;
          padding: 18px clamp(16px, 3vw, 32px) 72px;
          box-sizing: border-box;
        }

        .org-tree-scroll::-webkit-scrollbar {
          height: 5px;
        }

        .org-tree-scroll::-webkit-scrollbar-track {
          background: rgba(17,17,17,0.05);
          border-radius: 99px;
        }

        .org-tree-scroll::-webkit-scrollbar-thumb {
          background: rgba(222,81,10,0.28);
          border-radius: 99px;
        }

        /* ─── TREE ROOT ─── */
        .org-tree {
          display: flex;
          justify-content: center;
          width: min(100%, 1240px);
          margin: 0 auto;
          padding: 8px 0;
        }

        /* ─── NODE WRAPPER ─── */
        .org-node-wrapper {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          min-width: 0;
          padding: 0 clamp(6px, 0.75vw, 10px);
        }

        .org-tree > .org-node-wrapper {
          width: 100%;
          padding: 0;
        }

        .org-tree > .org-node-wrapper > .org-children {
          width: 100%;
        }

        .org-tree > .org-node-wrapper > .org-children > .org-node-wrapper {
          flex: 1 1 0;
          max-width: 620px;
        }

        /* Vertical connector: parent card → horizontal rail */
        .org-node-wrapper > .org-children::before {
          content: '';
          position: absolute;
          top: -40px;
          left: 50%;
          width: 2px;
          height: 40px;
          background: linear-gradient(to bottom, rgba(222,81,10,0.45), rgba(195,204,189,0.6));
          transform: translateX(-50%);
        }

        /* ─── CHILDREN ROW ─── */
        .org-children {
          display: flex;
          justify-content: center;
          position: relative;
          margin-top: 40px;
          width: 100%;
        }

        /* Horizontal rail spanning all siblings */
        .org-children > .org-node-wrapper::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: rgba(195,204,189,0.7);
        }

        .org-children > .org-node-wrapper:first-child::after {
          left: 50%;
          width: 50%;
        }

        .org-children > .org-node-wrapper:last-child::after {
          left: 0;
          width: 50%;
        }

        .org-children > .org-node-wrapper:first-child:last-child::after {
          display: none;
        }

        /* Vertical drop from rail to each child card */
        .org-children > .org-node-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: 2px;
          height: 28px;
          background: rgba(195,204,189,0.7);
          transform: translateX(-50%);
        }

        .org-children > .org-node-wrapper > .org-card {
          margin-top: 28px;
        }

        /* ─── CARD DESIGN ─── */
        .org-card {
          position: relative;
          width: clamp(190px, 15vw, 220px);
          max-width: 100%;
          background: #ffffff;
          border: 1px solid rgba(195,204,189,0.55);
          border-radius: 10px;
          padding: 22px 18px 20px;
          text-align: center;
          box-shadow:
            0 1px 3px rgba(17,17,17,0.04),
            0 6px 18px rgba(17,17,17,0.05);
          overflow: hidden;
          transition:
            transform 0.22s ease,
            box-shadow 0.22s ease,
            border-color 0.22s ease;
        }

        .org-card:hover {
          transform: translateY(-3px);
          box-shadow:
            0 2px 6px rgba(17,17,17,0.05),
            0 14px 32px rgba(17,17,17,0.09);
          border-color: rgba(222,81,10,0.28);
        }

        /* Brand accent bar at top */
        .org-card-accent {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #DE510A, #B9320D);
          border-radius: 10px 10px 0 0;
        }

        .org-card-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1rem;
          font-weight: 700;
          color: #111111;
          margin-bottom: 7px;
          letter-spacing: -0.01em;
          line-height: 1.25;
        }

        .org-card-role {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 600;
          color: rgba(17,17,17,0.52);
          letter-spacing: 0.07em;
          text-transform: uppercase;
          line-height: 1.4;
        }

        .org-card-role-only {
          width: clamp(154px, 11.5vw, 172px);
          padding: 16px 14px 15px;
          background: rgba(255,255,255,0.86);
          border-color: rgba(195,204,189,0.45);
          box-shadow:
            0 1px 2px rgba(17,17,17,0.03),
            0 5px 14px rgba(17,17,17,0.04);
        }

        .org-card-role-only .org-card-accent {
          height: 2px;
          background: linear-gradient(90deg, rgba(222,81,10,0.64), rgba(185,50,13,0.52));
        }

        .org-card-placeholder-role {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 0.86rem;
          font-weight: 650;
          color: rgba(17,17,17,0.72);
          line-height: 1.35;
          letter-spacing: 0;
        }

        .org-node-wrapper[data-level="2"] > .org-children {
          flex-direction: column;
          align-items: center;
          margin-top: 30px;
        }

        .org-node-wrapper[data-level="2"] > .org-children::before {
          top: -30px;
          height: 30px;
        }

        .org-node-wrapper[data-level="2"] > .org-children > .org-node-wrapper::after {
          display: none;
        }

        .org-node-wrapper[data-level="2"] > .org-children > .org-node-wrapper::before {
          top: -30px;
          height: 30px;
        }

        .org-node-wrapper[data-level="3"] .org-card-role-only {
          width: clamp(148px, 10.5vw, 164px);
          padding: 15px 13px 14px;
        }

        .org-node-wrapper[data-level="4"] .org-card-role-only {
          width: clamp(140px, 10vw, 156px);
          padding: 14px 12px 13px;
          background: rgba(255,255,255,0.72);
        }

        .org-node-wrapper[data-level="4"] .org-card-placeholder-role {
          font-size: 0.8rem;
          color: rgba(17,17,17,0.62);
        }

        /* ─── ENTRANCE ANIMATION ─── */
        /*
          Cards start invisible, shifted down 16px.
          When .org-in is added to .org-section, each card
          animates in using its --stagger custom property.
        */
        .org-card {
          opacity: 0;
          transform: translateY(16px);
          transition:
            opacity 0.55s cubic-bezier(.22,1,.36,1),
            transform 0.55s cubic-bezier(.22,1,.36,1),
            box-shadow 0.22s ease,
            border-color 0.22s ease;
          transition-delay: var(--stagger, 0s);
        }

        .org-in .org-card {
          opacity: 1;
          transform: translateY(0);
        }

        /* Hover overrides (keep working after animation settles) */
        .org-in .org-card:hover {
          transform: translateY(-3px);
        }

        /* Connector reveal */
        .org-node-wrapper > .org-children::before,
        .org-children > .org-node-wrapper::before,
        .org-children > .org-node-wrapper::after {
          opacity: 0;
          transition: opacity 0.5s ease 0.18s;
        }

        .org-in .org-node-wrapper > .org-children::before,
        .org-in .org-children > .org-node-wrapper::before,
        .org-in .org-children > .org-node-wrapper::after {
          opacity: 1;
        }

        /* ─── REDUCED MOTION ─── */
        @media (prefers-reduced-motion: reduce) {
          .org-card {
            opacity: 1;
            transform: none;
            transition: box-shadow 0.2s ease, border-color 0.2s ease;
          }

          .org-in .org-card:hover {
            transform: none;
          }

          .org-node-wrapper > .org-children::before,
          .org-children > .org-node-wrapper::before,
          .org-children > .org-node-wrapper::after {
            opacity: 1;
            transition: none;
          }
        }

        /* ─── MOBILE ─── */
        @media (max-width: 1100px) {
          .org-tree {
            width: 100%;
            display: block;
          }

          .org-tree-scroll {
            padding-inline: 20px;
          }

          .org-tree > .org-node-wrapper > .org-children > .org-node-wrapper {
            flex: initial;
            max-width: none;
          }

          .org-node-wrapper {
            padding: 0;
            align-items: center;
          }

          .org-children {
            flex-direction: column;
            align-items: center;
            gap: 0;
            margin-top: 28px;
          }

          .org-node-wrapper > .org-children::before {
            height: 28px;
            top: -28px;
          }

          .org-children > .org-node-wrapper::after {
            display: none;
          }

          .org-children > .org-node-wrapper::before {
            height: 28px;
            top: -28px;
          }

          .org-children > .org-node-wrapper > .org-card {
            margin-top: 28px;
          }

          .org-card,
          .org-card-role-only,
          .org-node-wrapper[data-level="3"] .org-card-role-only,
          .org-node-wrapper[data-level="4"] .org-card-role-only {
            width: min(300px, calc(100vw - 48px));
          }
        }

        @media (max-width: 768px) {
          .org-section {
            padding: 56px 0 96px;
          }

          .org-section-head {
            margin-bottom: 40px;
          }

          /*
            On mobile: switch to a purely vertical stacked layout.
            No horizontal overflow. No internal scrollbar.
          */
          .org-tree {
            min-width: unset;
            padding: 8px 0;
            display: block;
          }

          .org-tree-scroll {
            overflow: visible;
            padding: 0 20px 32px;
          }

          .org-node-wrapper {
            padding: 0;
            align-items: center;
          }

          /* Stack children vertically */
          .org-children {
            flex-direction: column;
            align-items: center;
            gap: 0;
            margin-top: 28px;
          }

          /* Single vertical connector from parent */
          .org-node-wrapper > .org-children::before {
            height: 28px;
            top: -28px;
          }

          /* Hide horizontal rail on mobile */
          .org-children > .org-node-wrapper::after {
            display: none;
          }

          /* Vertical drop between stacked siblings */
          .org-children > .org-node-wrapper::before {
            height: 28px;
            top: -28px;
          }

          .org-children > .org-node-wrapper > .org-card {
            margin-top: 28px;
          }

          .org-card,
          .org-card-role-only,
          .org-node-wrapper[data-level="3"] .org-card-role-only,
          .org-node-wrapper[data-level="4"] .org-card-role-only {
            width: min(300px, calc(100vw - 48px));
          }
        }

        @media (max-width: 390px) {
          .org-card {
            width: calc(100vw - 48px);
            padding: 18px 14px 16px;
          }
        }
      `}</style>
    </div>
  );
}
