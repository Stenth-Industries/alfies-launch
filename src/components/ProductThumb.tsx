import Image from "next/image";
import { ImageIcon } from "@/components/icons";

type Props = {
  /** Render path from @/data/renders; omitted when none was supplied. */
  src?: string;
  alt?: string;
};

/**
 * Product shot, falling back to a placeholder for the flavours the client
 * hasn't supplied a render for. Both states fill the same `.p-thumb` box so a
 * grid of mixed cards stays aligned.
 */
export default function ProductThumb({ src, alt }: Props) {
  if (!src) {
    return (
      <div className="p-thumb" aria-hidden="true">
        <ImageIcon />
        <span>Photo coming soon</span>
      </div>
    );
  }

  return (
    <div className="p-thumb has-render">
      <Image
        src={src}
        alt={alt ?? ""}
        width={900}
        height={900}
        sizes="(max-width: 620px) 45vw, (max-width: 960px) 30vw, 22vw"
      />
    </div>
  );
}
