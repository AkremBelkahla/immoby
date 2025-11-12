import pageHeaderBg from "@/assets/page-header.jpg";

interface PageHeaderBgProps {
  title: string;
  subtitle?: string;
}

export function PageHeaderBg({ title, subtitle }: PageHeaderBgProps) {
  return (
    <div className="relative h-[200px] md:h-[250px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${pageHeaderBg})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
      </div>
      
      <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-2 animate-fade-in">
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg md:text-xl opacity-90 animate-fade-in">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
