// Demo SVG sprites matching prototype design
const DEMO_SPRITES = [
  { name: "idle_01", w: 78, h: 90, isAi: true, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="13" y="3" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="11" y="10" width="10" height="8" fill="#06B6D4"/><rect x="11" y="18" width="4" height="8" fill="#0891B2"/><rect x="17" y="18" width="4" height="8" fill="#0891B2"/><rect x="22" y="8" width="2" height="12" fill="#F59E0B"/></svg>` },
  { name: "run_01", w: 58, h: 66, isAi: true, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="14" y="3" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="13" y="10" width="10" height="7" fill="#06B6D4"/><rect x="10" y="17" width="4" height="9" fill="#0891B2"/><rect x="19" y="17" width="4" height="7" fill="#0891B2"/></svg>` },
  { name: "run_02", w: 58, h: 66, isAi: true, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="14" y="4" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="13" y="11" width="10" height="7" fill="#06B6D4"/><rect x="12" y="18" width="4" height="8" fill="#0891B2"/><rect x="18" y="18" width="4" height="8" fill="#0891B2"/></svg>` },
  { name: "run_03", w: 58, h: 60, isAi: true, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="15" y="3" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="14" y="10" width="10" height="7" fill="#06B6D4"/><rect x="17" y="17" width="4" height="9" fill="#0891B2"/><rect x="11" y="17" width="4" height="7" fill="#0891B2"/></svg>` },
  { name: "jump_01", w: 58, h: 66, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="13" y="2" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="11" y="9" width="10" height="7" fill="#06B6D4"/><rect x="10" y="16" width="4" height="6" fill="#0891B2"/><rect x="17" y="16" width="4" height="6" fill="#0891B2"/></svg>` },
  { name: "attack_01", w: 62, h: 72, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="10" y="4" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="8" y="11" width="10" height="8" fill="#06B6D4"/><rect x="8" y="19" width="4" height="8" fill="#0891B2"/><rect x="14" y="19" width="4" height="8" fill="#0891B2"/><rect x="19" y="3" width="2" height="14" fill="#F59E0B"/></svg>` },
  { name: "hit_01", w: 58, h: 66, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="15" y="5" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="14" y="12" width="10" height="7" fill="#06B6D4"/><rect x="16" y="19" width="4" height="8" fill="#0891B2"/><rect x="10" y="19" width="4" height="7" fill="#0891B2"/></svg>` },
  { name: "fall_01", w: 58, h: 66, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><rect x="13" y="6" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="11" y="13" width="10" height="7" fill="#06B6D4"/><rect x="11" y="20" width="5" height="6" fill="#0891B2"/><rect x="17" y="20" width="5" height="4" fill="#0891B2"/></svg>` },
  { name: "sword_01", w: 28, h: 34, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="7" y="1" width="2" height="10" fill="#F59E0B"/><rect x="5" y="10" width="6" height="2" fill="#92400E"/><rect x="6" y="12" width="4" height="3" fill="#78350F"/></svg>` },
  { name: "coin_01", w: 24, h: 24, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#F59E0B"/><circle cx="8" cy="8" r="4" fill="#D97706"/></svg>` },
  { name: "potion_01", w: 28, h: 30, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><rect x="6" y="1" width="4" height="3" fill="#94A3B8"/><rect x="5" y="4" width="6" height="8" rx="2" fill="#22C55E" opacity="0.8"/></svg>` },
  { name: "gem_01", w: 24, h: 24, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><polygon points="8,2 14,7 11,14 5,14 2,7" fill="#06B6D4"/><polygon points="8,2 11,7 8,14 5,7" fill="#22D3EE" opacity="0.5"/></svg>` },
  { name: "shield_01", w: 26, h: 26, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M8 1L2 4v5c0 3.5 6 6 6 6s6-2.5 6-6V4z" fill="#0891B2"/></svg>` },
  { name: "heart_01", w: 22, h: 22, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M8 14s-5.5-3.5-5.5-7c0-2 1.5-3.5 3.5-3.5 1.2 0 2 .8 2 .8s.8-.8 2-.8c2 0 3.5 1.5 3.5 3.5 0 3.5-5.5 7-5.5 7z" fill="#EF4444"/></svg>` },
  { name: "key_01", w: 22, h: 26, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><circle cx="5" cy="5" r="3" fill="none" stroke="#F59E0B" stroke-width="2"/><rect x="7" y="4" width="7" height="2" fill="#F59E0B"/><rect x="12" y="6" width="2" height="3" fill="#F59E0B"/></svg>` },
];

export function loadDemoSprites(): Promise<
  { id: string; name: string; file: null; image: HTMLImageElement; width: number; height: number; trimmed: boolean; isAi: boolean }[]
> {
  return Promise.all(
    DEMO_SPRITES.map(
      (s) =>
        new Promise<{ id: string; name: string; file: null; image: HTMLImageElement; width: number; height: number; trimmed: boolean; isAi: boolean }>((resolve) => {
          const img = new Image();
          img.onload = () =>
            resolve({ id: crypto.randomUUID(), name: s.name, file: null, image: img, width: s.w, height: s.h, trimmed: false, isAi: s.isAi });
          img.src = "data:image/svg+xml," + encodeURIComponent(s.svg);
        })
    )
  );
}
