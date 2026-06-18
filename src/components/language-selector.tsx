"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

type LanguageCode = "pt" | "en" | "fr" | "de" | "es";

type Language = {
  code: LanguageCode;
  label: string;
  flagSrc: string;
  name: string;
};

const languages: Language[] = [
  { code: "pt", label: "PT", flagSrc: "/flags/pt.svg", name: "Português" },
  { code: "en", label: "EN", flagSrc: "/flags/en.svg", name: "English" },
  { code: "fr", label: "FR", flagSrc: "/flags/fr.svg", name: "Français" },
  { code: "de", label: "DE", flagSrc: "/flags/de.svg", name: "Deutsch" },
  { code: "es", label: "ES", flagSrc: "/flags/es.svg", name: "Español" },
];

const translations: Record<Exclude<LanguageCode, "pt">, Record<string, string>> = {
  en: {
    "Como funciona": "How it works",
    "Serviços": "Services",
    "Nossos serviços": "Our services",
    "Entrar": "Login",
    "Criar conta": "Create account",
    "Lavandaria ao domicílio": "Home laundry",
    "Roupa limpa,": "Clean laundry,",
    "sem perder tempo.": "without losing time.",
    "Agenda recolha, paga online e acompanha o pedido até à entrega. Tudo numa conta Easy Clean.": "Schedule pickup, pay online and track the order until delivery. Everything in one Easy Clean account.",
    "Criar conta agora": "Create account now",
    "Já tenho conta": "I already have an account",
    "Pedido rápido": "Quick order",
    "A tua recolha": "Your pickup",
    "Serviço": "Service",
    "Lavagem + passagem": "Washing + ironing",
    "Recolha": "Pickup",
    "Hoje ou amanhã": "Today or tomorrow",
    "Pagamento": "Payment",
    "Cartão seguro": "Secure card",
    "Acompanhamento online": "Online tracking",
    "Estado e mapa do pedido no app.": "Order status and map in the app.",
    "Começar": "Start",
    "Como funciona?": "How does it work?",
    "Um processo simples para o cliente entender rápido e começar pelo cadastro.": "A simple process so the customer understands quickly and starts by registering.",
    "Cria conta": "Create account",
    "Guarda dados e morada.": "Save details and address.",
    "Agenda": "Schedule",
    "Escolhe dia e horário.": "Choose day and time.",
    "Acompanha": "Track",
    "Vê o estado do pedido.": "See the order status.",
    "Recebe": "Receive",
    "Roupa pronta em casa.": "Laundry ready at home.",
    "Confiança": "Trust",
    "Preparado para receber clientes reais": "Ready to receive real customers",
    "Dados protegidos": "Protected data",
    "Cada conta vê apenas os próprios endereços e pedidos.": "Each account only sees its own addresses and orders.",
    "Pagamento seguro": "Secure payment",
    "Checkout Stripe com cartão de crédito ou débito.": "Stripe checkout with credit or debit card.",
    "Processo claro": "Clear process",
    "Serviços, preços e acompanhamento em poucos toques.": "Services, prices and tracking in a few taps.",
    "Serviços de lavandaria": "Laundry services",
    "O cliente conhece os serviços e depois entra ou cria conta para fazer o pedido.": "The customer checks the services, then logs in or creates an account to order.",
    "Criar conta para pedir": "Create account to order",
    "Recolha, tratamento e entrega com cuidado.": "Pickup, care and delivery handled carefully.",
    "Empresa": "Company",
    "Suporte": "Support",
    "Contacto": "Contact",
    "Registar": "Register",
    "Privacidade": "Privacy",
    "Termos": "Terms",
    "Reembolso": "Refund",
    "Todos os direitos reservados.": "All rights reserved.",
  },
  fr: {
    "Como funciona": "Comment ça marche",
    "Serviços": "Services",
    "Nossos serviços": "Nos services",
    "Entrar": "Connexion",
    "Criar conta": "Créer un compte",
    "Lavandaria ao domicílio": "Blanchisserie à domicile",
    "Roupa limpa,": "Linge propre,",
    "sem perder tempo.": "sans perdre de temps.",
    "Agenda recolha, paga online e acompanha o pedido até à entrega. Tudo numa conta Easy Clean.": "Planifiez la collecte, payez en ligne et suivez la commande jusqu'à la livraison. Tout dans un compte Easy Clean.",
    "Criar conta agora": "Créer un compte maintenant",
    "Já tenho conta": "J'ai déjà un compte",
    "Pedido rápido": "Commande rapide",
    "A tua recolha": "Votre collecte",
    "Serviço": "Service",
    "Lavagem + passagem": "Lavage + repassage",
    "Recolha": "Collecte",
    "Hoje ou amanhã": "Aujourd'hui ou demain",
    "Pagamento": "Paiement",
    "Cartão seguro": "Carte sécurisée",
    "Acompanhamento online": "Suivi en ligne",
    "Estado e mapa do pedido no app.": "Statut et carte de la commande dans l'app.",
    "Começar": "Commencer",
    "Como funciona?": "Comment ça marche ?",
    "Um processo simples para o cliente entender rápido e começar pelo cadastro.": "Un processus simple pour comprendre vite et commencer par l'inscription.",
    "Cria conta": "Créer un compte",
    "Guarda dados e morada.": "Enregistrez vos données et adresse.",
    "Agenda": "Planifier",
    "Escolhe dia e horário.": "Choisissez jour et horaire.",
    "Acompanha": "Suivre",
    "Vê o estado do pedido.": "Voyez le statut de la commande.",
    "Recebe": "Recevoir",
    "Roupa pronta em casa.": "Linge prêt à domicile.",
    "Confiança": "Confiance",
    "Preparado para receber clientes reais": "Prêt à recevoir de vrais clients",
    "Dados protegidos": "Données protégées",
    "Cada conta vê apenas os próprios endereços e pedidos.": "Chaque compte voit seulement ses adresses et commandes.",
    "Pagamento seguro": "Paiement sécurisé",
    "Checkout Stripe com cartão de crédito ou débito.": "Paiement Stripe par carte de crédit ou débit.",
    "Processo claro": "Processus clair",
    "Serviços, preços e acompanhamento em poucos toques.": "Services, prix et suivi en quelques touches.",
    "Serviços de lavandaria": "Services de blanchisserie",
    "O cliente conhece os serviços e depois entra ou cria conta para fazer o pedido.": "Le client consulte les services puis se connecte ou crée un compte pour commander.",
    "Criar conta para pedir": "Créer un compte pour commander",
    "Recolha, tratamento e entrega com cuidado.": "Collecte, traitement et livraison avec soin.",
    "Empresa": "Entreprise",
    "Suporte": "Support",
    "Contacto": "Contact",
    "Registar": "S'inscrire",
    "Privacidade": "Confidentialité",
    "Termos": "Conditions",
    "Reembolso": "Remboursement",
    "Todos os direitos reservados.": "Tous droits réservés.",
  },
  de: {
    "Como funciona": "So funktioniert es",
    "Serviços": "Services",
    "Nossos serviços": "Unsere Services",
    "Entrar": "Anmelden",
    "Criar conta": "Konto erstellen",
    "Lavandaria ao domicílio": "Wäscherei zu Hause",
    "Roupa limpa,": "Saubere Wäsche,",
    "sem perder tempo.": "ohne Zeitverlust.",
    "Agenda recolha, paga online e acompanha o pedido até à entrega. Tudo numa conta Easy Clean.": "Abholung planen, online zahlen und die Bestellung bis zur Lieferung verfolgen. Alles in einem Easy Clean Konto.",
    "Criar conta agora": "Konto jetzt erstellen",
    "Já tenho conta": "Ich habe ein Konto",
    "Pedido rápido": "Schnelle Bestellung",
    "A tua recolha": "Ihre Abholung",
    "Serviço": "Service",
    "Lavagem + passagem": "Waschen + Bügeln",
    "Recolha": "Abholung",
    "Hoje ou amanhã": "Heute oder morgen",
    "Pagamento": "Zahlung",
    "Cartão seguro": "Sichere Karte",
    "Acompanhamento online": "Online-Tracking",
    "Estado e mapa do pedido no app.": "Status und Karte der Bestellung in der App.",
    "Começar": "Starten",
    "Como funciona?": "Wie funktioniert es?",
    "Um processo simples para o cliente entender rápido e começar pelo cadastro.": "Ein einfacher Prozess, damit Kunden schnell verstehen und mit der Registrierung starten.",
    "Cria conta": "Konto erstellen",
    "Guarda dados e morada.": "Daten und Adresse speichern.",
    "Agenda": "Planen",
    "Escolhe dia e horário.": "Tag und Uhrzeit wählen.",
    "Acompanha": "Verfolgen",
    "Vê o estado do pedido.": "Bestellstatus ansehen.",
    "Recebe": "Erhalten",
    "Roupa pronta em casa.": "Wäsche fertig zu Hause.",
    "Confiança": "Vertrauen",
    "Preparado para receber clientes reais": "Bereit für echte Kunden",
    "Dados protegidos": "Geschützte Daten",
    "Cada conta vê apenas os próprios endereços e pedidos.": "Jedes Konto sieht nur eigene Adressen und Bestellungen.",
    "Pagamento seguro": "Sichere Zahlung",
    "Checkout Stripe com cartão de crédito ou débito.": "Stripe-Zahlung mit Kredit- oder Debitkarte.",
    "Processo claro": "Klarer Ablauf",
    "Serviços, preços e acompanhamento em poucos toques.": "Services, Preise und Tracking in wenigen Schritten.",
    "Serviços de lavandaria": "Wäscheservices",
    "O cliente conhece os serviços e depois entra ou cria conta para fazer o pedido.": "Der Kunde sieht die Services und meldet sich dann an oder erstellt ein Konto.",
    "Criar conta para pedir": "Konto zum Bestellen erstellen",
    "Recolha, tratamento e entrega com cuidado.": "Abholung, Pflege und Lieferung mit Sorgfalt.",
    "Empresa": "Unternehmen",
    "Suporte": "Support",
    "Contacto": "Kontakt",
    "Registar": "Registrieren",
    "Privacidade": "Datenschutz",
    "Termos": "Bedingungen",
    "Reembolso": "Rückerstattung",
    "Todos os direitos reservados.": "Alle Rechte vorbehalten.",
  },
  es: {
    "Como funciona": "Cómo funciona",
    "Serviços": "Servicios",
    "Nossos serviços": "Nuestros servicios",
    "Entrar": "Entrar",
    "Criar conta": "Crear cuenta",
    "Lavandaria ao domicílio": "Lavandería a domicilio",
    "Roupa limpa,": "Ropa limpia,",
    "sem perder tempo.": "sin perder tiempo.",
    "Agenda recolha, paga online e acompanha o pedido até à entrega. Tudo numa conta Easy Clean.": "Agenda la recogida, paga online y sigue el pedido hasta la entrega. Todo en una cuenta Easy Clean.",
    "Criar conta agora": "Crear cuenta ahora",
    "Já tenho conta": "Ya tengo cuenta",
    "Pedido rápido": "Pedido rápido",
    "A tua recolha": "Tu recogida",
    "Serviço": "Servicio",
    "Lavagem + passagem": "Lavado + planchado",
    "Recolha": "Recogida",
    "Hoje ou amanhã": "Hoy o mañana",
    "Pagamento": "Pago",
    "Cartão seguro": "Tarjeta segura",
    "Acompanhamento online": "Seguimiento online",
    "Estado e mapa do pedido no app.": "Estado y mapa del pedido en la app.",
    "Começar": "Empezar",
    "Como funciona?": "¿Cómo funciona?",
    "Um processo simples para o cliente entender rápido e começar pelo cadastro.": "Un proceso simple para entender rápido y empezar con el registro.",
    "Cria conta": "Crea cuenta",
    "Guarda dados e morada.": "Guarda datos y dirección.",
    "Agenda": "Agenda",
    "Escolhe dia e horário.": "Elige día y horario.",
    "Acompanha": "Sigue",
    "Vê o estado do pedido.": "Ve el estado del pedido.",
    "Recebe": "Recibe",
    "Roupa pronta em casa.": "Ropa lista en casa.",
    "Confiança": "Confianza",
    "Preparado para receber clientes reais": "Preparado para recibir clientes reales",
    "Dados protegidos": "Datos protegidos",
    "Cada conta vê apenas os próprios endereços e pedidos.": "Cada cuenta ve solo sus direcciones y pedidos.",
    "Pagamento seguro": "Pago seguro",
    "Checkout Stripe com cartão de crédito ou débito.": "Checkout Stripe con tarjeta de crédito o débito.",
    "Processo claro": "Proceso claro",
    "Serviços, preços e acompanhamento em poucos toques.": "Servicios, precios y seguimiento en pocos toques.",
    "Serviços de lavandaria": "Servicios de lavandería",
    "O cliente conhece os serviços e depois entra ou cria conta para fazer o pedido.": "El cliente ve los servicios y luego entra o crea cuenta para pedir.",
    "Criar conta para pedir": "Crear cuenta para pedir",
    "Recolha, tratamento e entrega com cuidado.": "Recogida, cuidado y entrega con atención.",
    "Empresa": "Empresa",
    "Suporte": "Soporte",
    "Contacto": "Contacto",
    "Registar": "Registrarse",
    "Privacidade": "Privacidad",
    "Termos": "Términos",
    "Reembolso": "Reembolso",
    "Todos os direitos reservados.": "Todos los derechos reservados.",
  },
};

