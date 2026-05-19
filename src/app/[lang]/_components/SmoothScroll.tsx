"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Lenis intercepta scroll e quebra o scroll restoration do Next.js — força topo em cada rota.
  // Ignora navegação para âncoras (#...) para não roubar o scroll de "Ver mais" / etc.
  useEffect(() => {
    if (!lenisRef.current) return;
    if (typeof window !== "undefined" && window.location.hash) return;
    lenisRef.current.scrollTo(0, { immediate: true });
  }, [pathname]);

  return <>{children}</>;
}
