import { Badge } from "@/components/ui/Badge";
import { GlassCard } from "@/components/ui/GlassCard";
import { site } from "@/data/site";

export function Skills() {
  return (
    <section
      id="habilidades"
      aria-labelledby="skills-title"
      className="scroll-mt-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="max-w-2xl">
          <h2
            id="skills-title"
            className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-balance text-foreground"
          >
            Habilidades
          </h2>
          <p className="mt-5 text-sm leading-7 text-muted text-pretty sm:text-base">
            Herramientas que aplico en el día a día para llevar ideas desde la
            interfaz hasta la base de datos.
          </p>
        </div>

        <GlassCard className="mt-10 p-0">
          <div className="grid divide-y divide-line lg:grid-cols-3 lg:divide-x lg:divide-y-0">
            {site.skills.map((category) => (
              <div key={category.id} className="p-6 sm:p-8">
                <h3 className="font-serif text-3xl leading-tight text-foreground">
                  {category.label}
                </h3>
                <ul
                  aria-label={`Tecnologías de ${category.label}`}
                  className="mt-5 flex flex-wrap gap-2"
                >
                  {category.items.map((item) => (
                    <li key={item}>
                      <Badge className="whitespace-normal leading-tight">
                        {item}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}
