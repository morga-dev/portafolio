import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/data/site";

export function About() {
  return (
    <section
      id="sobre-mi"
      aria-labelledby="about-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <h2
              id="about-title"
              className="max-w-md font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-balance text-foreground"
            >
              Sobre mí
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-7 text-muted text-pretty">
              Del frontend al backend, priorizo claridad, mantenibilidad y
              resultados que se puedan usar.
            </p>

            <dl className="mt-8 max-w-sm space-y-4 border-t border-line pt-6 text-sm">
              <div>
                <dt className="text-subtle">Ubicación</dt>
                <dd className="mt-1 text-foreground">
                  {site.profile.location}
                </dd>
              </div>
              <div>
                <dt className="text-subtle">Enfoque</dt>
                <dd className="mt-1 text-foreground">
                  Full Stack, APIs REST e IA aplicada
                </dd>
              </div>
            </dl>
          </div>

          <GlassCard className="p-8 sm:p-10">
            <p className="text-base leading-8 text-muted text-pretty sm:text-lg sm:leading-9">
              {site.profile.bioAbout}
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}
