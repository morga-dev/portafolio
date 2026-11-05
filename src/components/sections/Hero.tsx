import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

const socialLinks = [
  { label: "GitHub", href: site.links.github, external: true },
  { label: "LinkedIn", href: site.links.linkedin, external: true },
  { label: "Email", href: `mailto:${site.links.email}`, external: false },
] as const;

export function Hero() {
  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="scroll-mt-24 pt-16 sm:pt-20 lg:flex lg:min-h-[calc(100dvh-4.5rem)] lg:items-center lg:pt-0"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <div className="max-w-5xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
            <span>{site.profile.location}</span>
            <span
              aria-hidden="true"
              className="hidden h-px w-8 bg-line-strong sm:block"
            />
            <span>{site.profile.role}</span>
          </div>

          <h1
            id="hero-title"
            className="mt-7 font-serif text-[clamp(3rem,12vw,9rem)] leading-[0.84] tracking-[-0.05em] text-balance text-foreground"
          >
            {site.profile.name}
          </h1>

          <div className="mt-10 grid gap-8 border-t border-line pt-8 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:gap-12">
            <p className="max-w-xl text-base leading-8 text-muted text-pretty sm:text-lg">
              {site.profile.bioHero}
            </p>

            <div className="flex flex-col gap-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:flex-col md:items-start">
                <Button
                  href="#proyectos"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Ver proyectos
                </Button>
                <Button
                  href="#contacto"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  Contacto
                </Button>
              </div>

              <ul
                aria-label="Enlaces de contacto"
                className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm"
              >
                {socialLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noreferrer" : undefined}
                      className="text-muted underline-offset-4 transition-colors duration-200 hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:underline"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
