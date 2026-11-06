import { cacheLife } from "next/cache";
import { site } from "@/data/site";

const SOCIAL_LINKS = [
  { label: "GitHub", href: site.links.github },
  { label: "LinkedIn", href: site.links.linkedin },
] as const;

async function getCurrentYear() {
  "use cache";
  cacheLife("days");

  return new Date().getFullYear();
}

export default async function Footer() {
  const currentYear = await getCurrentYear();

  return (
    <footer
      id="contacto"
      aria-labelledby="contact-title"
      className="w-full scroll-mt-24 py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
        <h2
          id="contact-title"
          className="font-serif text-5xl leading-[0.9] tracking-[-0.03em] text-foreground sm:text-6xl"
        >
          Hablemos
        </h2>

        <div className="mt-12 grid gap-12 lg:grid-cols-3 lg:gap-16">
          <div>
            <p className="text-lg text-subtle">Email</p>
            <a
              href={`mailto:${site.links.email}`}
              className="mt-2 inline-block break-all text-base font-medium leading-6 text-foreground underline-offset-4 transition-colors duration-200 hover:text-accent-strong hover:underline focus-visible:text-accent-strong focus-visible:underline"
            >
              {site.links.email}
            </a>

            <div className="mt-6">
              <p className="text-lg text-subtle">Ubicación</p>
              <p className="mt-1 text-base leading-6 text-foreground">
                {site.profile.location}
              </p>
            </div>
          </div>

          <div>
            <p className="text-lg text-subtle">Social</p>
            <ul className="mt-2 flex flex-col">
              {SOCIAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-line pb-2 mb-2 text-md text-foreground transition-colors duration-200 hover:text-accent-strong focus-visible:text-accent-strong"
                  >
                    <span>{link.label}</span>
                    <span
                      aria-hidden="true"
                      className="text-subtle transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:text-right">
            <p className="text-sm leading-6 text-muted">
              Diseñado y Desarrollado por{" "}
              <span className="text-accent font-medium">
                {site.profile.name}
              </span>
            </p>
            <p className="mt-2 text-sm leading-6 text-subtle">
              © {currentYear} {site.profile.name}. Todos los derechos
              reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
