"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { ChevronDown } from "lucide-react";

type LanguageCode = "pt" | "en" | "fr" | "de" | "es";

const languages: { code: LanguageCode; label: string; flag: string; name: string }[] = [
  { code: "pt", label: "PT", flag: "🇵🇹", name: "Português" },
  { code: "en", label: "EN", flag: "🇬🇧", name: "English" },
  { code: "fr", label: "FR", flag: "🇫🇷", name: "Français" },
  { code: "de", label: "DE", flag: "🇩🇪", name: "Deutsch" },
  { code: "es", label: "ES", flag: "🇪🇸", name: "Español" },
];

const translations: Record<Exclude<LanguageCode, "pt">, Record<string, string>> = {
  en: {
    "Como Funciona": "How It Works",
    "Como Funciona?": "How It Works?",
    "Serviços": "Services",
    "Nossos Serviços": "Our Services",
    "Planos": "Plans",
    "Lavandaria ao domicílio em Luxembourg": "Home laundry in Luxembourg",
    "Lavandaria ao domicílio em": "Home laundry in",
    "Roupa limpa.": "Clean laundry.",
    "Recolhida.": "Collected.",
    "Entregue.": "Delivered.",
    "Lavagem, passagem e entrega ao domicílio com um processo simples, rápido e profissional.": "Washing, ironing and home delivery with a simple, fast and professional process.",
    "Agendar Recolha": "Schedule Pickup",
    "Agendar pelo WhatsApp": "Book by WhatsApp",
    "Ver serviços": "View services",
    "Agenda": "Book",
    "Recolha": "Pickup",
    "Entrega": "Delivery",
    "Lavagem": "Washing",
    "Passagem a Ferro": "Ironing",
    "Limpeza a Seco": "Dry Cleaning",
    "Roupas de Cama": "Bed Linen",
    "Calçado": "Shoes",
    "Saco Completo": "Full Bag",
    "€2/peça": "€2/item",
    "€8/peça": "€8/item",
    "€6/peça": "€6/item",
    "€5/par": "€5/pair",
    "€29/saco": "€29/bag",
    "/mês": "/month",
    "Em apenas 4 passos tens a roupa lavada e entregue em casa.": "In just 4 steps, your laundry is cleaned and delivered home.",
    "Agenda Online": "Book Online",
    "Recolha em Casa": "Home Pickup",
    "Lavagem Profissional": "Professional Washing",
    "Entrega na Porta": "Door Delivery",
    "Escolhe os serviços e o horário de recolha na app ou website.": "Choose the services and pickup time in the app or website.",
    "Os nossos motoristas vão à tua porta buscar a roupa.": "Our drivers collect the laundry at your door.",
    "A tua roupa é tratada com cuidado na nossa base central.": "Your laundry is carefully handled at our central base.",
    "Devolvemos tudo dobrado, passado e perfumado.": "We return everything folded, ironed and fresh.",
    "Serviços de lavandaria": "Laundry Services",
    "Escolha o cuidado ideal para cada tipo de roupa.": "Choose the right care for each type of clothing.",
    "Ver guia": "View guide",
    "Galeria de serviços": "Service Gallery",
    "Serviços mais pedidos": "Most requested services",
    "Pedidos comuns, organizados de forma simples.": "Common requests, organized in a simple way.",
    "Lavagem semanal": "Weekly washing",
    "Camisas e trabalho": "Shirts and workwear",
    "Cama e banho": "Bed and bath",
    "Recolha ao domicílio": "Home pickup",
    "Ideal para roupas do dia a dia e rotina familiar.": "Ideal for everyday clothes and family routines.",
    "Acabamento cuidado para peças sociais.": "Careful finishing for formal items.",
    "Lençóis, toalhas e peças maiores tratadas com cuidado.": "Sheets, towels and larger items handled with care.",
    "A equipa recolhe e devolve na morada combinada.": "The team collects and returns at the agreed address.",
    "Áreas atendidas": "Service Areas",
    "Verifique se recolhemos na sua zona": "Check if we collect in your area",
    "Atendimento em Luxembourg e regiões próximas.": "Service in Luxembourg and nearby regions.",
    "Confirmar pelo WhatsApp": "Confirm by WhatsApp",
    "Não encontrou a sua zona? Fale connosco para confirmar disponibilidade.": "Did not find your area? Contact us to confirm availability.",
    "Planos Mensais": "Monthly Plans",
    "Poupa com assinatura. Cancela quando quiseres.": "Save with a subscription. Cancel whenever you want.",
    "MAIS POPULAR": "MOST POPULAR",
    "Escolher Basic": "Choose Basic",
    "Escolher Pro": "Choose Pro",
    "Escolher Enterprise": "Choose Enterprise",
    "Preferes pagar por encomenda?": "Prefer to pay per order?",
    "Sem problema.": "No problem.",
    "Avaliações": "Reviews",
    "O que os clientes dizem": "What customers say",
    "Comentários curtos para mostrar confiança no serviço.": "Short comments to build trust in the service.",
    "Dúvidas frequentes": "Frequently Asked Questions",
    "Respostas rápidas para ajudar o cliente a entender a recolha, lavagem, entrega e pagamento antes de agendar.": "Quick answers to help customers understand pickup, washing, delivery and payment before booking.",
    "Contacto": "Contact",
    "Entre em contacto connosco": "Contact us",
    "Empresa": "Company",
    "Como funciona": "How it works",
    "Suporte": "Support",
    "Privacidade": "Privacy",
    "Todos os direitos reservados.": "All rights reserved.",
    "Voltar": "Back",
    "Guia Easy Clean": "Easy Clean Guide",
    "Preço base": "Base price",
    "A partir de €4/kg": "From €4/kg",
    "A partir de €2/peça": "From €2/item",
    "A partir de €8/peça": "From €8/item",
    "A partir de €6/peça": "From €6/item",
    "A partir de €5/par": "From €5/pair",
    "A partir de €29/saco": "From €29/bag",
    "O valor final pode variar conforme quantidade, urgência e tipo de peça.": "The final price may vary depending on quantity, urgency and item type.",
    "Detalhes do serviço": "Service details",
    "O cuidado certo para cada tecido": "The right care for each fabric",
    "Para que serve": "Best for",
    "Inclui": "Includes",
    "Como tratamos": "How we treat it",
    "Pedir orçamento": "Request quote",
    "Ver outros serviços": "View other services",
    "Tecidos": "Fabrics",
    "Material, cuidado e produto indicado": "Material, care and recommended product",
    "Produtos usados": "Products used",
    "O que evitar": "What to avoid",
  },
  fr: {
    "Como Funciona": "Comment ça marche",
    "Como Funciona?": "Comment ça marche ?",
    "Serviços": "Services",
    "Nossos Serviços": "Nos services",
    "Planos": "Abonnements",
    "Lavandaria ao domicílio em Luxembourg": "Blanchisserie à domicile au Luxembourg",
    "Lavandaria ao domicílio em": "Blanchisserie à domicile au",
    "Roupa limpa.": "Linge propre.",
    "Recolhida.": "Collecté.",
    "Entregue.": "Livré.",
    "Lavagem, passagem e entrega ao domicílio com um processo simples, rápido e profissional.": "Lavage, repassage et livraison à domicile avec un processus simple, rapide et professionnel.",
    "Agendar Recolha": "Planifier la collecte",
    "Agendar pelo WhatsApp": "Réserver par WhatsApp",
    "Ver serviços": "Voir les services",
    "Agenda": "Réservation",
    "Recolha": "Collecte",
    "Entrega": "Livraison",
    "Lavagem": "Lavage",
    "Passagem a Ferro": "Repassage",
    "Limpeza a Seco": "Nettoyage à sec",
    "Roupas de Cama": "Linge de lit",
    "Calçado": "Chaussures",
    "Saco Completo": "Sac complet",
    "€2/peça": "€2/pièce",
    "€8/peça": "€8/pièce",
    "€6/peça": "€6/pièce",
    "€5/par": "€5/paire",
    "€29/saco": "€29/sac",
    "/mês": "/mois",
    "Em apenas 4 passos tens a roupa lavada e entregue em casa.": "En seulement 4 étapes, votre linge est lavé et livré à domicile.",
    "Agenda Online": "Réservation en ligne",
    "Recolha em Casa": "Collecte à domicile",
    "Lavagem Profissional": "Lavage professionnel",
    "Entrega na Porta": "Livraison à la porte",
    "Serviços de lavandaria": "Services de blanchisserie",
    "Escolha o cuidado ideal para cada tipo de roupa.": "Choisissez le soin idéal pour chaque type de vêtement.",
    "Ver guia": "Voir le guide",
    "Áreas atendidas": "Zones desservies",
    "Verifique se recolhemos na sua zona": "Vérifiez si nous collectons dans votre zone",
    "Atendimento em Luxembourg e regiões próximas.": "Service au Luxembourg et dans les régions proches.",
    "Confirmar pelo WhatsApp": "Confirmer par WhatsApp",
    "Planos Mensais": "Abonnements mensuels",
    "Poupa com assinatura. Cancela quando quiseres.": "Économisez avec un abonnement. Annulez quand vous voulez.",
    "Avaliações": "Avis",
    "O que os clientes dizem": "Ce que disent les clients",
    "Dúvidas frequentes": "Questions fréquentes",
    "Contacto": "Contact",
    "Entre em contacto connosco": "Contactez-nous",
    "Empresa": "Entreprise",
    "Suporte": "Support",
    "Privacidade": "Confidentialité",
    "Voltar": "Retour",
    "Guia Easy Clean": "Guide Easy Clean",
    "Preço base": "Prix de base",
    "A partir de €4/kg": "À partir de €4/kg",
    "A partir de €2/peça": "À partir de €2/pièce",
    "A partir de €8/peça": "À partir de €8/pièce",
    "A partir de €6/peça": "À partir de €6/pièce",
    "A partir de €5/par": "À partir de €5/paire",
    "A partir de €29/saco": "À partir de €29/sac",
    "Detalhes do serviço": "Détails du service",
    "O cuidado certo para cada tecido": "Le soin adapté à chaque tissu",
    "Para que serve": "Idéal pour",
    "Inclui": "Inclus",
    "Como tratamos": "Notre méthode",
    "Pedir orçamento": "Demander un devis",
    "Ver outros serviços": "Voir d'autres services",
    "Tecidos": "Tissus",
    "Produtos usados": "Produits utilisés",
    "O que evitar": "À éviter",
  },
  de: {
    "Como Funciona": "So funktioniert es",
    "Como Funciona?": "So funktioniert es",
    "Serviços": "Services",
    "Nossos Serviços": "Unsere Services",
    "Planos": "Tarife",
    "Lavandaria ao domicílio em Luxembourg": "Wäscherei zu Hause in Luxemburg",
    "Lavandaria ao domicílio em": "Wäscherei zu Hause in",
    "Roupa limpa.": "Saubere Wäsche.",
    "Recolhida.": "Abgeholt.",
    "Entregue.": "Geliefert.",
    "Lavagem, passagem e entrega ao domicílio com um processo simples, rápido e profissional.": "Waschen, Bügeln und Lieferung nach Hause mit einem einfachen, schnellen und professionellen Ablauf.",
    "Agendar Recolha": "Abholung buchen",
    "Agendar pelo WhatsApp": "Per WhatsApp buchen",
    "Ver serviços": "Services ansehen",
    "Agenda": "Buchen",
    "Recolha": "Abholung",
    "Entrega": "Lieferung",
    "Lavagem": "Waschen",
    "Passagem a Ferro": "Bügeln",
    "Limpeza a Seco": "Chemische Reinigung",
    "Roupas de Cama": "Bettwäsche",
    "Calçado": "Schuhe",
    "Saco Completo": "Kompletter Sack",
    "€2/peça": "€2/Stück",
    "€8/peça": "€8/Stück",
    "€6/peça": "€6/Stück",
    "€5/par": "€5/Paar",
    "€29/saco": "€29/Sack",
    "/mês": "/Monat",
    "Em apenas 4 passos tens a roupa lavada e entregue em casa.": "In nur 4 Schritten wird Ihre Wäsche gewaschen und nach Hause geliefert.",
    "Agenda Online": "Online buchen",
    "Recolha em Casa": "Abholung zu Hause",
    "Lavagem Profissional": "Professionelle Wäsche",
    "Entrega na Porta": "Lieferung an die Tür",
    "Serviços de lavandaria": "Wäscherei-Services",
    "Escolha o cuidado ideal para cada tipo de roupa.": "Wählen Sie die passende Pflege für jede Kleidung.",
    "Ver guia": "Guide ansehen",
    "Áreas atendidas": "Bediente Gebiete",
    "Verifique se recolhemos na sua zona": "Prüfen Sie, ob wir in Ihrer Gegend abholen",
    "Atendimento em Luxembourg e regiões próximas.": "Service in Luxemburg und Umgebung.",
    "Confirmar pelo WhatsApp": "Per WhatsApp bestätigen",
    "Planos Mensais": "Monatliche Tarife",
    "Poupa com assinatura. Cancela quando quiseres.": "Sparen Sie mit einem Abo. Jederzeit kündbar.",
    "Avaliações": "Bewertungen",
    "O que os clientes dizem": "Was Kunden sagen",
    "Dúvidas frequentes": "Häufige Fragen",
    "Contacto": "Kontakt",
    "Entre em contacto connosco": "Kontaktieren Sie uns",
    "Empresa": "Unternehmen",
    "Suporte": "Support",
    "Privacidade": "Datenschutz",
    "Voltar": "Zurück",
    "Guia Easy Clean": "Easy Clean Guide",
    "Preço base": "Basispreis",
    "A partir de €4/kg": "Ab €4/kg",
    "A partir de €2/peça": "Ab €2/Stück",
    "A partir de €8/peça": "Ab €8/Stück",
    "A partir de €6/peça": "Ab €6/Stück",
    "A partir de €5/par": "Ab €5/Paar",
    "A partir de €29/saco": "Ab €29/Sack",
    "Detalhes do serviço": "Service-Details",
    "O cuidado certo para cada tecido": "Die richtige Pflege für jeden Stoff",
    "Para que serve": "Geeignet für",
    "Inclui": "Enthält",
    "Como tratamos": "So behandeln wir es",
    "Pedir orçamento": "Angebot anfordern",
    "Ver outros serviços": "Andere Services ansehen",
    "Tecidos": "Stoffe",
    "Produtos usados": "Verwendete Produkte",
    "O que evitar": "Was vermieden werden sollte",
  },
  es: {
    "Como Funciona": "Cómo funciona",
    "Como Funciona?": "¿Cómo funciona?",
    "Serviços": "Servicios",
    "Nossos Serviços": "Nuestros servicios",
    "Planos": "Planes",
    "Lavandaria ao domicílio em Luxembourg": "Lavandería a domicilio en Luxemburgo",
    "Lavandaria ao domicílio em": "Lavandería a domicilio en",
    "Roupa limpa.": "Ropa limpia.",
    "Recolhida.": "Recogida.",
    "Entregue.": "Entregada.",
    "Lavagem, passagem e entrega ao domicílio com um processo simples, rápido e profissional.": "Lavado, planchado y entrega a domicilio con un proceso simple, rápido y profesional.",
    "Agendar Recolha": "Programar recogida",
    "Agendar pelo WhatsApp": "Reservar por WhatsApp",
    "Ver serviços": "Ver servicios",
    "Agenda": "Agenda",
    "Recolha": "Recogida",
    "Entrega": "Entrega",
    "Lavagem": "Lavado",
    "Passagem a Ferro": "Planchado",
    "Limpeza a Seco": "Limpieza en seco",
    "Roupas de Cama": "Ropa de cama",
    "Calçado": "Calzado",
    "Saco Completo": "Bolsa completa",
    "€2/peça": "€2/prenda",
    "€8/peça": "€8/prenda",
    "€6/peça": "€6/prenda",
    "€5/par": "€5/par",
    "€29/saco": "€29/bolsa",
    "/mês": "/mes",
    "Em apenas 4 passos tens a roupa lavada e entregue em casa.": "En solo 4 pasos tienes la ropa lavada y entregada en casa.",
    "Agenda Online": "Reserva online",
    "Recolha em Casa": "Recogida en casa",
    "Lavagem Profissional": "Lavado profesional",
    "Entrega na Porta": "Entrega en la puerta",
    "Serviços de lavandaria": "Servicios de lavandería",
    "Escolha o cuidado ideal para cada tipo de roupa.": "Elige el cuidado ideal para cada tipo de ropa.",
    "Ver guia": "Ver guía",
    "Áreas atendidas": "Zonas atendidas",
    "Verifique se recolhemos na sua zona": "Comprueba si recogemos en tu zona",
    "Atendimento em Luxembourg e regiões próximas.": "Servicio en Luxemburgo y regiones cercanas.",
    "Confirmar pelo WhatsApp": "Confirmar por WhatsApp",
    "Planos Mensais": "Planes mensuales",
    "Poupa com assinatura. Cancela quando quiseres.": "Ahorra con suscripción. Cancela cuando quieras.",
    "Avaliações": "Reseñas",
    "O que os clientes dizem": "Qué dicen los clientes",
    "Dúvidas frequentes": "Preguntas frecuentes",
    "Contacto": "Contacto",
    "Entre em contacto connosco": "Contáctanos",
    "Empresa": "Empresa",
    "Suporte": "Soporte",
    "Privacidade": "Privacidad",
    "Voltar": "Volver",
    "Guia Easy Clean": "Guía Easy Clean",
    "Preço base": "Precio base",
    "A partir de €4/kg": "Desde €4/kg",
    "A partir de €2/peça": "Desde €2/prenda",
    "A partir de €8/peça": "Desde €8/prenda",
    "A partir de €6/peça": "Desde €6/prenda",
    "A partir de €5/par": "Desde €5/par",
    "A partir de €29/saco": "Desde €29/bolsa",
    "Detalhes do serviço": "Detalles del servicio",
    "O cuidado certo para cada tecido": "El cuidado adecuado para cada tejido",
    "Para que serve": "Ideal para",
    "Inclui": "Incluye",
    "Como tratamos": "Cómo lo tratamos",
    "Pedir orçamento": "Pedir presupuesto",
    "Ver outros serviços": "Ver otros servicios",
    "Tecidos": "Tejidos",
    "Produtos usados": "Productos usados",
    "O que evitar": "Qué evitar",
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
    }
  }
}

