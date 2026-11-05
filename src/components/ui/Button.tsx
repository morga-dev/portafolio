import Link from "next/link";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "ghost" | "outline";
export type ButtonSize = "sm" | "md" | "lg";

interface ButtonBaseProps {
	readonly variant?: ButtonVariant;
	readonly size?: ButtonSize;
	readonly className?: string;
	readonly children: ReactNode;
}

type ButtonAsButtonProps = ButtonBaseProps &
	Omit<ComponentPropsWithoutRef<"button">, keyof ButtonBaseProps> & {
		readonly href?: never;
	};

type ButtonAsLinkProps = ButtonBaseProps &
	Omit<ComponentPropsWithoutRef<typeof Link>, keyof ButtonBaseProps> & {
		readonly href: ComponentPropsWithoutRef<typeof Link>["href"];
	};

export type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

const baseClasses =
	"inline-flex cursor-pointer select-none items-center justify-center gap-2 rounded-full border font-medium transition-[color,background-color,border-color,transform,opacity] duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-accent active:scale-[0.98] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50";

const variantClasses: Record<ButtonVariant, string> = {
	primary:
		"border-accent/40 bg-accent text-accent-contrast hover:border-accent-strong hover:bg-accent-strong",
	ghost:
		"border-transparent bg-transparent text-muted hover:bg-surface/70 hover:text-foreground",
	outline:
		"border-line bg-transparent text-foreground hover:border-accent/50 hover:bg-accent-muted hover:text-accent-strong",
};

const sizeClasses: Record<ButtonSize, string> = {
	sm: "min-h-9 px-3.5 text-sm",
	md: "min-h-11 px-5 text-sm",
	lg: "min-h-12 px-6 text-base",
};

interface ButtonClassNameOptions {
	readonly variant: ButtonVariant;
	readonly size: ButtonSize;
	readonly className?: string;
}

function getButtonClassName({
	variant,
	size,
	className,
}: ButtonClassNameOptions) {
	return cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
}

export function Button(props: ButtonProps) {
	const { variant = "primary", size = "md", className, children, ...rest } =
		props;
	const classes = getButtonClassName({ variant, size, className });

	if (rest.href !== undefined) {
		const { href, ...linkProps } = rest;

		return (
			<Link href={href} className={classes} {...linkProps}>
				{children}
			</Link>
		);
	}

	const { type = "button", ...buttonProps } = rest;

	return (
		<button type={type} className={classes} {...buttonProps}>
			{children}
		</button>
	);
}
