import logoMark from "@/assets/cloudfile-logo-v2.png.asset.json";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  variant?: "default" | "onDark";
  className?: string;
};

export function Logo({ size = 36, showWordmark = true, variant = "default", className = "" }: LogoProps) {
  const wordmarkColor = variant === "onDark" ? "text-white" : "text-[#0F172A]";
  return (
    <div className={`flex items-center gap-2.5 group ${className}`}>
      <img
        src={logoMark.url}
        alt="CloudFile"
        width={size}
        height={size}
        className="transition-transform duration-300 group-hover:scale-105 drop-shadow-[0_2px_10px_rgba(30,94,255,0.18)]"
        style={{ width: size, height: size }}
      />
      {showWordmark && (
        <span className={`font-bold tracking-tight ${wordmarkColor}`} style={{ fontSize: Math.max(14, size * 0.5) }}>
          CloudFile
        </span>
      )}
    </div>
  );
}
