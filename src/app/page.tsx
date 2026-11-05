import Navbar from "@/components/layout/Navbar";
import { About } from "@/components/sections/About";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";

export default function Home() {
	return (
		<>
			<a
				href="#contenido"
				className="fixed left-4 top-4 z-[60] -translate-y-24 rounded-full border border-accent/40 bg-background px-4 py-2 text-sm text-accent transition-transform duration-200 focus:translate-y-0"
			>
				Saltar al contenido
			</a>

			<Navbar />

			<main
				id="contenido"
				className="flex-1 space-y-24 pb-24 md:space-y-32 md:pb-32"
			>
				<Hero />
				<About />
				<Skills />
			</main>
		</>
	);
}
