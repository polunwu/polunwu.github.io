"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

type GalleryMedia = {
  src: string;
  type: "image" | "video";
};

export default function Gallery({ items }: { items: GalleryMedia[] }) {
  const [selected, setSelected] = useState<GalleryMedia | null>(null);

  return (
    <Dialog.Root open={!!selected} onOpenChange={(open) => !open && setSelected(null)}>
      <div className="columns-1 md:columns-2 gap-6">
        {items.map((media, i) => (
          <Dialog.Trigger asChild key={i}>
            <div
              className="mb-6 break-inside-avoid cursor-zoom-in"
              onClick={() => setSelected(media)}
            >
              {media.type === "video" ? (
                <video
                  src={`/${media.src}`}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full"
                />
              ) : (
                <img src={`/${media.src}`} alt="" className="w-full" />
              )}
            </div>
          </Dialog.Trigger>
        ))}
      </div>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/80 z-50" />
        <Dialog.Content
          className="fixed inset-0 z-50 flex items-center justify-center p-6 outline-none cursor-zoom-out"
          onClick={(e) => { if (e.target === e.currentTarget) setSelected(null); }}
        >
          <Dialog.Title className="sr-only">Image preview</Dialog.Title>
          <Dialog.Close className="absolute top-4 right-6 text-sm text-[var(--foreground)] bg-[var(--background)] px-2 py-1 hover:opacity-60 transition-opacity cursor-pointer">
            ✕ Close
          </Dialog.Close>
          {selected && (
            selected.type === "video" ? (
              <video
                src={`/${selected.src}`}
                autoPlay
                loop
                muted
                playsInline
                className="max-w-full max-h-full object-contain cursor-default"
              />
            ) : (
              <img
                src={`/${selected.src}`}
                alt=""
                className="max-w-full max-h-full object-contain cursor-default"
              />
            )
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