const originalTextByNode = new WeakMap<Text, string>();

function translatePage(language: LanguageCode) {
  const dictionary = language === "pt" ? {} : translations[language];
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  const nodes: Text[] = [];

  while (walker.nextNode()) {
    nodes.push(walker.currentNode as Text);
  }

  for (const node of nodes) {
    const parent = node.parentElement;
    if (!parent || parent.closest(".notranslate, script, style, noscript")) {
      continue;
    }

    if (!originalTextByNode.has(node)) {
      originalTextByNode.set(node, node.textContent ?? "");
    }

    const originalText = originalTextByNode.get(node) ?? "";
    const original = originalText.trim();
    const translated = language === "pt" ? original : dictionary[original];

    if (translated) {
      const leadingSpace = (originalText.match(/^\s*/) ?? [""])[0];
      const trailingSpace = (originalText.match(/\s*$/) ?? [""])[0];
      node.textContent = `${leadingSpace}${translated}${trailingSpace}`;
    } else if (language === "pt") {
      node.textContent = originalText;
    }
  }
}

export function LanguageSelector() {
  const containerRef = useRef<HTMLDivElement>(null);
  const storageKey = useMemo(() => "easyclean-language", []);
  const [open, setOpen] = useState(false);
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") {
      return "pt";
    }

    const saved = window.localStorage.getItem("easyclean-language") as LanguageCode | null;
    return saved && languages.some((item) => item.code === saved) ? saved : "pt";
  });

  useEffect(() => {
    document.documentElement.lang = language;
    translatePage(language);
  }, [language]);

  useEffect(() => {
    const observer = new MutationObserver(() => translatePage(language));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLanguageChange(nextLanguage: LanguageCode) {
    setLanguage(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
    translatePage(nextLanguage);
    setOpen(false);
  }

  const currentLanguage = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <div ref={containerRef} className="notranslate relative inline-flex">
      <button
        type="button"
        aria-label={`Idioma atual: ${currentLanguage.name}`}
        aria-expanded={open}
        className={[
          "inline-flex h-11 w-11 items-center justify-center rounded-2xl border bg-white shadow-sm transition-all",
          "hover:-translate-y-0.5 hover:border-[#6abf3c] hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6abf3c]/40",
          open ? "border-[#2d6a2d] ring-2 ring-[#6abf3c]/25" : "border-[#dbe8d4]",
        ].join(" ")}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="relative h-7 w-7 overflow-hidden rounded-full border border-[#dbe8d4] bg-white shadow-sm" aria-hidden="true">
          <Image src={currentLanguage.flagSrc} alt="" fill sizes="28px" className="object-cover" />
        </span>
      </button>

      {open ? (
        <div className="absolute right-0 top-14 z-50 w-56 overflow-hidden rounded-3xl border border-[#dbe8d4] bg-white p-2 shadow-2xl shadow-[#245f2f]/16">
          <div className="px-3 pb-2 pt-2">
            <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#2d6a2d]">Idioma</p>
            <p className="mt-0.5 text-xs text-gray-400">Escolha a língua do site</p>
          </div>
          <div className="space-y-1">
            {languages.map((item) => {
              const active = item.code === language;

              return (
                <button
                  key={item.code}
                  type="button"
                  aria-label={item.name}
                  aria-pressed={active}
                  className={[
                    "flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-left transition-colors focus:outline-none focus:ring-2 focus:ring-[#6abf3c]/40",
                    active ? "bg-[#eef8e8] text-[#2d6a2d]" : "text-gray-600 hover:bg-[#f7fbf4] hover:text-[#2d6a2d]",
                  ].join(" ")}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();
                    handleLanguageChange(item.code);
                  }}
                >
                  <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full border border-[#dbe8d4] bg-white shadow-sm">
                    <Image src={item.flagSrc} alt="" fill sizes="32px" className="object-cover" />
                  </span>
                  <span className="min-w-0 flex-1 text-sm font-black">{item.name}</span>
                  {active ? <Check className="h-4 w-4 shrink-0" /> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}
