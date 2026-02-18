import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";

const logos = [
  "+ Conteúdos",
  "+ Estratégia",
  "+ Autoridade",
  "+ Sistemas",
  "+ Escala",
  "+ Crescimento",
];

export default function TrustStrip() {
  return (
    <section className="bg-[color:var(--bg-secondary)]">
      <Container>
        <Reveal className="py-10">
          <div className="flex flex-wrap items-center justify-between gap-6 text-xs font-semibold uppercase tracking-[0.35em] text-white/40">
            {logos.map((logo) => (
              <span
                key={logo}
                className="transition-all duration-300 hover:text-white/80"
              >
                {logo}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
