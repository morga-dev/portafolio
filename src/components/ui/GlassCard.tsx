import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

export interface GlassCardProps extends ComponentPropsWithoutRef<"div"> {
	readonly className?: string;
}

export function GlassCard({ className, ...props }: GlassCardProps) {
	return (
		<div
			className={cn(
				"glass relative overflow-hidden rounded-3xl p-6",
				className,
			)}
			{...props}
		/>
	);
}
