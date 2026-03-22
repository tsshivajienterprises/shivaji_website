import { useEffect, useRef } from "react";

/* ── Window path generator (one path element per building) ── */
function winPath(x, yt, floors, cols, w, fh = 20, ww = 6, wh = 11) {
  const gap = (w - cols * ww) / (cols + 1);
  let d = "";
  for (let f = 0; f < Math.max(0, floors - 1); f++) {
    for (let c = 0; c < cols; c++) {
      const wx = x + gap + c * (ww + gap);
      const wy = yt + 8 + f * fh;
      d += `M${wx},${wy}h${ww}v${wh}h${-ww}Z`;
    }
  }
  return d;
}

/* ── High-rise / apartment building ── */
function Tower({ x, w, floors, cols = 3, antenna = false }) {
  const fh = 20, bh = floors * fh, yt = 600 - bh;
  const ww = Math.max(4, Math.floor((w - 16 - (cols - 1) * 4) / cols));
  return (
    <>
      <path d={`M${x},600V${yt}H${x + w}V600`} fill="none" />
      <path d={winPath(x, yt, floors, cols, w, fh, ww, 11)} fill="none" strokeWidth="0.4" />
      {antenna && <line x1={x + w / 2} y1={yt} x2={x + w / 2} y2={yt - 44} strokeWidth="0.8" />}
    </>
  );
}

/* ── Villa with pitched roof ── */
function Villa({ x, w, floors = 2 }) {
  const fh = 34, bh = floors * fh, yt = 600 - bh, rh = 44, ws = 14;
  const dx = x + w / 2 - 8, dh = 26, archY = 600 - dh, am = archY + dh * 0.42;
  let wp = `M${x+10},${yt+bh-fh+10}h${ws}v${ws}h${-ws}ZM${x+w-10-ws},${yt+bh-fh+10}h${ws}v${ws}h${-ws}Z`;
  if (floors > 1) wp += `M${x+10},${yt+10}h${ws}v${ws}h${-ws}ZM${x+w-10-ws},${yt+10}h${ws}v${ws}h${-ws}ZM${x+w/2-ws/2},${yt+10}h${ws}v${ws}h${-ws}Z`;
  return (
    <>
      <path d={`M${x},600V${yt}H${x+w}V600`} fill="none" />
      <path d={`M${x-4},${yt}L${x+w/2},${yt-rh}L${x+w+4},${yt}`} fill="none" />
      <path d={`M${x+w*.68},${yt-rh*.52}h8v${rh*.38}h-8Z`} fill="none" strokeWidth="0.6" />
      <path d={wp} fill="none" strokeWidth="0.5" />
      <path d={`M${dx},600V${am}A8,${dh*.42} 0 0 1 ${dx+16},${am}V600`} fill="none" strokeWidth="0.5" />
    </>
  );
}

/* ── Building data ── */
const TOWERS_L1 = [
  { x:-80,w:75,floors:22,cols:3,antenna:true },{ x:25,w:58,floors:18,cols:2 },
  { x:105,w:85,floors:24,cols:4,antenna:true },{ x:212,w:65,floors:20,cols:3 },
  { x:300,w:78,floors:22,cols:3,antenna:true },{ x:400,w:55,floors:19,cols:2 },
  { x:475,w:88,floors:23,cols:4,antenna:true },{ x:585,w:70,floors:21,cols:3 },
  { x:680,w:60,floors:18,cols:2,antenna:true },{ x:763,w:85,floors:25,cols:4 },
  { x:870,w:68,floors:22,cols:3,antenna:true },{ x:962,w:75,floors:20,cols:3 },
  { x:1060,w:58,floors:23,cols:2,antenna:true },{ x:1140,w:82,floors:21,cols:3 },
  { x:1245,w:65,floors:24,cols:3,antenna:true },{ x:1335,w:88,floors:19,cols:4 },
  { x:1448,w:72,floors:22,cols:3,antenna:true },{ x:1545,w:58,floors:20,cols:2 },
  { x:1625,w:85,floors:23,cols:4,antenna:true },{ x:1735,w:65,floors:21,cols:3 },
  { x:1825,w:78,floors:24,cols:3,antenna:true },{ x:1930,w:60,floors:22,cols:2 },
  { x:2010,w:82,floors:20,cols:3,antenna:true },
];

