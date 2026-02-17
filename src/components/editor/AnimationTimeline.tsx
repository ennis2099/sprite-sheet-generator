import { useEditorStore } from "@/stores/editor-store";
import { useState } from "react";

export function AnimationTimeline() {
  const animation = useEditorStore((s) => s.animation);
  const sprites = useEditorStore((s) => s.sprites);
  const setFps = useEditorStore((s) => s.setFps);
  const togglePlaying = useEditorStore((s) => s.togglePlaying);
  const setCurrentFrame = useEditorStore((s) => s.setCurrentFrame);
  const removeFromAnimation = useEditorStore((s) => s.removeFromAnimation);
  const reorderAnimationFrames = useEditorStore((s) => s.reorderAnimationFrames);
  const toggleOnionSkin = useEditorStore((s) => s.toggleOnionSkin);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const frameSprites = animation.frames
    .map((id) => sprites.find((s) => s.id === id))
    .filter(Boolean);

  return (
    <div className="flex items-center gap-2" style={{
      gridColumn: "1 / -1",
      background: "var(--bg-panel)",
      borderTop: "1px solid var(--border)",
      padding: "0 8px",
    }}>
      {/* Controls */}
      <div className="flex items-center gap-1.5 shrink-0">
        <button onClick={togglePlaying}
          className="flex items-center justify-center hover:bg-[#22D3EE] transition-colors"
          style={{ width: 24, height: 24, background: "var(--cyan)", color: "#fff", fontSize: 9 }}>
          {animation.playing ? "❚❚" : "▶"}
        </button>
        <div className="flex items-center gap-0.5" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--text-dim)" }}>
          <span>FPS</span>
          <input type="range" min={1} max={30} value={animation.fps}
            onChange={(e) => setFps(Number(e.target.value))}
            style={{ width: 48, height: 2, WebkitAppearance: "none", background: "var(--bg-elevated)", outline: "none" }} />
          <span id="fps-val">{animation.fps}</span>
        </div>
        <button onClick={toggleOnionSkin} title="Onion Skin"
          className="flex items-center justify-center hover:border-[var(--text)] hover:text-[var(--text)] transition-all"
          style={{ width: 22, height: 22, border: "1px solid var(--border)", color: animation.onionSkin ? "var(--cyan)" : "var(--text-dim)", fontSize: 9, background: animation.onionSkin ? "rgba(6,182,212,0.1)" : "transparent" }}>
          OS
        </button>
      </div>

      {/* Frame strip */}
      <div className="flex gap-0.5 overflow-x-auto flex-1 py-1">
        {frameSprites.length === 0 ? (
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text-muted)" }}>
            Right-click sprite → Add to Animation
          </span>
        ) : frameSprites.map((sprite, i) => (
          <button key={`${sprite!.id}-${i}`} draggable
            onDragStart={(e) => { setDragIndex(i); e.dataTransfer.effectAllowed = "move"; }}
            onDragOver={(e) => { if (dragIndex === null) return; e.preventDefault(); setDragOverIndex(i); }}
            onDrop={(e) => { e.preventDefault(); if (dragIndex !== null && dragIndex !== i) reorderAnimationFrames(dragIndex, i); setDragIndex(null); setDragOverIndex(null); }}
            onDragEnd={() => { setDragIndex(null); setDragOverIndex(null); }}
            onClick={() => setCurrentFrame(i)}
            onContextMenu={(e) => { e.preventDefault(); removeFromAnimation(i); }}
            className="shrink-0 flex flex-col items-center justify-center cursor-pointer relative transition-all"
            style={{
              width: 40, height: 40,
              border: `1px solid ${animation.currentFrame === i ? "var(--cyan)" : "var(--border)"}`,
              background: animation.currentFrame === i ? "rgba(6,182,212,0.1)" : "transparent",
              opacity: dragIndex === i ? 0.4 : 1,
            }}>
            {sprite!.image && (
              <canvas ref={(canvas) => {
                if (canvas && sprite!.image) {
                  const ctx = canvas.getContext("2d");
                  if (ctx) {
                    canvas.width = 28; canvas.height = 28;
                    const scale = Math.min(28 / sprite!.width, 28 / sprite!.height);
                    const w = sprite!.width * scale, h = sprite!.height * scale;
                    ctx.clearRect(0, 0, 28, 28);
                    ctx.drawImage(sprite!.image, (28 - w) / 2, (28 - h) / 2, w, h);
                  }
                }
              }} width={28} height={28} />
            )}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 7, color: "var(--text-muted)", position: "absolute", bottom: 1 }}>
              {String(i + 1).padStart(2, "0")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
