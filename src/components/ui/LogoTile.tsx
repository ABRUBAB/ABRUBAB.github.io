import Image from "next/image";
import { cn } from "@/lib/cn";

/** An organisation mark on a white (or black) tile. */
export default function LogoTile({ src, dark, alt, size = 56 }: { src: string; dark?: boolean; alt: string; size?: number }) {
  return (
    <span
      className={cn(
        "grid shrink-0 place-items-center overflow-hidden rounded-2xl p-1.5 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.12)]",
        dark ? "bg-black" : "bg-white",
      )}
      style={{ width: size, height: size }}
    >
      <Image src={src} alt={alt} width={96} height={96} className="size-full object-contain" />
    </span>
  );
}