const TOWERS_L2 = [
  { x:-60,w:82,floors:11,cols:3 },{ x:55,w:65,floors:9,cols:2 },
  { x:145,w:90,floors:12,cols:4 },{ x:262,w:70,floors:10,cols:3 },
  { x:360,w:85,floors:11,cols:3 },{ x:472,w:62,floors:10,cols:2 },
  { x:558,w:88,floors:12,cols:3 },{ x:672,w:72,floors:11,cols:3 },
  { x:775,w:90,floors:10,cols:4 },{ x:892,w:65,floors:12,cols:2 },
  { x:980,w:80,floors:11,cols:3 },{ x:1085,w:70,floors:10,cols:3 },
  { x:1180,w:88,floors:12,cols:4 },{ x:1298,w:65,floors:11,cols:2 },
  { x:1388,w:82,floors:10,cols:3 },{ x:1498,w:70,floors:12,cols:3 },
  { x:1598,w:90,floors:11,cols:4 },{ x:1718,w:65,floors:10,cols:2 },
  { x:1808,w:80,floors:12,cols:3 },{ x:1920,w:72,floors:11,cols:3 },
];

const VILLAS = [
  { x:-10, w:110,floors:2 },{ x:125, w:92, floors:1 },{ x:238, w:118,floors:2 },
  { x:378, w:96, floors:2 },{ x:496, w:112,floors:1 },{ x:628, w:102,floors:2 },
  { x:752, w:118,floors:2 },{ x:892, w:92, floors:1 },{ x:1006,w:110,floors:2 },
  { x:1138,w:102,floors:2 },{ x:1262,w:96, floors:1 },{ x:1380,w:116,floors:2 },
  { x:1518,w:102,floors:2 },{ x:1642,w:92, floors:1 },{ x:1756,w:112,floors:2 },
  { x:1890,w:96, floors:2 },
];

/* ── Main component ── */
export default function BuildingBackground() {
  const l1 = useRef(null), l2 = useRef(null), l3 = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let raf;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    let gx = 50, gy = 50; // glow position %

    const onMove = (e) => {
      tx = (e.clientX / window.innerWidth - 0.5);
      ty = (e.clientY / window.innerHeight - 0.5);
      gx = (e.clientX / window.innerWidth) * 100;
      gy = (e.clientY / window.innerHeight) * 100;
    };

    const tick = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (l1.current) l1.current.setAttribute("transform", `translate(${cx*16},${cy*8})`);
      if (l2.current) l2.current.setAttribute("transform", `translate(${cx*28},${cy*14})`);
      if (l3.current) l3.current.setAttribute("transform", `translate(${cx*42},${cy*20})`);
      if (glowRef.current) {
        glowRef.current.style.left = `${gx}%`;
        glowRef.current.style.top = `${gy}%`;
      }
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* Cursor glow */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(212,175,55,0.07) 0%, transparent 65%)",
          transform: "translate(-50%,-50%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out",
          pointerEvents: "none",
        }}
      />

      <svg
        viewBox="0 0 1920 600"
        preserveAspectRatio="xMidYMax slice"
        xmlns="http://www.w3.org/2000/svg"
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      >
        {/* Layer 1 — Distant skyscrapers */}
        <g ref={l1} stroke="#D4AF37" opacity="0.055" className="bld-l1">
          {TOWERS_L1.map((t, i) => <Tower key={i} {...t} />)}
        </g>
        {/* Layer 2 — Mid-rise apartments */}
        <g ref={l2} stroke="#D4AF37" opacity="0.07" className="bld-l2">
          {TOWERS_L2.map((t, i) => <Tower key={i} {...t} />)}
        </g>
        {/* Layer 3 — Foreground villas */}
        <g ref={l3} stroke="#D4AF37" opacity="0.10" className="bld-l3">
          {VILLAS.map((v, i) => <Villa key={i} {...v} />)}
        </g>
      </svg>
    </div>
  );
}
