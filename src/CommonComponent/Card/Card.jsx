import React from "react";

// ─── Styles ────────────────────────────────────────────────────────────────
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --card-radius: 16px;
    --transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #f0ece4;
    min-height: 100vh;
    padding: 48px 32px;
    color: #1a1a1a;
  }

  .demo-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 28px;
    max-width: 1100px;
    margin: 0 auto;
  }

  .demo-title {
    font-family: 'DM Serif Display', serif;
    font-size: 2.6rem;
    text-align: center;
    margin-bottom: 48px;
    color: #1a1a1a;
    letter-spacing: -0.5px;
  }

  /* ── Base Card ─────────────────────────── */
  .card {
    border-radius: var(--card-radius);
    overflow: hidden;
    transition: var(--transition);
    position: relative;
  }

  /* ── Default Variant ───────────────────── */
  .card--default {
    background: #ffffff;
    border: 1px solid #e8e2d8;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  }
  .card--default:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(0,0,0,0.12);
  }

  /* ── Elevated Variant ──────────────────── */
  .card--elevated {
    background: #ffffff;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06);
  }
  .card--elevated:hover {
    transform: translateY(-6px);
    box-shadow: 0 20px 48px rgba(0,0,0,0.15);
  }

  /* ── Outlined Variant ──────────────────── */
  .card--outlined {
    background: transparent;
    border: 2px solid #1a1a1a;
  }
  .card--outlined:hover {
    background: #1a1a1a;
    color: #f0ece4;
  }
  .card--outlined:hover .card__meta,
  .card--outlined:hover .card__title,
  .card--outlined:hover .card__body {
    color: #f0ece4;
  }
  .card--outlined:hover .card__tag {
    background: rgba(255,255,255,0.15);
    color: #f0ece4;
  }

  /* ── Filled Variant ────────────────────── */
  .card--filled {
    background: #1a1a1a;
    color: #f0ece4;
  }
  .card--filled .card__meta { color: #9e9e9e; }
  .card--filled .card__title { color: #f0ece4; }
  .card--filled .card__body { color: #c8c0b4; }
  .card--filled .card__tag {
    background: rgba(255,255,255,0.12);
    color: #e0d8cc;
  }
  .card--filled .card__action {
    border-top: 1px solid rgba(255,255,255,0.1);
    color: #c8c0b4;
  }
  .card--filled .card__action:hover { color: #ffffff; }
  .card--filled:hover {
    transform: translateY(-4px);
    box-shadow: 0 16px 40px rgba(0,0,0,0.3);
  }

  /* ── Gradient Variant ──────────────────── */
  .card--gradient {
    background: linear-gradient(135deg, #c9a96e 0%, #8b6b3d 100%);
    color: #fff;
  }
  .card--gradient .card__meta { color: rgba(255,255,255,0.7); }
  .card--gradient .card__title { color: #fff; }
  .card--gradient .card__body { color: rgba(255,255,255,0.85); }
  .card--gradient .card__tag {
    background: rgba(255,255,255,0.2);
    color: #fff;
  }
  .card--gradient .card__action {
    border-top: 1px solid rgba(255,255,255,0.2);
    color: rgba(255,255,255,0.8);
  }
  .card--gradient .card__action:hover { color: #fff; }
  .card--gradient:hover {
    transform: translateY(-5px);
    box-shadow: 0 16px 40px rgba(139,107,61,0.4);
  }

  /* ── Card Sections ─────────────────────── */
  .card__image-wrap {
    width: 100%;
    overflow: hidden;
    background: #e8e2d8;
  }
  .card__image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .card:hover .card__image-wrap img {
    transform: scale(1.04);
  }

  .card__content {
    padding: 24px;
  }

  .card__header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 12px;
  }

  .card__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
  }

  .card__tag {
    font-size: 0.7rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    background: #f0ece4;
    color: #6b5e4e;
    padding: 4px 10px;
    border-radius: 100px;
  }

  .card__meta {
    font-size: 0.78rem;
    font-weight: 500;
    color: #9e9587;
    letter-spacing: 0.03em;
    flex-shrink: 0;
  }

  .card__title {
    font-family: 'DM Serif Display', serif;
    font-size: 1.25rem;
    line-height: 1.3;
    color: #1a1a1a;
    margin-bottom: 10px;
  }

  .card__body {
    font-size: 0.875rem;
    line-height: 1.65;
    color: #6b6560;
  }

  .card__footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
    gap: 12px;
  }

  .card__avatar-group {
    display: flex;
  }
  .card__avatar {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    border: 2px solid #fff;
    background: #c9a96e;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    font-weight: 600;
    color: #fff;
    margin-left: -8px;
    flex-shrink: 0;
  }
  .card__avatar:first-child { margin-left: 0; }

  .card__stat {
    font-size: 0.78rem;
    color: #9e9587;
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .card__action {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 24px;
    border-top: 1px solid #e8e2d8;
    font-size: 0.82rem;
    font-weight: 600;
    color: #6b5e4e;
    letter-spacing: 0.03em;
    cursor: pointer;
    transition: var(--transition);
    background: none;
    border-left: none;
    border-right: none;
    border-bottom: none;
    width: 100%;
    text-align: left;
  }
  .card__action:hover { color: #1a1a1a; }
  .card__action svg { transition: transform 0.2s ease; }
  .card__action:hover svg { transform: translateX(4px); }

  .card__icon {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: #f0ece4;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  .card--filled .card__icon { background: rgba(255,255,255,0.1); }
  .card--gradient .card__icon { background: rgba(255,255,255,0.2); }
`;

// ─── Card Component ─────────────────────────────────────────────────────────
/**
 * Card — reusable card component
 *
 * Props:
 *  variant       "default" | "elevated" | "outlined" | "filled" | "gradient"
 *  image         { src, alt, height }
 *  icon          emoji or string
 *  tags          string[]
 *  meta          string (e.g. date, category)
 *  title         string
 *  body          string
 *  footer        ReactNode
 *  actionLabel   string  (renders a bottom CTA row)
 *  onAction      () => void
 *  className     string
 *  style         object
 */
const Card = ({
  variant = "default",
  image,
  icon,
  tags,
  meta,
  title,
  body,
  footer,
  actionLabel,
  onAction,
  className = "",
  style,
}) => {
  return (
    <div className={`card card--${variant} ${className}`} style={style}>
      {/* Image */}
      {image && (
        <div className="card__image-wrap" style={{ height: image.height || 180 }}>
          <img src={image.src} alt={image.alt || ""} />
        </div>
      )}

      {/* Content */}
      <div className="card__content">
        {/* Tags + meta row */}
        {(tags?.length || meta) && (
          <div className="card__header">
            {tags?.length > 0 && (
              <div className="card__tags">
                {tags.map((t) => (
                  <span key={t} className="card__tag">{t}</span>
                ))}
              </div>
            )}
            {meta && <span className="card__meta">{meta}</span>}
          </div>
        )}

        {/* Icon + title row */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
          {icon && <div className="card__icon">{icon}</div>}
          <div style={{ flex: 1 }}>
            {title && <h3 className="card__title">{title}</h3>}
            {body && <p className="card__body">{body}</p>}
          </div>
        </div>

        {/* Footer slot */}
        {footer && <div className="card__footer">{footer}</div>}
      </div>

      {/* Action CTA */}
      {actionLabel && (
        <button className="card__action" onClick={onAction}>
          {actionLabel}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
};

// ─── Demo ───────────────────────────────────────────────────────────────────
const AvatarGroup = ({ names, dark }) => (
  <div className="card__avatar-group">
    {names.map((n) => (
      <div key={n} className="card__avatar" style={dark ? { borderColor: "rgba(255,255,255,0.2)" } : {}}>
        {n[0]}
      </div>
    ))}
  </div>
);

const Stat = ({ icon, label }) => (
  <span className="card__stat">{icon} {label}</span>
);

export default function Cards() {
  return (
    <>
      <style>{styles}</style>
      <h1 className="demo-title">Card Component</h1>
      <div className="demo-grid">

        {/* 1. Default */}
        <Card
          variant="default"
          image={{ src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80", height: 200 }}
          tags={["Travel", "Nature"]}
          meta="Apr 27"
          title="Into the Alpine Silence"
          body="High above the treeline, where wind carves the rock and stars crowd the sky, the world becomes wonderfully still."
          footer={
            <>
              <AvatarGroup names={["Ana", "Ben", "Cleo"]} />
              <Stat icon="❤️" label="248 likes" />
            </>
          }
          actionLabel="Read article"
          onAction={() => alert("Default card action")}
        />

        {/* 2. Elevated */}
        <Card
          variant="elevated"
          tags={["Design"]}
          meta="5 min read"
          title="The Grid Always Wins"
          body="Every memorable interface has an invisible skeleton — a typographic grid that makes beauty feel inevitable rather than accidental."
          footer={<Stat icon="📖" label="1.2k reads" />}
          actionLabel="Open post"
        />

        {/* 3. Outlined */}
        <Card
          variant="outlined"
          icon="🚀"
          title="Quick Deploy"
          body="Push to production in seconds. Zero-config pipelines that get out of your way so you can focus on shipping features."
          footer={
            <>
              <span style={{ fontSize: "0.8rem", fontWeight: 600 }}>Free tier available</span>
              <Stat icon="⭐" label="4.9" />
            </>
          }
          actionLabel="Get started"
          onAction={() => alert("Outlined card action")}
        />

        {/* 4. Filled */}
        <Card
          variant="filled"
          icon="🎧"
          tags={["Audio", "Chill"]}
          title="Late Night Sessions"
          body="Curated lo-fi beats for focus, study, and late-night coding marathons. No ads, no interruptions."
          footer={
            <>
              <AvatarGroup names={["DJ", "Mo", "Lee"]} dark />
              <Stat icon="🎵" label="18k plays" />
            </>
          }
          actionLabel="Play now"
        />

        {/* 5. Gradient */}
        <Card
          variant="gradient"
          tags={["Finance"]}
          meta="Today"
          title="Your Portfolio at a Glance"
          body="Total returns are up 14.3% this quarter. Three holdings are outperforming market benchmarks."
          footer={
            <div style={{ display: "flex", gap: 24 }}>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", fontFamily: "'DM Serif Display', serif" }}>$84,320</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>Total value</div>
              </div>
              <div>
                <div style={{ fontSize: "1.4rem", fontWeight: 700, color: "#fff", fontFamily: "'DM Serif Display', serif" }}>+14.3%</div>
                <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>Returns</div>
              </div>
            </div>
          }
          actionLabel="View details"
        />

        {/* 6. Simple minimal card */}
        <Card
          variant="default"
          icon="🌿"
          title="Minimal Card"
          body="No image, no tags — just an icon, a headline, and a short description. Perfect for feature lists or service grids."
        />

      </div>
    </>
  );
}