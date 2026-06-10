import { useEffect, useRef } from "react";

/**
 * TorchCursor
 * -----------
 * Renders a full-viewport fixed overlay that shows a warm golden radial-gradient
 * "torch" glow wherever the cursor (or touch point) sits. Completely
 * pointer-events-none so it never blocks clicks. Uses a single div whose
 * background-image is updated directly on the DOM element (no React state /
 * re-render) for maximum performance via requestAnimationFrame.
 *
 * Customise:
 *   --torch-size   : radius of the beam  (default 380px)
 *   --torch-color  : inner glow OKLCH    (default warm gold)
 *   --torch-mid    : mid-ring color      (default amber tint)
 *   --torch-opacity: overall opacity     (default 0.18)
 */
export default function TorchCursor() {
  const overlayRef = useRef(null);
  const posRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;

    // Config
    const SIZE = 420;           // px radius of torch beam
    const INNER = "oklch(0.88 0.18 78 / 0.55)";   // warm gold core
    const MID   = "oklch(0.72 0.14 65 / 0.22)";   // amber mid-ring
    const OUTER = "oklch(0.55 0.10 55 / 0.08)";   // deep amber fade
    const EDGE  = "transparent";                   // hard cutoff

    function render() {
      const { x, y } = posRef.current;
      el.style.background = [
        `radial-gradient(${SIZE}px circle at ${x}px ${y}px,`,
        `  ${INNER} 0%,`,
        `  ${MID}   28%,`,
        `  ${OUTER} 55%,`,
        `  ${EDGE}  75%)`,
      ].join("\n");
      rafRef.current = null;
    }

    function schedule() {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(render);
      }
    }

    function onMouseMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!activeRef.current) {
        activeRef.current = true;
        el.style.opacity = "1";
      }
      schedule();
    }

    function onTouchMove(e) {
      const t = e.touches[0];
      if (!t) return;
      posRef.current = { x: t.clientX, y: t.clientY };
      if (!activeRef.current) {
        activeRef.current = true;
        el.style.opacity = "1";
      }
      schedule();
    }

    // Hide torch when cursor leaves the window
    function onMouseLeave() {
      activeRef.current = false;
      el.style.opacity = "0";
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        pointerEvents: "none",
        opacity: 0,
        transition: "opacity 0.6s ease",
        mixBlendMode: "screen",   // blends the gold glow luminously over dark bg
        willChange: "background",
      }}
    />
  );
}
