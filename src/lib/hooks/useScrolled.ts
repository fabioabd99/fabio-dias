"use client";

import { useEffect, useState } from "react";

// Poucos px chegam: o objetivo é reagir assim que o conteúdo começa a deslizar
// por baixo do nav, não esperar por uma secção inteira.
const DEFAULT_THRESHOLD = 24;

// True a partir do momento em que a página passa `threshold` px de scroll.
//
// Os dois navs são fixos e sem fundo, o que resulta enquanto estão sobre o topo
// do hero — aí o fundo é cor lisa. Assim que a página desliza, passa-lhes texto
// por baixo e o nav fica ilegível. Este hook diz-lhes quando pôr fundo sólido.
export function useScrolled(threshold: number = DEFAULT_THRESHOLD) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll(); // a página pode abrir já a meio (refresh ou link com âncora)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}
