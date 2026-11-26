/* ==========================================================================
   FX Module: Verlet Web Strands, Dust Particles, Impact Puff & Spider-Sense
   ========================================================================== */

export function createWebStrands(canvas, getTvTransform) {
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

  // Two load-bearing corner clusters + secondary cross-bracing strands (taut, sag ~0)
  // Coordinates: topX (viewport width fraction at ceiling y=-8), tvX/tvY (local TV fractions)
  const STRAND_SPECS = [
    // Left corner load-bearing cluster
    { topX: 0.355, tvX: 0.045, tvY: 0.075, sag: 0.2, width: 1.7, alpha: 0.78, cluster: "L" },
    { topX: 0.372, tvX: 0.075, tvY: 0.055, sag: 0.0, width: 1.35, alpha: 0.68, cluster: "L" },
    { topX: 0.415, tvX: 0.115, tvY: 0.048, sag: 0.4, width: 1.15, alpha: 0.58, cluster: "L" },
    { topX: 0.390, tvX: 0.195, tvY: 0.045, sag: 0.6, width: 0.9,  alpha: 0.44, cluster: "L" },
    // Center crossed tension brace
    { topX: 0.475, tvX: 0.145, tvY: 0.052, sag: 0.8, width: 0.85, alpha: 0.38, cluster: "M" },
    { topX: 0.525, tvX: 0.855, tvY: 0.052, sag: 0.8, width: 0.85, alpha: 0.38, cluster: "M" },
    // Right corner load-bearing cluster
    { topX: 0.605, tvX: 0.805, tvY: 0.045, sag: 0.5, width: 0.9,  alpha: 0.42, cluster: "R" },
    { topX: 0.585, tvX: 0.885, tvY: 0.048, sag: 0.3, width: 1.15, alpha: 0.54, cluster: "R" },
    { topX: 0.628, tvX: 0.925, tvY: 0.055, sag: 0.0, width: 1.35, alpha: 0.64, cluster: "R" },
    { topX: 0.645, tvX: 0.955, tvY: 0.075, sag: 0.2, width: 1.65, alpha: 0.72, cluster: "R" },
  ].map((s) => ({
    ...s,
    nodes: Array.from({ length: 14 }, () => ({ x: 0, y: 0, ox: 0, oy: 0 })),
  }));

  function resize() {
    width = canvas.clientWidth || window.innerWidth;
    height = canvas.clientHeight || window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function mapTvPoint(tv, fx, fy) {
    if (tv.mapPoint) return tv.mapPoint(fx, fy);
    return { x: tv.left + tv.width * fx, y: tv.top + tv.height * fy };
  }

  function initNodes() {
    const tv = getTvTransform();
    if (!tv) return;
    STRAND_SPECS.forEach((st) => {
      const x0 = width * st.topX;
      const y0 = -8;
      const p1 = mapTvPoint(tv, st.tvX, st.tvY);
      st.nodes.forEach((n, idx) => {
        const t = idx / (st.nodes.length - 1);
        n.x = x0 + (p1.x - x0) * t;
        n.y = y0 + (p1.y - y0) * t;
        n.ox = n.x;
        n.oy = n.y;
      });
    });
  }

  function tick(now) {
    if (!running) return;
    rafId = requestAnimationFrame(tick);
    if (document.hidden) return;

    const tv = getTvTransform();
    ctx.clearRect(0, 0, width, height);
    if (!tv || snapAlpha <= 0.01) return;

    const t = now * 0.001;
    if (snapped) snapAlpha = Math.max(0, snapAlpha - 0.05);

    STRAND_SPECS.forEach((st, idx) => {
      const x0 = width * st.topX;
      const y0 = -8;
      const p1 = mapTvPoint(tv, st.tvX, st.tvY);
      const x1 = p1.x;
      const y1 = p1.y;

      const nodes = st.nodes;
      nodes[0].x = x0;
      nodes[0].y = y0;

      // Verlet integration (high tension, crisp minimal vibration)
      for (let i = 1; i < nodes.length; i += 1) {
        if (!snapped && i === nodes.length - 1) {
          nodes[i].x = x1;
          nodes[i].y = y1;
          continue;
        }
        const n = nodes[i];
        const vx = (n.x - n.ox) * 0.78;
        const vy = (n.y - n.oy) * 0.78;
        n.ox = n.x;
        n.oy = n.y;
        const tNorm = i / (nodes.length - 1);
        const vib = snapped
          ? Math.sin(t * 14 + idx + i) * 1.4
          : Math.sin(t * 2.2 + idx * 1.1 + tNorm * 3.14) * 0.025 * (tension - 1) * Math.sin(tNorm * Math.PI);
        n.x += vx + vib;
        n.y += vy + (snapped ? -2.8 : 0.04);
      }

      // High-stiffness distance constraints so load-bearing cables stay taut
      const totalLen = Math.hypot(x1 - x0, y1 - y0) + st.sag;
      const segLen = totalLen / (nodes.length - 1);
      for (let iter = 0; iter < 14; iter += 1) {
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

      // Top-left spotlight sheen gradient along each taut cable
      const grad = ctx.createLinearGradient(x0, y0, x1, y1);
      const leftBoost = st.cluster === "L" ? 1.0 : st.cluster === "M" ? 0.85 : 0.75;
      grad.addColorStop(0, `rgba(245, 248, 255, ${(st.alpha * leftBoost).toFixed(2)})`);
      grad.addColorStop(0.55, `rgba(205, 216, 232, ${(st.alpha * 0.72 * leftBoost).toFixed(2)})`);
      grad.addColorStop(1, `rgba(175, 188, 206, ${(st.alpha * 0.82).toFixed(2)})`);

      ctx.save();
      ctx.globalAlpha = snapAlpha;
      ctx.lineCap = "round";

      // Subtle dark backing stroke for physical depth against fog
      ctx.strokeStyle = "rgba(0, 0, 0, 0.55)";
      ctx.lineWidth = st.width + 1.4;
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i += 1) ctx.lineTo(nodes[i].x, nodes[i].y);
      ctx.stroke();

      // Main silver-white silk strand
      ctx.strokeStyle = grad;
      ctx.lineWidth = st.width;
      ctx.beginPath();
      ctx.moveTo(nodes[0].x, nodes[0].y);
      for (let i = 1; i < nodes.length; i += 1) ctx.lineTo(nodes[i].x, nodes[i].y);
      ctx.stroke();

      // Webbing grip tendrils wrapping down onto the TV top bezel (no floating dots)
      if (!snapped && st.cluster !== "M") {
        const dir = st.cluster === "L" ? 1 : -1;
        const grip1 = mapTvPoint(tv, st.tvX + dir * 0.02, st.tvY + 0.065);
        const grip2 = mapTvPoint(tv, st.tvX - dir * 0.015, st.tvY + 0.085);
        ctx.strokeStyle = `rgba(220, 230, 245, ${(st.alpha * 0.65).toFixed(2)})`;
        ctx.lineWidth = 0.85;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(x1 + dir * 4, y1 + 8, grip1.x, grip1.y);
        ctx.moveTo(x1, y1);
        ctx.quadraticCurveTo(x1 - dir * 3, y1 + 10, grip2.x, grip2.y);
        ctx.stroke();
      }
      ctx.restore();
    });

    // Subtle horizontal cobweb cross-filaments linking each corner bundle
    if (!snapped) {
      ctx.save();
      ctx.globalAlpha = 0.34 * snapAlpha;
      ctx.strokeStyle = "rgba(225, 235, 250, 0.7)";
      ctx.lineWidth = 0.7;
      const pairs = [
        [0, 1, 0.72], [1, 2, 0.84], [2, 3, 0.88],
        [6, 7, 0.86], [7, 8, 0.78], [8, 9, 0.70],
        [0, 2, 0.91], [7, 9, 0.90],
      ];
      pairs.forEach(([aIdx, bIdx, tFrac]) => {
        const nIdx = Math.min(13, Math.floor(tFrac * 13));
        const a = STRAND_SPECS[aIdx].nodes[nIdx];
        const b = STRAND_SPECS[bIdx].nodes[nIdx];
        if (!a || !b) return;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.quadraticCurveTo((a.x + b.x) * 0.5, (a.y + b.y) * 0.5 + 3, b.x, b.y);
        ctx.stroke();
      });
      ctx.restore();
    }
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
