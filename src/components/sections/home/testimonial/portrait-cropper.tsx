"use client";

import { useCallback, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Cropper, { type Area } from "react-easy-crop";
import { MAX_PORTRAIT_BYTES } from "@/lib/testimonials/limits";

type Props = { image: string; file: File; onConfirm: (file: File) => void; onCancel: () => void };

export default function PortraitCropper({ image, file, onConfirm, onCancel }: Props) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [area, setArea] = useState<Area | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const onCropComplete = useCallback((_percentages: Area, pixels: Area) => setArea(pixels), []);

  async function confirmCrop() {
    if (!area || busy) return;
    setBusy(true);
    setError("");
    let bitmap: ImageBitmap | null = null;
    try {
      bitmap = await createImageBitmap(file);
      if (bitmap.width * bitmap.height > 16_000_000) throw new Error("Choose a portrait under 16 megapixels.");
      const canvas = document.createElement("canvas");
      canvas.width = 512;
      canvas.height = 512;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Your browser couldn’t crop this image.");
      context.fillStyle = "#faf7f5";
      context.fillRect(0, 0, 512, 512);
      context.drawImage(bitmap, area.x, area.y, area.width, area.height, 0, 0, 512, 512);
      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.9));
      if (!blob || blob.size > MAX_PORTRAIT_BYTES) throw new Error("The cropped portrait must be 1 MB or smaller.");
      onConfirm(new File([blob], "portrait.jpg", { type: "image/jpeg" }));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Cropping failed. Please choose another image.");
    } finally {
      bitmap?.close();
      setBusy(false);
    }
  }

  return (
    <Dialog.Root open onOpenChange={(open) => { if (!open && !busy) onCancel(); }}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/65" />
        <Dialog.Content onEscapeKeyDown={(event) => { if (busy) event.preventDefault(); }} onPointerDownOutside={(event) => { if (busy) event.preventDefault(); }} className="fixed top-1/2 left-1/2 z-50 max-h-[90svh] w-[calc(100%_-_32px)] max-w-[560px] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl bg-[#faf7f5] p-5 font-holand text-[#0d1317] shadow-xl sm:p-8">
          <Dialog.Title className="font-sangira text-[27.75px] leading-[1.1] tracking-[.03em]">Crop your portrait</Dialog.Title>
          <Dialog.Description className="mt-3 text-[13.5px] leading-normal">Drag to reposition and use the zoom control. Your portrait will be cropped to a square.</Dialog.Description>
          <div className="relative mt-5 h-[260px] overflow-hidden rounded-lg bg-[#0d1317] sm:h-[320px]">
            <Cropper image={image} crop={crop} zoom={zoom} aspect={1} onCropChange={setCrop} onZoomChange={setZoom} onCropComplete={onCropComplete} zoomWithScroll={false} onMediaLoaded={() => setError("")} />
          </div>
          <label htmlFor="portrait-zoom" className="mt-5 block text-[13.5px] font-bold">Zoom</label>
          <input id="portrait-zoom" type="range" min={1} max={3} step={0.01} value={zoom} onChange={(event) => setZoom(Number(event.target.value))} disabled={busy} className="mt-2 w-full accent-[#0d1317]" />
          {error && <p role="alert" className="mt-3 text-sm text-[#a12222]">{error}</p>}
          <div className="mt-5 flex justify-end gap-3 text-[13.5px]">
            <button type="button" onClick={onCancel} disabled={busy} className="min-h-11 rounded-lg border border-[#0d1317]/25 px-4 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50">Cancel</button>
            <button type="button" onClick={confirmCrop} disabled={busy || !area} className="min-h-11 rounded-lg bg-[#0d1317] px-4 text-[#faf7f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d1317] disabled:opacity-50">{busy ? "Cropping…" : "Use portrait"}</button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
