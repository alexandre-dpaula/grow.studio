"use client";

import { ArrowRight } from "lucide-react";
import Button from "@/components/Button";
import { useLanguage } from "@/components/LanguageProvider";
import Container from "@/layout/Container";
import Reveal from "@/components/Reveal";
import { ShaderGradient, ShaderGradientCanvas } from "shadergradient";

export default function CTASection() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="section-spacing">
      <Container>
        <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[color:var(--bg-secondary)] p-10 md:p-16">
          <div className="pointer-events-none absolute inset-0">
            <ShaderGradientCanvas
              style={{ position: "absolute", inset: 0, borderRadius: 28 }}
            >
              <ShaderGradient
                animate="off"
                axesHelper="off"
                brightness={1.2}
                cAzimuthAngle={180}
                cDistance={3.6}
                cPolarAngle={90}
                cameraZoom={1}
                color1="#000000"
                color2="#0000a3"
                color3="#0cb18b"
                destination="onCanvas"
                embedMode="off"
                envPreset="city"
                format="gif"
                fov={45}
                frameRate={10}
                gizmoHelper="hide"
                grain="on"
                lightType="3d"
                pixelDensity={1}
                positionX={-1.4}
                positionY={0}
                positionZ={0}
                range="disabled"
                rangeEnd={35.3}
                rangeStart={0}
                reflection={0.4}
                rotationX={0}
                rotationY={10}
                rotationZ={50}
                shader="defaults"
                type="plane"
                uAmplitude={1}
                uDensity={1.3}
                uFrequency={5.5}
                uSpeed={0.4}
                uStrength={4}
                uTime={0}
                wireframe={false}
              />
            </ShaderGradientCanvas>
            <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0f]/70 via-[#0b0b0f]/35 to-transparent" />
          </div>
          <Reveal className="relative z-10">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/50">
              {t.cta.eyebrow}
            </p>
            <h2 className="mt-4 font-heading text-[clamp(2.2rem,5vw,4rem)] font-bold">
              {t.cta.title}
            </h2>
            <p className="mt-4 max-w-2xl text-base text-white/70">
              {t.cta.description}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button icon={<ArrowRight size={16} />}>{t.cta.primary}</Button>
              <Button variant="secondary" icon={<ArrowRight size={16} />}>
                {t.cta.secondary}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
