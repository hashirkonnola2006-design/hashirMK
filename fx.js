/* ==========================================================================
   FX Module: Verlet Web Strands, Dust Particles, Impact Puff & Spider-Sense
   ========================================================================== */

export function createWebStrands(canvas, getTvRect) {
  if (!canvas) return { start() {}, stop() {}, setTension() {}, snap() {}, reset() {} };
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let width = 0;
  let height = 0;
  let rafId = 0;
  let running = false;
  let tension = 1;
  let snapped = false;
  let snapAlpha = 1;

  // 7 anchor points tucked cleanly onto the TV's upper bezel corners/edge
  const STRAND_SPECS = [
    { topX: 0.34, tvX: 0.08, tvY: 0.06, sag: 8 },
    { topX: 0.38, tvX: 0.14, tvY: 0.04, sag: 4 },
    { topX: 0.43, tvX: 0.24, tvY: 0.03, sag: 6 },
    { topX: 0.50, tvX: 0.52, tvY: 0.04, sag: 9 },
    { topX: 0.57, tvX: 0.78, tvY: 0.03, sag: 5 },
    { topX: 0.62, tvX: 0.87, tvY: 0.05, sag: 4 },
    { topX: 0.66, tvX: 0.92, tvY: 0.07, sag: 7 },
  ].map((s) => ({
    ...s,
    nodes: Array.from({ length: 16 }, () => ({ x: 0, y: 0, ox: 0, oy: 0 })),
    snappedAt: 0,
  }));

  function resize() {
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function initNodes() {
    const tv = getTvRect();
    if (!tv) return;
    STRAND_SPECS.forEach((st) => {
      const x0 = width * st.topX;
      const y0 = -10;
      const x1 = tv.left + tv.width * st.tvX;
      const y1 = tv.top + tv.height * st.tvY;
      st.nodes.forEach((n, idx) => {
        const t = idx / (st.nodes.length - 1);
        n.x = x0 + (x1 - x0) * t;
        n.y = y0 + (y1 - y0) * t;
        n.ox = n.x;
        n.oy = n.y;
      });
    });
  }

  function tick(now) {
    if (!running) return;
    rafId = requestAnimationFrame(tick);
    if (document.hidden) return;

    const tv = getTvRect();
    ctx.clearRect(0, 0, width, height);
    if (!tv || snapAlpha <= 0.01) return;

    const t = now * 0.001;
    if (snapped) snapAlpha = Math.max(0, snapAlpha - 0.045);

    STRAND_SPECS.forEach((st, idx) => {
      const x0 = width * st.topX;
      const y0 = -10;
      const x1 = tv.left + tv.width * st.tvX;
      const y1 = tv.top + tv.height * st.tvY;

      const nodes = st.nodes;
      nodes[0].x = x0;
      nodes[0].y = y0;

      // Verlet integration
      for (let i = 1; i < nodes.length; i += 1) {
        if (!snapped && i === nodes.length - 1) {
          nodes[i].x = x1;
          nodes[i].y = y1;
          continue;
        }
        const n = nodes[i];
        const vx = (n.x - n.ox) * 0.82;
        const vy = (n.y - n.oy) * 0.82;
        n.ox = n.x;
        n.oy = n.y;
        const tNorm = i / (nodes.length - 1);
        const vib = Math.sin(t * 2.4 + idx * 0.9 + tNorm * 3.1) * 0.04 * tension * Math.sin(tNorm * Math.PI);
        n.x += vx + vib;
        n.y += vy + (snapped ? -2.2 : 0.16);
      }

      // Distance constraints
      const totalLen = Math.hypot(x1 - x0, y1 - y0) + st.sag;
      const segLen = totalLen / (nodes.length - 1);
      for (let iter = 0; iter < 8; iter += 1) {
        for (let i = 0; i < nodes.length - 1; i += 1) {
          const a = nodes[i];
          const b = nodes[i + 1];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.hypot(dx, dy) || 1;
          const diff = (dist - segLen) / dist;
          if (i > 0) { a.x += dx * diff * 0.5; a.y += dy * diff * 0.5; }
          if (snapped || i + 1 < nodes.length - 1) {
            b.x -= dx * diff * 0.5;
            b.y -= dy * diff * 0.5;
          }
        }
      }

      // Draw translucent silk strand + glistening highlight + anchor blob
      ctx.save();
      ctx.globalAlpha = 0.52 * snapAlpha;
      ctx.strokeStyle = "rgba(232, 240, 255, 0.85)";
      ctx.lineWidth = idx % 2 === 0 ? 1.35 : 0.95;
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i += 1) {
        ctx.lineTo(nodes[i].x, nodes[i].y);
      }
      ctx.stroke();

      if (!snapped) {
        ctx.fillStyle = "rgba(255, 255, 255, 0.72)";
        ctx.beginPath();
        ctx.arc(x1, y1, 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    });
  }

  window.addEventListener("resize", resize);

  return {
    start() {
      if (running) return;
      resize();
      initNodes();
      running = true;
      rafId = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      cancelAnimationFrame(rafId);
    },
    setTension(val) { tension = val; },
    snap() { snapped = true; },
    reset() {
      snapped = false;
      snapAlpha = 1;
      tension = 1;
      initNodes();
    },
  };
}

export function createParticleEngine(canvas, reducedMotion) {
  if (!canvas || reducedMotion) return { start() {}, stop() {}, burstImpact() {} };
  const ctx = canvas.getContext("2d");
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  let w = 0;
  let h = 0;
  let rafId = 0;
  let running = false;

  const dust = Array.from({ length: 34 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: 0.00018 + Math.random() * 0.00025,
    vy: -0.0001 + Math.random() * 0.00022,
    r: 0.8 + Math.random() * 1.6,
    a: 0.12 + Math.random() * 0.25,
  }));

  const impactSparks = [];

  function resize() {
    w = canvas.clientWidth || window.innerWidth;
    h = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function tick() {
    if (!running) return;
    rafId = requestAnimationFrame(tick);
    if (document.hidden) return;

    ctx.clearRect(0, 0, w, h);

    // Ambient spotlight dust motes
    for (let i = 0; i < dust.length; i += 1) {
      const p = dust[i];
      p.x = (p.x + p.vx) % 1;
      p.y = (p.y + p.vy + 1) % 1;
      ctx.fillStyle = `rgba(225, 232, 245, ${p.a})`;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.r, 0, Math.PI * 2);
      ctx.fill();
    }

    // Impact dust puffs & sparks
    for (let i = impactSparks.length - 1; i >= 0; i -= 1) {
      const s = impactSparks[i];
      s.x += s.vx;
      s.y += s.vy;
      s.vy += s.g;
      s.life -= s.decay;
      if (s.life <= 0) {
        impactSparks.splice(i, 1);
        continue;
      }
      ctx.globalAlpha = s.life;
      ctx.fillStyle = s.color;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  window.addEventListener("resize", resize);

  return {
    start() {
      if (running) return;
      resize();
      running = true;
      rafId = requestAnimationFrame(tick);
    },
    stop() {
      running = false;
      cancelAnimationFrame(rafId);
    },
    burstImpact(px, py) {
      // Dust puff
      for (let i = 0; i < 18; i += 1) {
        const ang = Math.PI + (Math.random() - 0.5) * Math.PI * 0.9;
        const spd = 1.5 + Math.random() * 4.5;
        impactSparks.push({
          x: px + (Math.random() - 0.5) * 80,
          y: py,
          vx: Math.cos(ang) * spd,
          vy: -Math.abs(Math.sin(ang) * spd * 0.6),
          g: 0.04,
          size: 4 + Math.random() * 10,
          life: 0.55,
          decay: 0.018,
          color: "rgba(180, 188, 200, 0.28)",
        });
      }
      // Electrical sparks
      for (let i = 0; i < 14; i += 1) {
        const ang = Math.random() * Math.PI * 2;
        const spd = 2.5 + Math.random() * 6.5;
        impactSparks.push({
          x: px,
          y: py,
          vx: Math.cos(ang) * spd,
          vy: Math.sin(ang) * spd - 2,
          g: 0.22,
          size: 1.5 + Math.random() * 1.5,
          life: 1,
          decay: 0.035,
          color: i % 3 === 0 ? "#4D7CFF" : "#cfe0ff",
        });
      }
    },
  };
}

export function createSpiderSense(svgEl, reducedMotion) {
  if (!svgEl) return { show() {}, hide() {}, flashFast() {} };
  const paths = Array.from(svgEl.querySelectorAll(".sense-path"));
  let timer = null;

  function jitterOnce(fast = false) {
    paths.forEach((p, idx) => {
      const delay = fast ? idx * 18 : Math.random() * 500;
      setTimeout(() => {
        const show = fast || Math.random() > 0.35;
        p.style.transition = `stroke-dashoffset ${fast ? 110 : 220}ms ease, transform ${fast ? 90 : 180}ms ease`;
        p.style.strokeDashoffset = show ? "0" : "85";
        p.style.transform = show
          ? `translate(${((Math.random() - 0.5) * (fast ? 8 : 4)).toFixed(1)}px, ${((Math.random() - 0.5) * (fast ? 8 : 4)).toFixed(1)}px)`
          : "none";
      }, delay);
    });
  }

  return {
    show() {
      svgEl.style.opacity = "1";
      if (reducedMotion) {
        paths.forEach((p) => { p.style.strokeDashoffset = "0"; });
        return;
      }
      jitterOnce(false);
      clearInterval(timer);
      timer = setInterval(() => jitterOnce(false), 1400);
    },
    hide() {
      clearInterval(timer);
      svgEl.style.opacity = "0";
      paths.forEach((p) => { p.style.strokeDashoffset = "85"; });
    },
    flashFast() {
      svgEl.style.opacity = "1";
      if (!reducedMotion) jitterOnce(true);
    },
  };
}
