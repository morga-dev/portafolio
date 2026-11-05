export interface SiteProfile {
  readonly name: string;
  readonly role: string;
  readonly location: string;
  readonly bioHero: string;
  readonly bioAbout: string;
}

export interface SiteLinks {
  readonly github: string;
  readonly linkedin: string;
  readonly email: string;
}

export interface SkillCategory {
  readonly id: string;
  readonly label: string;
  readonly items: readonly string[];
}

export interface SiteData {
  readonly profile: SiteProfile;
  readonly links: SiteLinks;
  readonly skills: readonly SkillCategory[];
}

export const site = {
  profile: {
    name: "Diego Morga",
    role: "Desarrollador de Software",
    location: "Tapachula, Chiapas, México",
    bioHero:
      "Estudiante de Ingeniería de Software y Desarrollador Full Stack. Construyo aplicaciones web robustas, integro APIs REST y diseño soluciones que resuelven problemas reales.",
    bioAbout:
      "Soy estudiante de Ingeniería de Software, próximo a egresar en 2026. Actualmente trabajo modernizando y digitalizando trámites municipales en Tapachula. Tengo experiencia desarrollando interfaces con Angular y React, construyendo backends con NestJS y gestionando bases de datos SQL. Me especializo en comprender sistemas existentes, resolver bugs complejos y acelerar mi desarrollo orquestando flujos de trabajo con Inteligencia Artificial generativa y agentes de código.",
  },
  links: {
    github: "https://github.com/morga-dev",
    linkedin: "https://www.linkedin.com/in/diego-morga",
    email: "d.morga.dev@gmail.com",
  },
  skills: [
    {
      id: "frontend",
      label: "Frontend",
      items: [
        "Angular",
        "React",
        "Tailwind CSS",
        "TypeScript",
        "JavaScript",
        "HTML5/CSS3",
      ],
    },
    {
      id: "backend-data",
      label: "Backend & BD",
      items: [
        "Node.js",
        "NestJS",
        "Express.js",
        "APIs REST",
        "MySQL",
        "PostgreSQL",
        "MongoDB",
      ],
    },
    {
      id: "tools",
      label: "Herramientas",
      items: [
        "Git",
        "GitHub",
        "Docker",
        "Vercel",
        "Railway",
        "Render",
        "Insomnia",
        "Postman",
        "AI Agents",
      ],
    },
  ],
} as const satisfies SiteData;
