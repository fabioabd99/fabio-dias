interface FooterDict {
  built: string;
  top: string;
  copy: string;
}

interface Props {
  dict: FooterDict;
}

export default function Footer({ dict }: Props) {
  return (
    <footer
      className="bg-ink text-bg flex justify-between flex-wrap gap-4 p-8 text-[12px] opacity-70 max-md:p-5"
      style={{
        fontFamily: "var(--font-jetbrains)",
        borderTop: "1.5px solid rgba(255,255,255,0.2)",
      }}
    >
      <span>{dict.copy}</span>
      <span>{dict.built}</span>
      <span>
        ↑ <a href="#top" className="hover:opacity-100 transition-opacity duration-200">{dict.top}</a>
      </span>
    </footer>
  );
}