export function LanguageSelector() {
  const selectId = useId();
  const storageKey = useMemo(() => "easyclean-language", []);
  const [language, setLanguage] = useState<LanguageCode>(() => {
    if (typeof window === "undefined") {
      return "pt";
    }

    const saved = window.localStorage.getItem("easyclean-language") as LanguageCode | null;
    return saved && languages.some((item) => item.code === saved) ? saved : "pt";
  });

  useEffect(() => {
    translatePage(language);
  }, [language]);

  useEffect(() => {
    const observer = new MutationObserver(() => translatePage(language));
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [language]);

  function handleLanguageChange(nextLanguage: LanguageCode) {
    setLanguage(nextLanguage);
    window.localStorage.setItem(storageKey, nextLanguage);
    translatePage(nextLanguage);
  }

  const currentLanguage = languages.find((item) => item.code === language) ?? languages[0];

  return (
    <div className="notranslate relative inline-flex h-10 min-w-[92px] items-center rounded-full border border-[#dbe8d4] bg-white px-3 text-[#245f2f] shadow-sm transition-shadow hover:shadow-md">
      <div className="pointer-events-none flex w-full items-center gap-2 pr-5">
        <span className="text-base leading-none" aria-hidden="true">{currentLanguage.flag}</span>
        <span className="text-sm font-bold uppercase">{currentLanguage.label}</span>
        <ChevronDown className="absolute right-3 h-4 w-4 text-[#2d6a2d]" aria-hidden="true" />
      </div>
      <label htmlFor={selectId} className="sr-only">
        Idioma do site
      </label>
      <select
        id={selectId}
        aria-label="Idioma do site"
        title={currentLanguage.name}
        className="absolute inset-0 h-full w-full cursor-pointer appearance-none rounded-full bg-transparent opacity-0 outline-none"
        value={language}
        onChange={(event) => handleLanguageChange(event.target.value as LanguageCode)}
      >
        {languages.map((item) => (
          <option key={item.code} value={item.code}>
            {item.flag} {item.label} - {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
