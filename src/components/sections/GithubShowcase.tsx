import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { getGithubRepos } from "@/services/github";

function StarIcon() {
	return (
		<svg
			aria-hidden="true"
			viewBox="0 0 16 16"
			className="size-3.5 fill-current"
		>
			<path d="M8 1.5l1.8 3.65 4.03.59-2.92 2.84.69 4.02L8 10.7l-3.6 1.9.69-4.02L2.17 5.74l4.03-.59L8 1.5z" />
		</svg>
	);
}

export async function GithubShowcase() {
	const { repos, source } = await getGithubRepos();
	const isFallback = source === "fallback";

	return (
		<section
			id="proyectos"
			aria-labelledby="projects-title"
			className="scroll-mt-24"
		>
			<div className="mx-auto w-full max-w-6xl px-6 sm:px-8">
				<div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-2xl">
						<h2
							id="projects-title"
							className="font-serif text-[clamp(2.5rem,5vw,4rem)] leading-[0.95] tracking-[-0.03em] text-balance text-foreground"
						>
							Proyectos
						</h2>
						<p className="mt-5 text-sm leading-7 text-muted text-pretty sm:text-base">
							Una selección de repositorios públicos donde exploro interfaces,
							APIs y producto.
						</p>
					</div>

					{isFallback ? (
						<Badge tone="outline" className="w-fit">
							Selección local
						</Badge>
					) : null}
				</div>

				{isFallback ? (
					<p className="mt-4 max-w-2xl text-sm leading-6 text-subtle">
						GitHub no está disponible en este momento. Mostramos una
						selección de proyectos.
					</p>
				) : null}

				<div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
					{repos.map((repo) => (
						<GlassCard
							key={repo.name}
							className="flex h-full flex-col p-6 transition-[border-color,background-color] duration-200 hover:border-accent/40 hover:bg-surface/60"
						>
							<div className="flex items-start justify-between gap-4">
								<h3 className="break-words font-serif text-2xl leading-tight text-foreground">
									{repo.name}
								</h3>
								<span
									aria-label={`${repo.stars} estrellas`}
									className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-line px-2.5 py-1 text-xs font-medium text-subtle"
								>
									<StarIcon />
									{repo.stars}
								</span>
							</div>

							<p className="mt-4 flex-1 text-sm leading-7 text-muted text-pretty">
								{repo.description ?? "Sin descripción disponible."}
							</p>

							{repo.language !== null || repo.topics.length > 0 ? (
								<ul
									aria-label={`Tecnologías de ${repo.name}`}
									className="mt-5 flex flex-wrap gap-2"
								>
									{repo.language !== null ? (
										<li>
											<Badge tone="accent">{repo.language}</Badge>
										</li>
									) : null}
									{repo.topics.map((topic) => (
										<li key={topic}>
											<Badge>{topic}</Badge>
										</li>
									))}
								</ul>
							) : null}

							<div className="mt-6 border-t border-line pt-5">
								<Button
									href={repo.htmlUrl}
									target="_blank"
									rel="noreferrer"
									variant="outline"
									size="sm"
									className="w-full"
								>
									Ver repositorio
								</Button>
							</div>
						</GlassCard>
					))}
				</div>
			</div>
		</section>
	);
}
