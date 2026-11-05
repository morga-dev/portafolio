import Navbar from "@/components/layout/Navbar";

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

			<main id="contenido" className="flex-1" />
		</>
	);
}
