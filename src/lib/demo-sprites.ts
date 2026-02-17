// Demo SVG sprites matching prototype design
const DEMO_SPRITES = [
  { name: "idle_01", w: 78, h: 90, isAi: true, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="13" y="3" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="11" y="10" width="10" height="8" fill="#06B6D4"/><rect x="11" y="18" width="4" height="8" fill="#0891B2"/><rect x="17" y="18" width="4" height="8" fill="#0891B2"/><rect x="22" y="8" width="2" height="12" fill="#F59E0B"/></svg>` },
  { name: "run_01", w: 58, h: 66, isAi: true, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="14" y="3" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="13" y="10" width="10" height="7" fill="#06B6D4"/><rect x="10" y="17" width="4" height="9" fill="#0891B2"/><rect x="19" y="17" width="4" height="7" fill="#0891B2"/></svg>` },
  { name: "run_02", w: 58, h: 66, isAi: true, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="14" y="4" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="13" y="11" width="10" height="7" fill="#06B6D4"/><rect x="12" y="18" width="4" height="8" fill="#0891B2"/><rect x="18" y="18" width="4" height="8" fill="#0891B2"/></svg>` },
  { name: "run_03", w: 58, h: 60, isAi: true, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="15" y="3" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="14" y="10" width="10" height="7" fill="#06B6D4"/><rect x="17" y="17" width="4" height="9" fill="#0891B2"/><rect x="11" y="17" width="4" height="7" fill="#0891B2"/></svg>` },
  { name: "jump_01", w: 58, h: 66, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="13" y="2" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="11" y="9" width="10" height="7" fill="#06B6D4"/><rect x="10" y="16" width="4" height="6" fill="#0891B2"/><rect x="17" y="16" width="4" height="6" fill="#0891B2"/></svg>` },
  { name: "attack_01", w: 62, h: 72, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="10" y="4" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="8" y="11" width="10" height="8" fill="#06B6D4"/><rect x="8" y="19" width="4" height="8" fill="#0891B2"/><rect x="14" y="19" width="4" height="8" fill="#0891B2"/><rect x="19" y="3" width="2" height="14" fill="#F59E0B"/></svg>` },
  { name: "hit_01", w: 58, h: 66, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="15" y="5" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="14" y="12" width="10" height="7" fill="#06B6D4"/><rect x="16" y="19" width="4" height="8" fill="#0891B2"/><rect x="10" y="19" width="4" height="7" fill="#0891B2"/></svg>` },
  { name: "fall_01", w: 58, h: 66, isAi: false, svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="13" y="6" width="7" height="6" rx="1" fill="#22D3EE"/><rect x="11" y="13" width="10" height="7" fill="#06B6D4"/><rect x="11" y="20" width="5" height="6" fill="#0891B2"/><rect x="17" y="20" width="5" height="4" fill="#0891B2"/></svg>` },
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
