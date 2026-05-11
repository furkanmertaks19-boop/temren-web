import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "./JsonLd";

export interface BreadcrumbItem {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  /**
   * Render the JSON-LD BreadcrumbList alongside the UI.
   * Set to false if you're already injecting it elsewhere (e.g. via the
   * product schema bundle).
   * @default true
   */
  withSchema?: boolean;
  /** Optional className for the wrapper nav element. */
  className?: string;
  /** Visual style. */
  variant?: "light" | "dark";
}

/**
 * Accessible, SEO-friendly breadcrumb trail.
 * Pass the path *including* the current page as the last item.
 */
export default function Breadcrumbs({
  items,
  withSchema = true,
  className = "",
  variant = "dark",
}: BreadcrumbsProps) {
  if (!items.length) return null;

  const isDark = variant === "dark";
  const textColor = isDark ? "text-white/70" : "text-slate-500";
  const linkHover = isDark ? "hover:text-white" : "hover:text-slate-900";
  const currentColor = isDark ? "text-white" : "text-slate-900";
  const separatorColor = isDark ? "text-white/30" : "text-slate-300";

  return (
    <>
      {withSchema && <JsonLd data={breadcrumbSchema(items)} id="breadcrumbs" />}

      <nav
        aria-label="Breadcrumb"
        className={`text-xs font-bold uppercase tracking-[0.18em] ${textColor} ${className}`}
      >
        <ol
          className="flex flex-wrap items-center gap-2"
          itemScope
          itemType="https://schema.org/BreadcrumbList"
        >
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li
                key={item.path}
                className="flex items-center gap-2"
                itemScope
                itemProp="itemListElement"
                itemType="https://schema.org/ListItem"
              >
                {!isLast ? (
                  <Link
                    href={item.path}
                    className={`inline-flex items-center gap-1 transition-colors ${linkHover}`}
                    itemProp="item"
                  >
                    {index === 0 && <Home size={12} aria-hidden="true" />}
                    <span itemProp="name">{item.name}</span>
                  </Link>
                ) : (
                  <span
                    aria-current="page"
                    className={`inline-flex items-center gap-1 ${currentColor}`}
                    itemProp="item"
                  >
                    <span itemProp="name">{item.name}</span>
                  </span>
                )}
                <meta itemProp="position" content={String(index + 1)} />
                {!isLast && (
                  <ChevronRight
                    size={12}
                    className={separatorColor}
                    aria-hidden="true"
                  />
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
