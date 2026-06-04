"use client";

import { useEffect, useMemo, useState } from "react";
import { Apple, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

function isIosDevice() {
  if (typeof window === "undefined") return false;
  return /iphone|ipad|ipod/i.test(window.navigator.userAgent);
}

function isStandalone() {
  if (typeof window === "undefined") return false;
  const navigatorWithStandalone = window.navigator as Navigator & { standalone?: boolean };
  return window.matchMedia("(display-mode: standalone)").matches || Boolean(navigatorWithStandalone.standalone);
}

export function MobileInstallPrompt() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("easyclean-install-dismissed") === "1";
  });
  const ios = useMemo(() => isIosDevice(), []);
  const alreadyInstalled = useMemo(() => isStandalone(), []);

  useEffect(() => {
    function handleBeforeInstallPrompt(event: Event) {
      event.preventDefault();
      setInstallEvent(event as BeforeInstallPromptEvent);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    return () => window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
  }, []);

  if (alreadyInstalled || dismissed || (!installEvent && !ios)) {
    return null;
  }

  async function handleInstall() {
    if (!installEvent) return;

    await installEvent.prompt();
    const choice = await installEvent.userChoice;
    if (choice.outcome === "accepted") {
      window.localStorage.setItem("easyclean-install-dismissed", "1");
      setDismissed(true);
    }
    setInstallEvent(null);
  }

  function closePrompt() {
    window.localStorage.setItem("easyclean-install-dismissed", "1");
    setDismissed(true);
  }

  return (
    <div className="mt-6 max-w-xl rounded-lg border border-[#dbe8d4] bg-white/92 p-4 text-[#102316] shadow-lg shadow-[#245f2f]/10 backdrop-blur">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#eef8e8] text-[#2d6a2d]">
          {ios ? <Apple className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-[#102316]">Usa a Easy Clean como app</p>
          <p className="mt-1 text-sm leading-6 text-[#475569]">
            {ios
              ? "No iPhone, toca em Partilhar e depois em Adicionar ao ecra principal."
              : "Instala no Android para abrir rapido, direto pelo telemovel."}
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {installEvent ? (
              <Button type="button" size="sm" className="bg-[#2d6a2d] text-white hover:bg-[#245f2f]" onClick={handleInstall}>
                Instalar app
              </Button>
            ) : null}
            <Button type="button" size="sm" variant="outline" className="border-[#dbe8d4] text-[#245f2f] hover:bg-[#eef8e8]" onClick={closePrompt}>
              Agora nao
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
