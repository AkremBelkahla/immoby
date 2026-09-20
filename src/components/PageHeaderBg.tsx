interface PageHeaderBgProps {
  title: string;
  subtitle?: string;
}

export function PageHeaderBg({ title, subtitle }: PageHeaderBgProps) {
  return (
    <div className="bg-gradient-to-b from-card to-transparent py-12 lg:py-16">
      <div className="container">
        <h1 className="text-3xl font-semibold text-ink lg:text-5xl/snug">
          {title}
        </h1>
        <span className="mt-3 block h-0.5 w-36 rounded-full bg-gradient-to-r from-primary via-primary/70 to-transparent" />
        {subtitle && (
          <p className="mt-4 max-w-2xl text-sm text-gray lg:text-base">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
