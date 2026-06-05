"use client";

import { useRef, useState } from "react";
import type { ChangeEvent } from "react";
import { Camera, Loader2, X } from "lucide-react";
import { authClient } from "@/lib/auth-client";

const MAX_IMAGE_SIZE = 750 * 1024;

type ProfilePhotoUploaderProps = {
  name: string;
  email: string;
  image?: string | null;
};

function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Nao foi possivel ler a imagem."));
    reader.readAsDataURL(file);
  });
}

export function ProfilePhotoUploader({ name, email, image }: ProfilePhotoUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState(image ?? "");
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const initial = name.charAt(0).toUpperCase();

  async function saveImage(nextImage: string | null) {
    setIsSaving(true);
    setStatus("");

    const { error } = await authClient.updateUser({
      image: nextImage,
    });

    if (error) {
      setStatus("Nao foi possivel guardar a foto. Tenta novamente.");
      setIsSaving(false);
      return;
    }

    setPreview(nextImage ?? "");
    setStatus(nextImage ? "Foto atualizada." : "Foto removida.");
    setIsSaving(false);
  }

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setStatus("Escolhe um ficheiro de imagem.");
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setStatus("A imagem deve ter no maximo 750 KB.");
      return;
    }

    try {
      const dataUrl = await fileToDataUrl(file);
      await saveImage(dataUrl);
    } catch {
      setStatus("Nao foi possivel carregar a imagem.");
      setIsSaving(false);
    }
  }

  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-br from-[#163f20] via-[#2D6A2D] to-[#6ABF3C] p-5 text-white shadow-2xl shadow-[#2d6a2d]/20">
      <div className="absolute right-0 top-0 h-28 w-28 rounded-bl-full bg-white/10" />
      <div className="absolute bottom-0 right-12 h-24 w-24 rounded-full bg-[#b5ff78]/10 blur-2xl" />

      <div className="relative flex items-center gap-4">
        <div className="relative h-20 w-20 shrink-0">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="group h-20 w-20 overflow-hidden rounded-[24px] bg-white text-2xl font-black text-[#2D6A2D] shadow-lg ring-4 ring-white/20 transition-transform hover:scale-[1.02]"
            aria-label="Alterar foto de perfil"
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt={name} className="h-full w-full object-cover" />
            ) : (
              <span>{initial}</span>
            )}
            <span className="absolute inset-0 flex items-end justify-end bg-black/0 p-2 transition-colors group-hover:bg-black/20">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-[#2D6A2D] shadow-md">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
              </span>
            </span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        <div className="min-w-0 flex-1">
          <div className="mb-2 inline-flex rounded-full bg-white/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#dff5d7]">
            Perfil do cliente
          </div>
          <p className="truncate text-2xl font-black leading-tight">{name}</p>
          <p className="truncate text-sm text-white/75">{email}</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white">
              Conta Easy Clean
            </span>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="rounded-full bg-white px-3 py-1 text-xs font-black text-[#2D6A2D] shadow-sm transition-colors hover:bg-[#f0f8ec]"
              disabled={isSaving}
            >
              Alterar foto
            </button>
            {preview ? (
              <button
                type="button"
                onClick={() => saveImage(null)}
                className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white transition-colors hover:bg-white/20"
                disabled={isSaving}
              >
                <X className="h-3 w-3" />
                Remover
              </button>
            ) : null}
          </div>
          {status ? <p className="mt-2 text-xs font-medium text-white/80">{status}</p> : null}
        </div>
      </div>
    </div>
  );
}
