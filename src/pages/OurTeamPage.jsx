import { teamData } from '../data/teamData';

function TeamNode({ node }) {
  const hasChildren = Array.isArray(node.children) && node.children.length > 0;

  return (
    <div className="team-node-wrapper">
      <div className="team-node">
        <div className="team-node-name">{node.name || 'Name here'}</div>
        <div className="team-node-role">{node.role || 'Role title'}</div>
      </div>

      {hasChildren && (
        <div className="team-node-children">
          {node.children.map((child) => (
            <TeamNode key={child.id || child.name} node={child} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function OurTeamPage() {
  return (
    <div className="our-team-page">
      <section className="our-team-hero">
        <div className="container team-hero-inner">
          <div className="team-hero-copy">
            <span className="team-hero-kicker">Leadership</span>
            <h1>Our Team</h1>
          </div>
        </div>
      </section>

      <section className="team-organogram-section">
        <div className="container">
          <div className="team-organogram-wrap">
            <TeamNode node={teamData} />
          </div>
        </div>
      </section>

      <style>{`
        .our-team-page {
          background: #fbf7f0;
          color: #111111;
        }

        .our-team-hero {
          position: relative;
          min-height: 46vh;
          display: flex;
          align-items: center;
          padding: 150px 0 40px;
          background: linear-gradient(135deg, rgba(63,98,49,0.98), rgba(17,17,17,0.92));
        }

        .team-hero-inner {
          width: 100%;
        }

        .team-hero-copy {
          text-align: center;
          color: #fff;
        }

        .team-hero-kicker {
          display: inline-block;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.82);
          margin-bottom: 16px;
        }

        .team-hero-copy h1 {
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          font-size: clamp(2.5rem, 6vw, 5rem);
          line-height: 1;
        }

        .team-organogram-section {
          padding: 60px 0 120px;
        }

        .team-organogram-wrap {
          overflow-x: auto;
          padding: 16px 0 20px;
        }

        .team-node-wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
          position: relative;
        }

        .team-node-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          width: 2px;
          height: 24px;
          background: rgba(63,98,49,0.42);
          transform: translateY(-100%);
        }

        .team-node {
          width: min(240px, 76vw);
          background: #fff;
          border: 1px solid rgba(63,98,49,0.2);
          border-radius: 18px;
          padding: 18px 16px;
          text-align: center;
          box-shadow: 0 16px 32px rgba(17,17,17,0.05);
          border-top: 4px solid #de510a;
        }

        .team-node-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .team-node-role {
          font-size: 0.8rem;
          color: rgba(17,17,17,0.72);
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }

        .team-node-children {
          display: flex;
          justify-content: center;
          gap: 30px;
          margin-top: 28px;
          position: relative;
          padding-top: 20px;
          flex-wrap: wrap;
        }

        .team-node-children::before {
          content: '';
          position: absolute;
          top: 0;
          left: 50%;
          width: min(70%, 760px);
          height: 2px;
          transform: translateX(-50%);
          background: rgba(63,98,49,0.28);
        }

        .team-node-children > .team-node-wrapper {
          position: relative;
        }

        .team-node-children > .team-node-wrapper::before {
          content: '';
          position: absolute;
          top: -20px;
          left: 50%;
          width: 2px;
          height: 20px;
          background: rgba(63,98,49,0.28);
          transform: translateX(-50%);
        }

        @media (max-width: 768px) {
          .team-organogram-wrap {
            overflow-x: auto;
          }

          .team-node-wrapper,
          .team-node-children {
            min-width: 260px;
          }

          .team-node-children {
            flex-direction: column;
            align-items: center;
            gap: 22px;
          }

          .team-node-children::before {
            width: 2px;
            height: calc(100% - 14px);
            left: 50%;
            top: 0;
            bottom: auto;
            background: rgba(63,98,49,0.28);
          }
        }
      `}</style>
    </div>
  );
}
