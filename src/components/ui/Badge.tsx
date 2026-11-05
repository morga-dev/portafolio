import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export type BadgeTone = "default" | "accent" | "outline";

export interface BadgeProps extends ComponentPropsWithoutRef<"span"> {
	readonly tone?: BadgeTone;
}

const toneClasses: Record<BadgeTone, string> = {
	default: "border-line bg-surface/70 text-muted",
	accent: "border-accent/30 bg-accent-muted text-accent-strong",
	outline: "border-line bg-transparent text-foreground",
};

export function Badge({ tone = "default", className, ...props }: BadgeProps) {
	return (
		<span
			className={cn(
				"inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-1 text-xs font-medium leading-none",
				toneClasses[tone],
				className,
			)}
			{...props}
		/>
	);
}
