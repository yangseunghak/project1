import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "blue";
  download?: boolean;
};

export function ButtonLink({ href, children, variant = "primary", download }: Props) {
  const className = variant === "blue" ? "btn btn-blue" : variant === "secondary" ? "btn btn-secondary" : "btn btn-primary";
  return (
    <Link className={className} href={href} download={download}>
      <span>{children}</span>
      <ArrowRight size={18} aria-hidden />
    </Link>
  );
}
