import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import Footer from "@/components/layout/Footer";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
	variable: "--font-instrument-serif",
	weight: "400",
	style: ["normal", "italic"],
	subsets: ["latin"],
});

const siteDescription =
	"Portafolio de Diego Morga, desarrollador frontend en Tapachula, Chiapas. Construyo interfaces web rápidas, accesibles y cuidadas al detalle.";

export const metadata: Metadata = {
	title: {
		default: "Diego Morga | Desarrollador Frontend",
		template: "%s | Diego Morga",
	},
	description: siteDescription,
	applicationName: "Diego Morga",
	authors: [{ name: "Diego Morga", url: "https://github.com/morga-dev" }],
	creator: "Diego Morga",
	keywords: [
		"Diego Morga",
		"desarrollador frontend",
		"portafolio",
		"Next.js",
		"React",
		"TypeScript",
		"Tailwind CSS",
		"Tapachula",
		"Chiapas",
		"México",
	],
	openGraph: {
		type: "website",
		locale: "es_MX",
		siteName: "Diego Morga",
		title: "Diego Morga | Desarrollador Frontend",
		description: siteDescription,
	},
	twitter: {
		card: "summary",
		title: "Diego Morga | Desarrollador Frontend",
		description: siteDescription,
	},
	robots: {
		index: true,
		follow: true,
	},
};

export const viewport: Viewport = {
	themeColor: "#05060E",
	colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
	return (
		<html
			lang="es"
			data-scroll-behavior="smooth"
			className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
		>
			<body className="flex min-h-dvh flex-col bg-background font-sans text-foreground">
				{children}
				<Footer />
			</body>
		</html>
	);
}
