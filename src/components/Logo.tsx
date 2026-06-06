import logoMark from "@/assets/cloudfile-mark.png.asset.json";

type LogoProps = {
  size?: number;
  showWordmark?: boolean;
  variant?: "default" | "onDark";
  className?: string;
};

export function Logo({ size = 32, showWordmark = true, variant = "default", className = "" }: LogoProps) {
  const wordmarkColor = variant === "onDark" ? "text-white" : "text-foreground";
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img
        src={logoMark.url}
        alt="CloudFile"
        width={size}
        height={size}
        className={variant === "onDark" ? "invert brightness-0 contrast-100" : ""}
        style={{ width: size, height: size }}
      />
      {showWordmark && (
        <span className={`font-bold tracking-tight ${wordmarkColor}`} style={{ fontSize: size * 0.55 }}>
          CloudFile
        </span>
      )}
    </div>
  );
}
