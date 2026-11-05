import { cacheLife, cacheTag } from "next/cache";

export interface GithubRepo {
  readonly name: string;
  readonly description: string | null;
  readonly htmlUrl: string;
  readonly stars: number;
  readonly language: string | null;
  readonly topics: readonly string[];
}

export type GithubSource = "github" | "fallback";

export interface GithubReposResult {
  readonly repos: readonly GithubRepo[];
  readonly source: GithubSource;
}

const GITHUB_REPOS_URL =
  "https://api.github.com/users/morga-dev/repos?sort=updated&per_page=6";

const GITHUB_REPOS_TAG = "github-repos";

const TARGET_REPOS: readonly string[] = [
  "portafolio",
  "SkyBan-Landing",
  "morga-dev",
] as const satisfies readonly string[];

const MAX_FEATURED_REPOS = 3;

type FeaturedRepoName = (typeof TARGET_REPOS)[number];

function isFeaturedRepoName(name: string): name is FeaturedRepoName {
  return TARGET_REPOS.some((featuredName) => featuredName === name);
}

const FALLBACK_REPOS = [
  {
    name: "portafolio",
    description:
      "Portafolio personal desarrollado con Next.js, TypeScript y Tailwind CSS.",
    htmlUrl: "https://github.com/morga-dev/portafolio",
    stars: 0,
    language: "TypeScript",
    topics: [],
  },
  {
    name: "SkyBan-Landing",
    description:
      "Landing page para SkyBan, soluciones tecnológicas para el transporte agrícola.",
    htmlUrl: "https://github.com/morga-dev/SkyBan-Landing",
    stars: 0,
    language: "JavaScript",
    topics: [],
  },
  {
    name: "morga-dev",
    description: "Perfil de GitHub con una presentación de mi trabajo.",
    htmlUrl: "https://github.com/morga-dev/morga-dev",
    stars: 0,
    language: null,
    topics: [],
  },
] as const satisfies readonly GithubRepo[];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function parseTopics(value: unknown): readonly string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((topic): topic is string => typeof topic === "string");
}

function parseRepo(value: unknown): GithubRepo | null {
  if (!isRecord(value)) {
    return null;
  }

  const { name, description, html_url, stargazers_count, language, topics } =
    value;

  if (typeof name !== "string" || name.length === 0) {
    return null;
  }

  if (typeof html_url !== "string" || html_url.length === 0) {
    return null;
  }

  if (
    typeof stargazers_count !== "number" ||
    !Number.isFinite(stargazers_count)
  ) {
    return null;
  }

  if (description !== null && description !== undefined) {
    if (typeof description !== "string") {
      return null;
    }
  }

  if (language !== null && language !== undefined) {
    if (typeof language !== "string") {
      return null;
    }
  }

  return {
    name,
    description: typeof description === "string" ? description : null,
    htmlUrl: html_url,
    stars: stargazers_count,
    language: typeof language === "string" ? language : null,
    topics: parseTopics(topics),
  };
}

function filterFeaturedRepos(
  repos: readonly GithubRepo[],
): readonly GithubRepo[] {
  return repos
    .filter((repo) => isFeaturedRepoName(repo.name))
    .slice(0, MAX_FEATURED_REPOS);
}

function parseRepos(value: unknown): readonly GithubRepo[] {
  if (!Array.isArray(value)) {
    return [];
  }

  // Valido todos mis repos que vienen de GitHub
  const allValidRepos = value
    .map(parseRepo)
    .filter((repo): repo is GithubRepo => repo !== null);

  // Filtro solo los que ocupo y ordeno según TARGET_REPOS
  return allValidRepos
    .filter((repo) => TARGET_REPOS.includes(repo.name))
    .sort((a, b) => {
      const indexA = TARGET_REPOS.indexOf(a.name);
      const indexB = TARGET_REPOS.indexOf(b.name);
      return indexA - indexB;
    });
}

export async function getGithubRepos(): Promise<GithubReposResult> {
  "use cache";
  cacheLife("hours");
  cacheTag(GITHUB_REPOS_TAG);

  try {
    const response = await fetch(GITHUB_REPOS_URL, {
      headers: {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "diego-morga-portfolio",
      },
    });

    if (!response.ok) {
      return { repos: filterFeaturedRepos(FALLBACK_REPOS), source: "fallback" };
    }

    const data: unknown = await response.json();
    const repos = parseRepos(data);

    if (repos.length === 0) {
      return { repos: filterFeaturedRepos(FALLBACK_REPOS), source: "fallback" };
    }

    return { repos, source: "github" };
  } catch {
    return { repos: filterFeaturedRepos(FALLBACK_REPOS), source: "fallback" };
  }
}
