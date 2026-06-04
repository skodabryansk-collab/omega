import logoPng from "@assets/Монтажная_область_1@3x_1780468664846.png";

interface OmegaLogoProps {
  className?: string;
  size?: number;
}

export function OmegaLogo({ className = "", size = 44 }: OmegaLogoProps) {
  return (
    <img
      src={logoPng}
      alt="OMEGA logo"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  );
}
