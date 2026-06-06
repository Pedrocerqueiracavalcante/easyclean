"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

type LanguageCode = "pt" | "en" | "fr" | "de" | "es";

const languages: { code: LanguageCode; label: string; flagSrc: string; name: string }[] = [
  { code: "pt", label: "PT", flagSrc: "/flags/pt.svg", name: "Português" },
  { code: "en", label: "EN", flagSrc: "/flags/en.svg", name: "English" },
  { code: "fr", label: "FR", flagSrc: "/flags/fr.svg", name: "Français" },
  { code: "de", label: "DE", flagSrc: "/flags/de.svg", name: "Deutsch" },
  { code: "es", label: "ES", flagSrc: "/flags/es.svg", name: "Español" },
];

const translations: Record<Exclude<LanguageCode, "pt">, Record<string, string>> = {
  en: {
    "Como Funciona": "How It Works",
    "Como Funciona?": "How It Works?",
    "ServiÃ§os": "Services",
    "Nossos ServiÃ§os": "Our Services",
    "Planos": "Plans",
    "Lavandaria ao domicÃ­lio em Luxembourg": "Home laundry in Luxembourg",
    "Lavandaria ao domicÃ­lio em": "Home laundry in",
    "Roupa limpa.": "Clean laundry.",
    "Recolhida.": "Collected.",
    "Entregue.": "Delivered.",
    "Lavagem, passagem e entrega ao domicÃ­lio com um processo simples, rÃ¡pido e profissional.": "Washing, ironing and home delivery with a simple, fast and professional process.",
    "Agendar Recolha": "Schedule Pickup",
    "Agendar pelo WhatsApp": "Book by WhatsApp",
    "Ver serviÃ§os": "View services",
    "Agenda": "Book",
    "Recolha": "Pickup",
    "Entrega": "Delivery",
    "Lavagem": "Washing",
    "Passagem a Ferro": "Ironing",
    "Limpeza a Seco": "Dry Cleaning",
    "Roupas de Cama": "Bed Linen",
    "CalÃ§ado": "Shoes",
    "Saco Completo": "Full Bag",
    "â‚¬2/peÃ§a": "â‚¬2/item",
    "â‚¬8/peÃ§a": "â‚¬8/item",
    "â‚¬6/peÃ§a": "â‚¬6/item",
    "â‚¬5/par": "â‚¬5/pair",
    "â‚¬29/saco": "â‚¬29/bag",
    "/mÃªs": "/month",
    "Em apenas 4 passos tens a roupa lavada e entregue em casa.": "In just 4 steps, your laundry is cleaned and delivered home.",
    "Agenda Online": "Book Online",
    "Recolha em Casa": "Home Pickup",
    "Lavagem Profissional": "Professional Washing",
    "Entrega na Porta": "Door Delivery",
    "Escolhe os serviÃ§os e o horÃ¡rio de recolha na app ou website.": "Choose the services and pickup time in the app or website.",
    "Os nossos motoristas vÃ£o Ã  tua porta buscar a roupa.": "Our drivers collect the laundry at your door.",
    "A tua roupa Ã© tratada com cuidado na nossa base central.": "Your laundry is carefully handled at our central base.",
    "Devolvemos tudo dobrado, passado e perfumado.": "We return everything folded, ironed and fresh.",
    "ServiÃ§os de lavandaria": "Laundry Services",
    "Escolha o cuidado ideal para cada tipo de roupa.": "Choose the right care for each type of clothing.",
    "Ver guia": "View guide",
    "Galeria de serviÃ§os": "Service Gallery",
    "ServiÃ§os mais pedidos": "Most requested services",
    "Pedidos comuns, organizados de forma simples.": "Common requests, organized in a simple way.",
    "Lavagem semanal": "Weekly washing",
    "Camisas e trabalho": "Shirts and workwear",
    "Cama e banho": "Bed and bath",
    "Recolha ao domicÃ­lio": "Home pickup",
    "Ideal para roupas do dia a dia e rotina familiar.": "Ideal for everyday clothes and family routines.",
    "Acabamento cuidado para peÃ§as sociais.": "Careful finishing for formal items.",
    "LenÃ§Ã³is, toalhas e peÃ§as maiores tratadas com cuidado.": "Sheets, towels and larger items handled with care.",
    "A equipa recolhe e devolve na morada combinada.": "The team collects and returns at the agreed address.",
    "Ãreas atendidas": "Service Areas",
    "Verifique se recolhemos na sua zona": "Check if we collect in your area",
    "Atendimento em Luxembourg e regiÃµes prÃ³ximas.": "Service in Luxembourg and nearby regions.",
    "Confirmar pelo WhatsApp": "Confirm by WhatsApp",
    "NÃ£o encontrou a sua zona? Fale connosco para confirmar disponibilidade.": "Did not find your area? Contact us to confirm availability.",
    "Planos Mensais": "Monthly Plans",
    "Poupa com assinatura. Cancela quando quiseres.": "Save with a subscription. Cancel whenever you want.",
    "MAIS POPULAR": "MOST POPULAR",
    "Escolher Basic": "Choose Basic",
    "Escolher Pro": "Choose Pro",
    "Escolher Enterprise": "Choose Enterprise",
    "Preferes pagar por encomenda?": "Prefer to pay per order?",
    "Sem problema.": "No problem.",
    "AvaliaÃ§Ãµes": "Reviews",
    "O que os clientes dizem": "What customers say",
    "ComentÃ¡rios curtos para mostrar confianÃ§a no serviÃ§o.": "Short comments to build trust in the service.",
    "DÃºvidas frequentes": "Frequently Asked Questions",
    "Respostas rÃ¡pidas para ajudar o cliente a entender a recolha, lavagem, entrega e pagamento antes de agendar.": "Quick answers to help customers understand pickup, washing, delivery and payment before booking.",
    "Contacto": "Contact",
    "Entre em contacto connosco": "Contact us",
    "Empresa": "Company",
    "Como funciona": "How it works",
    "Suporte": "Support",
    "Privacidade": "Privacy",
    "Todos os direitos reservados.": "All rights reserved.",
    "Voltar": "Back",
    "Guia Easy Clean": "Easy Clean Guide",
    "PreÃ§o base": "Base price",
    "A partir de â‚¬4/kg": "From â‚¬4/kg",
    "A partir de â‚¬2/peÃ§a": "From â‚¬2/item",
    "A partir de â‚¬8/peÃ§a": "From â‚¬8/item",
    "A partir de â‚¬6/peÃ§a": "From â‚¬6/item",
    "A partir de â‚¬5/par": "From â‚¬5/pair",
    "A partir de â‚¬29/saco": "From â‚¬29/bag",
    "O valor final pode variar conforme quantidade, urgÃªncia e tipo de peÃ§a.": "The final price may vary depending on quantity, urgency and item type.",
    "Detalhes do serviÃ§o": "Service details",
    "O cuidado certo para cada tecido": "The right care for each fabric",
    "Para que serve": "Best for",
    "Inclui": "Includes",
    "Como tratamos": "How we treat it",
    "Pedir orÃ§amento": "Request quote",
    "Ver outros serviÃ§os": "View other services",
    "Tecidos": "Fabrics",
    "Material, cuidado e produto indicado": "Material, care and recommended product",
    "Produtos usados": "Products used",
    "O que evitar": "What to avoid",
  },
  fr: {
    "Como Funciona": "Comment Ã§a marche",
    "Como Funciona?": "Comment Ã§a marche ?",
    "ServiÃ§os": "Services",
    "Nossos ServiÃ§os": "Nos services",
    "Planos": "Abonnements",
    "Lavandaria ao domicÃ­lio em Luxembourg": "Blanchisserie Ã  domicile au Luxembourg",
    "Lavandaria ao domicÃ­lio em": "Blanchisserie Ã  domicile au",
    "Roupa limpa.": "Linge propre.",
    "Recolhida.": "CollectÃ©.",
    "Entregue.": "LivrÃ©.",
    "Lavagem, passagem e entrega ao domicÃ­lio com um processo simples, rÃ¡pido e profissional.": "Lavage, repassage et livraison Ã  domicile avec un processus simple, rapide et professionnel.",
    "Agendar Recolha": "Planifier la collecte",
    "Agendar pelo WhatsApp": "RÃ©server par WhatsApp",
    "Ver serviÃ§os": "Voir les services",
    "Agenda": "RÃ©servation",
    "Recolha": "Collecte",
    "Entrega": "Livraison",
    "Lavagem": "Lavage",
    "Passagem a Ferro": "Repassage",
    "Limpeza a Seco": "Nettoyage Ã  sec",
    "Roupas de Cama": "Linge de lit",
    "CalÃ§ado": "Chaussures",
    "Saco Completo": "Sac complet",
    "â‚¬2/peÃ§a": "â‚¬2/piÃ¨ce",
    "â‚¬8/peÃ§a": "â‚¬8/piÃ¨ce",
    "â‚¬6/peÃ§a": "â‚¬6/piÃ¨ce",
    "â‚¬5/par": "â‚¬5/paire",
    "â‚¬29/saco": "â‚¬29/sac",
    "/mÃªs": "/mois",
    "Em apenas 4 passos tens a roupa lavada e entregue em casa.": "En seulement 4 Ã©tapes, votre linge est lavÃ© et livrÃ© Ã  domicile.",
    "Agenda Online": "RÃ©servation en ligne",
    "Recolha em Casa": "Collecte Ã  domicile",
    "Lavagem Profissional": "Lavage professionnel",
    "Entrega na Porta": "Livraison Ã  la porte",
    "ServiÃ§os de lavandaria": "Services de blanchisserie",
    "Escolha o cuidado ideal para cada tipo de roupa.": "Choisissez le soin idÃ©al pour chaque type de vÃªtement.",
    "Ver guia": "Voir le guide",
    "Ãreas atendidas": "Zones desservies",
    "Verifique se recolhemos na sua zona": "VÃ©rifiez si nous collectons dans votre zone",
    "Atendimento em Luxembourg e regiÃµes prÃ³ximas.": "Service au Luxembourg et dans les rÃ©gions proches.",
    "Confirmar pelo WhatsApp": "Confirmer par WhatsApp",
    "Planos Mensais": "Abonnements mensuels",
    "Poupa com assinatura. Cancela quando quiseres.": "Ã‰conomisez avec un abonnement. Annulez quand vous voulez.",
    "AvaliaÃ§Ãµes": "Avis",
    "O que os clientes dizem": "Ce que disent les clients",
    "DÃºvidas frequentes": "Questions frÃ©quentes",
    "Contacto": "Contact",
    "Entre em contacto connosco": "Contactez-nous",
    "Empresa": "Entreprise",
    "Suporte": "Support",
    "Privacidade": "ConfidentialitÃ©",
    "Voltar": "Retour",
    "Guia Easy Clean": "Guide Easy Clean",
    "PreÃ§o base": "Prix de base",
    "A partir de â‚¬4/kg": "Ã€ partir de â‚¬4/kg",
    "A partir de â‚¬2/peÃ§a": "Ã€ partir de â‚¬2/piÃ¨ce",
    "A partir de â‚¬8/peÃ§a": "Ã€ partir de â‚¬8/piÃ¨ce",
    "A partir de â‚¬6/peÃ§a": "Ã€ partir de â‚¬6/piÃ¨ce",
    "A partir de â‚¬5/par": "Ã€ partir de â‚¬5/paire",
    "A partir de â‚¬29/saco": "Ã€ partir de â‚¬29/sac",
    "Detalhes do serviÃ§o": "DÃ©tails du service",
    "O cuidado certo para cada tecido": "Le soin adaptÃ© Ã  chaque tissu",
    "Para que serve": "IdÃ©al pour",
    "Inclui": "Inclus",
    "Como tratamos": "Notre mÃ©thode",
    "Pedir orÃ§amento": "Demander un devis",
    "Ver outros serviÃ§os": "Voir d'autres services",
    "Tecidos": "Tissus",
    "Produtos usados": "Produits utilisÃ©s",
    "O que evitar": "Ã€ Ã©viter",
  },
  de: {
    "Como Funciona": "So funktioniert es",
    "Como Funciona?": "So funktioniert es",
    "ServiÃ§os": "Services",
    "Nossos ServiÃ§os": "Unsere Services",
    "Planos": "Tarife",
    "Lavandaria ao domicÃ­lio em Luxembourg": "WÃ¤scherei zu Hause in Luxemburg",
    "Lavandaria ao domicÃ­lio em": "WÃ¤scherei zu Hause in",
    "Roupa limpa.": "Saubere WÃ¤sche.",
    "Recolhida.": "Abgeholt.",
    "Entregue.": "Geliefert.",
    "Lavagem, passagem e entrega ao domicÃ­lio com um processo simples, rÃ¡pido e profissional.": "Waschen, BÃ¼geln und Lieferung nach Hause mit einem einfachen, schnellen und professionellen Ablauf.",
    "Agendar Recolha": "Abholung buchen",
    "Agendar pelo WhatsApp": "Per WhatsApp buchen",
    "Ver serviÃ§os": "Services ansehen",
    "Agenda": "Buchen",
    "Recolha": "Abholung",
    "Entrega": "Lieferung",
    "Lavagem": "Waschen",
    "Passagem a Ferro": "BÃ¼geln",
    "Limpeza a Seco": "Chemische Reinigung",
    "Roupas de Cama": "BettwÃ¤sche",
    "CalÃ§ado": "Schuhe",
    "Saco Completo": "Kompletter Sack",
    "â‚¬2/peÃ§a": "â‚¬2/StÃ¼ck",
    "â‚¬8/peÃ§a": "â‚¬8/StÃ¼ck",
    "â‚¬6/peÃ§a": "â‚¬6/StÃ¼ck",
    "â‚¬5/par": "â‚¬5/Paar",
    "â‚¬29/saco": "â‚¬29/Sack",
    "/mÃªs": "/Monat",
    "Em apenas 4 passos tens a roupa lavada e entregue em casa.": "In nur 4 Schritten wird Ihre WÃ¤sche gewaschen und nach Hause geliefert.",
    "Agenda Online": "Online buchen",
    "Recolha em Casa": "Abholung zu Hause",
    "Lavagem Profissional": "Professionelle WÃ¤sche",
    "Entrega na Porta": "Lieferung an die TÃ¼r",
    "ServiÃ§os de lavandaria": "WÃ¤scherei-Services",
    "Escolha o cuidado ideal para cada tipo de roupa.": "WÃ¤hlen Sie die passende Pflege fÃ¼r jede Kleidung.",
    "Ver guia": "Guide ansehen",
    "Ãreas atendidas": "Bediente Gebiete",
    "Verifique se recolhemos na sua zona": "PrÃ¼fen Sie, ob wir in Ihrer Gegend abholen",
    "Atendimento em Luxembourg e regiÃµes prÃ³ximas.": "Service in Luxemburg und Umgebung.",
    "Confirmar pelo WhatsApp": "Per WhatsApp bestÃ¤tigen",
    "Planos Mensais": "Monatliche Tarife",
    "Poupa com assinatura. Cancela quando quiseres.": "Sparen Sie mit einem Abo. Jederzeit kÃ¼ndbar.",
    "AvaliaÃ§Ãµes": "Bewertungen",
    "O que os clientes dizem": "Was Kunden sagen",
    "DÃºvidas frequentes": "HÃ¤ufige Fragen",
    "Contacto": "Kontakt",
    "Entre em contacto connosco": "Kontaktieren Sie uns",
    "Empresa": "Unternehmen",
    "Suporte": "Support",
    "Privacidade": "Datenschutz",
    "Voltar": "ZurÃ¼ck",
    "Guia Easy Clean": "Easy Clean Guide",
    "PreÃ§o base": "Basispreis",
    "A partir de â‚¬4/kg": "Ab â‚¬4/kg",
    "A partir de â‚¬2/peÃ§a": "Ab â‚¬2/StÃ¼ck",
    "A partir de â‚¬8/peÃ§a": "Ab â‚¬8/StÃ¼ck",
    "A partir de â‚¬6/peÃ§a": "Ab â‚¬6/StÃ¼ck",
    "A partir de â‚¬5/par": "Ab â‚¬5/Paar",
    "A partir de â‚¬29/saco": "Ab â‚¬29/Sack",
    "Detalhes do serviÃ§o": "Service-Details",
    "O cuidado certo para cada tecido": "Die richtige Pflege fÃ¼r jeden Stoff",
    "Para que serve": "Geeignet fÃ¼r",
    "Inclui": "EnthÃ¤lt",
    "Como tratamos": "So behandeln wir es",
    "Pedir orÃ§amento": "Angebot anfordern",
    "Ver outros serviÃ§os": "Andere Services ansehen",
    "Tecidos": "Stoffe",
    "Produtos usados": "Verwendete Produkte",
    "O que evitar": "Was vermieden werden sollte",
  },
  es: {
    "Como Funciona": "CÃ³mo funciona",
    "Como Funciona?": "Â¿CÃ³mo funciona?",
    "ServiÃ§os": "Servicios",
    "Nossos ServiÃ§os": "Nuestros servicios",
    "Planos": "Planes",
    "Lavandaria ao domicÃ­lio em Luxembourg": "LavanderÃ­a a domicilio en Luxemburgo",
    "Lavandaria ao domicÃ­lio em": "LavanderÃ­a a domicilio en",
    "Roupa limpa.": "Ropa limpia.",
    "Recolhida.": "Recogida.",
    "Entregue.": "Entregada.",
    "Lavagem, passagem e entrega ao domicÃ­lio com um processo simples, rÃ¡pido e profissional.": "Lavado, planchado y entrega a domicilio con un proceso simple, rÃ¡pido y profesional.",
    "Agendar Recolha": "Programar recogida",
    "Agendar pelo WhatsApp": "Reservar por WhatsApp",
    "Ver serviÃ§os": "Ver servicios",
    "Agenda": "Agenda",
    "Recolha": "Recogida",
    "Entrega": "Entrega",
    "Lavagem": "Lavado",
    "Passagem a Ferro": "Planchado",
    "Limpeza a Seco": "Limpieza en seco",
    "Roupas de Cama": "Ropa de cama",
    "CalÃ§ado": "Calzado",
    "Saco Completo": "Bolsa completa",
    "â‚¬2/peÃ§a": "â‚¬2/prenda",
    "â‚¬8/peÃ§a": "â‚¬8/prenda",
    "â‚¬6/peÃ§a": "â‚¬6/prenda",
    "â‚¬5/par": "â‚¬5/par",
    "â‚¬29/saco": "â‚¬29/bolsa",
    "/mÃªs": "/mes",
    "Em apenas 4 passos tens a roupa lavada e entregue em casa.": "En solo 4 pasos tienes la ropa lavada y entregada en casa.",
    "Agenda Online": "Reserva online",
    "Recolha em Casa": "Recogida en casa",
    "Lavagem Profissional": "Lavado profesional",
    "Entrega na Porta": "Entrega en la puerta",
    "ServiÃ§os de lavandaria": "Servicios de lavanderÃ­a",
    "Escolha o cuidado ideal para cada tipo de roupa.": "Elige el cuidado ideal para cada tipo de ropa.",
    "Ver guia": "Ver guÃ­a",
    "Ãreas atendidas": "Zonas atendidas",
    "Verifique se recolhemos na sua zona": "Comprueba si recogemos en tu zona",
    "Atendimento em Luxembourg e regiÃµes prÃ³ximas.": "Servicio en Luxemburgo y regiones cercanas.",
    "Confirmar pelo WhatsApp": "Confirmar por WhatsApp",
    "Planos Mensais": "Planes mensuales",
    "Poupa com assinatura. Cancela quando quiseres.": "Ahorra con suscripciÃ³n. Cancela cuando quieras.",
    "AvaliaÃ§Ãµes": "ReseÃ±as",
    "O que os clientes dizem": "QuÃ© dicen los clientes",
    "DÃºvidas frequentes": "Preguntas frecuentes",
    "Contacto": "Contacto",
    "Entre em contacto connosco": "ContÃ¡ctanos",
    "Empresa": "Empresa",
    "Suporte": "Soporte",
    "Privacidade": "Privacidad",
    "Voltar": "Volver",
    "Guia Easy Clean": "GuÃ­a Easy Clean",
    "PreÃ§o base": "Precio base",
    "A partir de â‚¬4/kg": "Desde â‚¬4/kg",
    "A partir de â‚¬2/peÃ§a": "Desde â‚¬2/prenda",
    "A partir de â‚¬8/peÃ§a": "Desde â‚¬8/prenda",
    "A partir de â‚¬6/peÃ§a": "Desde â‚¬6/prenda",
    "A partir de â‚¬5/par": "Desde â‚¬5/par",
    "A partir de â‚¬29/saco": "Desde â‚¬29/bolsa",
    "Detalhes do serviÃ§o": "Detalles del servicio",
    "O cuidado certo para cada tecido": "El cuidado adecuado para cada tejido",
    "Para que serve": "Ideal para",
    "Inclui": "Incluye",
    "Como tratamos": "CÃ³mo lo tratamos",
    "Pedir orÃ§amento": "Pedir presupuesto",
    "Ver outros serviÃ§os": "Ver otros servicios",
    "Tecidos": "Tejidos",
    "Produtos usados": "Productos usados",
    "O que evitar": "QuÃ© evitar",
  },
};

const originalTextByNode = new WeakMap<Text, string>();

const cleanTranslations: typeof translations = {
  en: {
    "Como funciona": "How it works",
    "ServiÃ§os": "Services",
    "Nossos serviÃ§os": "Our services",
    "Entrar": "Login",
    "Criar conta": "Create account",
    "Roupa limpa,": "Clean clothes,",
    "sem perder tempo.": "without losing time.",
    "Cria a tua conta, agenda a recolha e acompanha tudo pelo app da Easy Clean.": "Create your account, schedule pickup and track everything in the Easy Clean app.",
    "Criar conta agora": "Create account now",
    "JÃ¡ tenho conta": "I already have an account",
    "Recolha em casa": "Home pickup",
    "ServiÃ§os por pedido": "Services on demand",
    "Acompanhamento online": "Online tracking",
    "Como funciona?": "How does it work?",
    "Um processo simples para o cliente entender rÃ¡pido e comeÃ§ar pelo cadastro.": "A simple process so customers understand quickly and start by creating an account.",
    "Regista-te para guardar os teus dados e morada.": "Register to save your details and address.",
    "Agendar recolha": "Schedule pickup",
    "Escolhe o serviÃ§o e o horÃ¡rio ideal.": "Choose the service and preferred time.",
    "Tratamento da roupa": "Laundry care",
    "A roupa Ã© lavada, seca e organizada com cuidado.": "Your laundry is washed, dried and organized with care.",
    "Entrega em casa": "Home delivery",
    "Recebe tudo pronto para usar.": "Receive everything ready to use.",
    "ServiÃ§os de lavandaria": "Laundry services",
    "O cliente pode conhecer os serviÃ§os aqui e depois entrar ou criar conta para fazer o pedido.": "Customers can view the services here, then log in or create an account to order.",
    "Lavagem": "Washing",
    "Passagem a Ferro": "Ironing",
    "Limpeza a Seco": "Dry Cleaning",
    "Roupas de Cama": "Bed Linen",
    "CalÃ§ado": "Shoes",
    "Saco Completo": "Full Bag",
    "Lavagem profissional para roupa do dia a dia.": "Professional washing for everyday clothes.",
    "Roupa sem vincos, pronta para usar.": "Wrinkle-free clothes, ready to wear.",
    "Cuidado especial para peÃ§as delicadas.": "Special care for delicate items.",
    "LenÃ§Ã³is, edredons e toalhas com sensaÃ§Ã£o de limpeza.": "Sheets, duvets and towels with a fresh clean feel.",
    "Limpeza e tratamento para pares do dia a dia.": "Cleaning and care for everyday pairs.",
    "PreÃ§o fixo para uma recolha prÃ¡tica.": "Fixed price for a practical pickup.",
    "A partir de â‚¬4/kg": "From â‚¬4/kg",
    "A partir de â‚¬2/peÃ§a": "From â‚¬2/item",
    "A partir de â‚¬8/peÃ§a": "From â‚¬8/item",
    "A partir de â‚¬6/peÃ§a": "From â‚¬6/item",
    "A partir de â‚¬5/par": "From â‚¬5/pair",
    "A partir de â‚¬29/saco": "From â‚¬29/bag",
    "Ver guia": "View guide",
    "Criar conta para pedir": "Create account to order",
    "Recolha, tratamento e entrega com cuidado.": "Pickup, care and delivery with attention.",
    "Empresa": "Company",
    "Suporte": "Support",
    "Contacto": "Contact",
    "Registar": "Register",
    "Privacidade": "Privacy",
    "Adicionar email": "Add email",
    "Adicionar telefone": "Add phone",
    "Segunda a sÃ¡bado Â· 08h Ã s 19h": "Monday to Saturday Â· 08:00 to 19:00",
  },
  fr: {
    "Como funciona": "Comment Ã§a marche",
    "ServiÃ§os": "Services",
    "Nossos serviÃ§os": "Nos services",
    "Entrar": "Connexion",
    "Criar conta": "CrÃ©er un compte",
    "Roupa limpa,": "Linge propre,",
    "sem perder tempo.": "sans perdre de temps.",
    "Cria a tua conta, agenda a recolha e acompanha tudo pelo app da Easy Clean.": "CrÃ©ez votre compte, planifiez la collecte et suivez tout dans l'app Easy Clean.",
    "Criar conta agora": "CrÃ©er un compte maintenant",
    "JÃ¡ tenho conta": "J'ai dÃ©jÃ  un compte",
    "Recolha em casa": "Collecte Ã  domicile",
    "ServiÃ§os por pedido": "Services Ã  la demande",
    "Acompanhamento online": "Suivi en ligne",
    "Como funciona?": "Comment Ã§a marche ?",
    "Um processo simples para o cliente entender rÃ¡pido e comeÃ§ar pelo cadastro.": "Un processus simple pour comprendre vite et commencer par l'inscription.",
    "Regista-te para guardar os teus dados e morada.": "Inscrivez-vous pour enregistrer vos informations et votre adresse.",
    "Agendar recolha": "Planifier la collecte",
    "Escolhe o serviÃ§o e o horÃ¡rio ideal.": "Choisissez le service et l'horaire idÃ©al.",
    "Tratamento da roupa": "Entretien du linge",
    "A roupa Ã© lavada, seca e organizada com cuidado.": "Le linge est lavÃ©, sÃ©chÃ© et organisÃ© avec soin.",
    "Entrega em casa": "Livraison Ã  domicile",
    "Recebe tudo pronto para usar.": "Recevez tout prÃªt Ã  utiliser.",
    "ServiÃ§os de lavandaria": "Services de blanchisserie",
    "O cliente pode conhecer os serviÃ§os aqui e depois entrar ou criar conta para fazer o pedido.": "Le client peut consulter les services puis se connecter ou crÃ©er un compte pour commander.",
    "Lavagem": "Lavage",
    "Passagem a Ferro": "Repassage",
    "Limpeza a Seco": "Nettoyage Ã  sec",
    "Roupas de Cama": "Linge de lit",
    "CalÃ§ado": "Chaussures",
    "Saco Completo": "Sac complet",
    "Lavagem profissional para roupa do dia a dia.": "Lavage professionnel pour le linge du quotidien.",
    "Roupa sem vincos, pronta para usar.": "Linge sans plis, prÃªt Ã  porter.",
    "Cuidado especial para peÃ§as delicadas.": "Soin spÃ©cial pour les piÃ¨ces dÃ©licates.",
    "LenÃ§Ã³is, edredons e toalhas com sensaÃ§Ã£o de limpeza.": "Draps, couettes et serviettes avec une sensation de fraÃ®cheur.",
    "Limpeza e tratamento para pares do dia a dia.": "Nettoyage et soin des chaussures du quotidien.",
    "PreÃ§o fixo para uma recolha prÃ¡tica.": "Prix fixe pour une collecte pratique.",
    "A partir de â‚¬4/kg": "Ã€ partir de â‚¬4/kg",
    "A partir de â‚¬2/peÃ§a": "Ã€ partir de â‚¬2/piÃ¨ce",
    "A partir de â‚¬8/peÃ§a": "Ã€ partir de â‚¬8/piÃ¨ce",
    "A partir de â‚¬6/peÃ§a": "Ã€ partir de â‚¬6/piÃ¨ce",
    "A partir de â‚¬5/par": "Ã€ partir de â‚¬5/paire",
    "A partir de â‚¬29/saco": "Ã€ partir de â‚¬29/sac",
    "Ver guia": "Voir le guide",
    "Criar conta para pedir": "CrÃ©er un compte pour commander",
    "Recolha, tratamento e entrega com cuidado.": "Collecte, traitement et livraison avec soin.",
    "Empresa": "Entreprise",
    "Suporte": "Support",
    "Contacto": "Contact",
    "Registar": "S'inscrire",
    "Privacidade": "ConfidentialitÃ©",
    "Adicionar email": "Ajouter un email",
    "Adicionar telefone": "Ajouter un tÃ©lÃ©phone",
    "Segunda a sÃ¡bado Â· 08h Ã s 19h": "Lundi Ã  samedi Â· 08h Ã  19h",
  },
  de: {
    "Como funciona": "So funktioniert es",
    "ServiÃ§os": "Services",
    "Nossos serviÃ§os": "Unsere Services",
    "Entrar": "Einloggen",
    "Criar conta": "Konto erstellen",
    "Roupa limpa,": "Saubere WÃ¤sche,",
    "sem perder tempo.": "ohne Zeitverlust.",
    "Cria a tua conta, agenda a recolha e acompanha tudo pelo app da Easy Clean.": "Erstellen Sie Ihr Konto, planen Sie die Abholung und verfolgen Sie alles in der Easy Clean App.",
    "Criar conta agora": "Jetzt Konto erstellen",
    "JÃ¡ tenho conta": "Ich habe schon ein Konto",
    "Recolha em casa": "Abholung zu Hause",
    "ServiÃ§os por pedido": "Services auf Anfrage",
    "Acompanhamento online": "Online-Verfolgung",
    "Como funciona?": "Wie funktioniert es?",
    "Um processo simples para o cliente entender rÃ¡pido e comeÃ§ar pelo cadastro.": "Ein einfacher Prozess, damit Kunden schnell verstehen und mit der Registrierung starten.",
    "Regista-te para guardar os teus dados e morada.": "Registrieren Sie sich, um Ihre Daten und Adresse zu speichern.",
    "Agendar recolha": "Abholung planen",
    "Escolhe o serviÃ§o e o horÃ¡rio ideal.": "WÃ¤hlen Sie den Service und die passende Zeit.",
    "Tratamento da roupa": "WÃ¤schepflege",
    "A roupa Ã© lavada, seca e organizada com cuidado.": "Ihre WÃ¤sche wird sorgfÃ¤ltig gewaschen, getrocknet und organisiert.",
    "Entrega em casa": "Lieferung nach Hause",
    "Recebe tudo pronto para usar.": "Alles kommt gebrauchsfertig zurÃ¼ck.",
    "ServiÃ§os de lavandaria": "WÃ¤scheservices",
    "O cliente pode conhecer os serviÃ§os aqui e depois entrar ou criar conta para fazer o pedido.": "Kunden kÃ¶nnen die Services ansehen und sich dann anmelden oder ein Konto erstellen.",
    "Lavagem": "Waschen",
    "Passagem a Ferro": "BÃ¼geln",
    "Limpeza a Seco": "Chemische Reinigung",
    "Roupas de Cama": "BettwÃ¤sche",
    "CalÃ§ado": "Schuhe",
    "Saco Completo": "Kompletter Beutel",
    "Lavagem profissional para roupa do dia a dia.": "Professionelles Waschen fÃ¼r Alltagskleidung.",
    "Roupa sem vincos, pronta para usar.": "Knitterfreie Kleidung, bereit zum Tragen.",
    "Cuidado especial para peÃ§as delicadas.": "Besondere Pflege fÃ¼r empfindliche StÃ¼cke.",
    "LenÃ§Ã³is, edredons e toalhas com sensaÃ§Ã£o de limpeza.": "Laken, Decken und HandtÃ¼cher mit frischem GefÃ¼hl.",
    "Limpeza e tratamento para pares do dia a dia.": "Reinigung und Pflege fÃ¼r Alltagsschuhe.",
    "PreÃ§o fixo para uma recolha prÃ¡tica.": "Festpreis fÃ¼r eine praktische Abholung.",
    "A partir de â‚¬4/kg": "Ab â‚¬4/kg",
    "A partir de â‚¬2/peÃ§a": "Ab â‚¬2/StÃ¼ck",
    "A partir de â‚¬8/peÃ§a": "Ab â‚¬8/StÃ¼ck",
    "A partir de â‚¬6/peÃ§a": "Ab â‚¬6/StÃ¼ck",
    "A partir de â‚¬5/par": "Ab â‚¬5/Paar",
    "A partir de â‚¬29/saco": "Ab â‚¬29/Beutel",
    "Ver guia": "Guide ansehen",
    "Criar conta para pedir": "Konto erstellen zum Bestellen",
    "Recolha, tratamento e entrega com cuidado.": "Abholung, Pflege und Lieferung mit Sorgfalt.",
    "Empresa": "Unternehmen",
    "Suporte": "Support",
    "Contacto": "Kontakt",
    "Registar": "Registrieren",
    "Privacidade": "Datenschutz",
    "Adicionar email": "E-Mail hinzufÃ¼gen",
    "Adicionar telefone": "Telefon hinzufÃ¼gen",
    "Segunda a sÃ¡bado Â· 08h Ã s 19h": "Montag bis Samstag Â· 08:00 bis 19:00",
  },
  es: {
    "Como funciona": "CÃ³mo funciona",
    "ServiÃ§os": "Servicios",
    "Nossos serviÃ§os": "Nuestros servicios",
    "Entrar": "Entrar",
    "Criar conta": "Crear cuenta",
    "Roupa limpa,": "Ropa limpia,",
    "sem perder tempo.": "sin perder tiempo.",
    "Cria a tua conta, agenda a recolha e acompanha tudo pelo app da Easy Clean.": "Crea tu cuenta, agenda la recogida y sigue todo en la app de Easy Clean.",
    "Criar conta agora": "Crear cuenta ahora",
    "JÃ¡ tenho conta": "Ya tengo cuenta",
    "Recolha em casa": "Recogida en casa",
    "ServiÃ§os por pedido": "Servicios por pedido",
    "Acompanhamento online": "Seguimiento online",
    "Como funciona?": "Â¿CÃ³mo funciona?",
    "Um processo simples para o cliente entender rÃ¡pido e comeÃ§ar pelo cadastro.": "Un proceso simple para entender rÃ¡pido y empezar con el registro.",
    "Regista-te para guardar os teus dados e morada.": "RegÃ­strate para guardar tus datos y direcciÃ³n.",
    "Agendar recolha": "Agendar recogida",
    "Escolhe o serviÃ§o e o horÃ¡rio ideal.": "Elige el servicio y el horario ideal.",
    "Tratamento da roupa": "Cuidado de la ropa",
    "A roupa Ã© lavada, seca e organizada com cuidado.": "La ropa se lava, seca y organiza con cuidado.",
    "Entrega em casa": "Entrega en casa",
    "Recebe tudo pronto para usar.": "Recibe todo listo para usar.",
    "ServiÃ§os de lavandaria": "Servicios de lavanderÃ­a",
    "O cliente pode conhecer os serviÃ§os aqui e depois entrar ou criar conta para fazer o pedido.": "El cliente puede ver los servicios y luego entrar o crear una cuenta para pedir.",
    "Lavagem": "Lavado",
    "Passagem a Ferro": "Planchado",
    "Limpeza a Seco": "Limpieza en seco",
    "Roupas de Cama": "Ropa de cama",
    "CalÃ§ado": "Calzado",
    "Saco Completo": "Bolsa completa",
    "Lavagem profissional para roupa do dia a dia.": "Lavado profesional para ropa del dÃ­a a dÃ­a.",
    "Roupa sem vincos, pronta para usar.": "Ropa sin arrugas, lista para usar.",
    "Cuidado especial para peÃ§as delicadas.": "Cuidado especial para prendas delicadas.",
    "LenÃ§Ã³is, edredons e toalhas com sensaÃ§Ã£o de limpeza.": "SÃ¡banas, edredones y toallas con sensaciÃ³n de limpieza.",
    "Limpeza e tratamento para pares do dia a dia.": "Limpieza y cuidado para calzado diario.",
    "PreÃ§o fixo para uma recolha prÃ¡tica.": "Precio fijo para una recogida prÃ¡ctica.",
    "A partir de â‚¬4/kg": "Desde â‚¬4/kg",
    "A partir de â‚¬2/peÃ§a": "Desde â‚¬2/prenda",
    "A partir de â‚¬8/peÃ§a": "Desde â‚¬8/prenda",
    "A partir de â‚¬6/peÃ§a": "Desde â‚¬6/prenda",
    "A partir de â‚¬5/par": "Desde â‚¬5/par",
    "A partir de â‚¬29/saco": "Desde â‚¬29/bolsa",
    "Ver guia": "Ver guÃ­a",
    "Criar conta para pedir": "Crear cuenta para pedir",
    "Recolha, tratamento e entrega com cuidado.": "Recogida, cuidado y entrega con atenciÃ³n.",
    "Empresa": "Empresa",
    "Suporte": "Soporte",
    "Contacto": "Contacto",
    "Registar": "Registrarse",
    "Privacidade": "Privacidad",
    "Adicionar email": "AÃ±adir email",
    "Adicionar telefone": "AÃ±adir telÃ©fono",
    "Segunda a sÃ¡bado Â· 08h Ã s 19h": "Lunes a sÃ¡bado Â· 08:00 a 19:00",
  },
};

for (const code of ["en", "fr", "de", "es"] as const) {
  Object.assign(translations[code], cleanTranslations[code]);
}
Object.assign(translations.en, {
  "Cria conta": "Create account",
  "Guarda os teus dados.": "Save your details.",
  "Escolhe dia e horÃ¡rio.": "Choose day and time.",
  "Lavamos": "We wash",
  "Tratamos a roupa.": "We care for the laundry.",
  "Entregamos": "We deliver",
  "Tudo pronto em casa.": "Everything ready at home.",
  "WhatsApp": "WhatsApp",
});

Object.assign(translations.fr, {
  "Cria conta": "CrÃ©er un compte",
  "Guarda os teus dados.": "Enregistrez vos informations.",
  "Escolhe dia e horÃ¡rio.": "Choisissez le jour et l'horaire.",
  "Lavamos": "Nous lavons",
  "Tratamos a roupa.": "Nous prenons soin du linge.",
  "Entregamos": "Nous livrons",
  "Tudo pronto em casa.": "Tout est prÃªt Ã  domicile.",
  "WhatsApp": "WhatsApp",
});

Object.assign(translations.de, {
  "Cria conta": "Konto erstellen",
  "Guarda os teus dados.": "Speichern Sie Ihre Daten.",
  "Escolhe dia e horÃ¡rio.": "WÃ¤hlen Sie Tag und Uhrzeit.",
  "Lavamos": "Wir waschen",
  "Tratamos a roupa.": "Wir pflegen die WÃ¤sche.",
  "Entregamos": "Wir liefern",
  "Tudo pronto em casa.": "Alles fertig zu Hause.",
  "WhatsApp": "WhatsApp",
});

Object.assign(translations.es, {
  "Cria conta": "Crea una cuenta",
  "Guarda os teus dados.": "Guarda tus datos.",
  "Escolhe dia e horÃ¡rio.": "Elige dÃ­a y horario.",
  "Lavamos": "Lavamos",
  "Tratamos a roupa.": "Cuidamos la ropa.",
  "Entregamos": "Entregamos",
  "Tudo pronto em casa.": "Todo listo en casa.",
  "WhatsApp": "WhatsApp",
});

Object.assign(translations.en, {
  "ConfianÃ§a": "Trust",
  "Por que escolher a Easy Clean?": "Why choose Easy Clean?",
  "A equipa recolhe e devolve na morada combinada.": "The team picks up and returns at the agreed address.",
  "Pagamento seguro": "Secure payment",
  "Fluxo preparado para pedidos online com conta do cliente.": "Flow prepared for online orders with a customer account.",
  "Suporte direto": "Direct support",
  "Contacto simples para dÃºvidas, horÃ¡rios e pedidos especiais.": "Simple contact for questions, schedules and special requests.",
  "ServiÃ§o organizado": "Organized service",
  "Pedidos, serviÃ§os e entregas pensados para acompanhamento online.": "Orders, services and deliveries designed for online tracking.",
  "DÃºvidas frequentes": "Frequently asked questions",
  "Antes de pedir": "Before ordering",
  "Como funciona a recolha?": "How does pickup work?",
  "O cliente cria conta, informa a morada e agenda a recolha. A roupa Ã© tratada e depois devolvida em casa.": "The customer creates an account, enters the address and schedules pickup. The laundry is handled and returned home.",
  "Quanto tempo demora?": "How long does it take?",
  "O prazo depende do tipo de serviÃ§o e volume da roupa. A confirmaÃ§Ã£o pode ser feita antes do pedido.": "The time depends on the service type and laundry volume. Confirmation can be made before the order.",
  "Como faÃ§o o pedido?": "How do I order?",
  "Basta criar conta ou entrar no app, escolher o serviÃ§o e acompanhar o estado do pedido online.": "Just create an account or log into the app, choose the service and track the order online.",
  "Atendem minha zona?": "Do you serve my area?",
  "O atendimento Ã© focado em Luxembourg. A disponibilidade da morada pode ser confirmada no contacto.": "Service is focused on Luxembourg. Address availability can be confirmed by contact.",
});

Object.assign(translations.fr, {
  "ConfianÃ§a": "Confiance",
  "Por que escolher a Easy Clean?": "Pourquoi choisir Easy Clean ?",
  "A equipa recolhe e devolve na morada combinada.": "L'Ã©quipe collecte et livre Ã  l'adresse convenue.",
  "Pagamento seguro": "Paiement sÃ©curisÃ©",
  "Fluxo preparado para pedidos online com conta do cliente.": "Parcours prÃ©parÃ© pour les commandes en ligne avec compte client.",
  "Suporte direto": "Support direct",
  "Contacto simples para dÃºvidas, horÃ¡rios e pedidos especiais.": "Contact simple pour questions, horaires et demandes spÃ©ciales.",
  "ServiÃ§o organizado": "Service organisÃ©",
  "Pedidos, serviÃ§os e entregas pensados para acompanhamento online.": "Commandes, services et livraisons pensÃ©s pour le suivi en ligne.",
  "DÃºvidas frequentes": "Questions frÃ©quentes",
  "Antes de pedir": "Avant de commander",
  "Como funciona a recolha?": "Comment fonctionne la collecte ?",
  "O cliente cria conta, informa a morada e agenda a recolha. A roupa Ã© tratada e depois devolvida em casa.": "Le client crÃ©e un compte, indique l'adresse et planifie la collecte. Le linge est traitÃ© puis livrÃ© Ã  domicile.",
  "Quanto tempo demora?": "Combien de temps cela prend ?",
  "O prazo depende do tipo de serviÃ§o e volume da roupa. A confirmaÃ§Ã£o pode ser feita antes do pedido.": "Le dÃ©lai dÃ©pend du type de service et du volume. La confirmation peut Ãªtre faite avant la commande.",
  "Como faÃ§o o pedido?": "Comment commander ?",
  "Basta criar conta ou entrar no app, escolher o serviÃ§o e acompanhar o estado do pedido online.": "Il suffit de crÃ©er un compte ou de se connecter, choisir le service et suivre la commande en ligne.",
  "Atendem minha zona?": "Servez-vous ma zone ?",
  "O atendimento Ã© focado em Luxembourg. A disponibilidade da morada pode ser confirmada no contacto.": "Le service est centrÃ© sur Luxembourg. La disponibilitÃ© de l'adresse peut Ãªtre confirmÃ©e par contact.",
});

Object.assign(translations.de, {
  "ConfianÃ§a": "Vertrauen",
  "Por que escolher a Easy Clean?": "Warum Easy Clean wÃ¤hlen?",
  "A equipa recolhe e devolve na morada combinada.": "Das Team holt ab und liefert an die vereinbarte Adresse.",
  "Pagamento seguro": "Sichere Zahlung",
  "Fluxo preparado para pedidos online com conta do cliente.": "Ablauf fÃ¼r Online-Bestellungen mit Kundenkonto vorbereitet.",
  "Suporte direto": "Direkter Support",
  "Contacto simples para dÃºvidas, horÃ¡rios e pedidos especiais.": "Einfacher Kontakt fÃ¼r Fragen, Zeiten und SonderwÃ¼nsche.",
  "ServiÃ§o organizado": "Organisierter Service",
  "Pedidos, serviÃ§os e entregas pensados para acompanhamento online.": "Bestellungen, Services und Lieferungen fÃ¼r Online-Tracking gedacht.",
  "DÃºvidas frequentes": "HÃ¤ufige Fragen",
  "Antes de pedir": "Vor der Bestellung",
  "Como funciona a recolha?": "Wie funktioniert die Abholung?",
  "O cliente cria conta, informa a morada e agenda a recolha. A roupa Ã© tratada e depois devolvida em casa.": "Der Kunde erstellt ein Konto, gibt die Adresse ein und plant die Abholung. Die WÃ¤sche wird bearbeitet und nach Hause geliefert.",
  "Quanto tempo demora?": "Wie lange dauert es?",
  "O prazo depende do tipo de serviÃ§o e volume da roupa. A confirmaÃ§Ã£o pode ser feita antes do pedido.": "Die Dauer hÃ¤ngt von Serviceart und WÃ¤schemenge ab. Die BestÃ¤tigung kann vor der Bestellung erfolgen.",
  "Como faÃ§o o pedido?": "Wie bestelle ich?",
  "Basta criar conta ou entrar no app, escolher o serviÃ§o e acompanhar o estado do pedido online.": "Einfach Konto erstellen oder einloggen, Service wÃ¤hlen und den Status online verfolgen.",
  "Atendem minha zona?": "Bedienen Sie meine Gegend?",
  "O atendimento Ã© focado em Luxembourg. A disponibilidade da morada pode ser confirmada no contacto.": "Der Service konzentriert sich auf Luxembourg. Die VerfÃ¼gbarkeit der Adresse kann per Kontakt bestÃ¤tigt werden.",
});

Object.assign(translations.es, {
  "ConfianÃ§a": "Confianza",
  "Por que escolher a Easy Clean?": "Â¿Por quÃ© elegir Easy Clean?",
  "A equipa recolhe e devolve na morada combinada.": "El equipo recoge y entrega en la direcciÃ³n acordada.",
  "Pagamento seguro": "Pago seguro",
  "Fluxo preparado para pedidos online com conta do cliente.": "Flujo preparado para pedidos online con cuenta del cliente.",
  "Suporte direto": "Soporte directo",
  "Contacto simples para dÃºvidas, horÃ¡rios e pedidos especiais.": "Contacto simple para dudas, horarios y pedidos especiales.",
  "ServiÃ§o organizado": "Servicio organizado",
  "Pedidos, serviÃ§os e entregas pensados para acompanhamento online.": "Pedidos, servicios y entregas pensados para seguimiento online.",
  "DÃºvidas frequentes": "Preguntas frecuentes",
  "Antes de pedir": "Antes de pedir",
  "Como funciona a recolha?": "Â¿CÃ³mo funciona la recogida?",
  "O cliente cria conta, informa a morada e agenda a recolha. A roupa Ã© tratada e depois devolvida em casa.": "El cliente crea una cuenta, informa la direcciÃ³n y agenda la recogida. La ropa se trata y luego se devuelve en casa.",
  "Quanto tempo demora?": "Â¿CuÃ¡nto tarda?",
  "O prazo depende do tipo de serviÃ§o e volume da roupa. A confirmaÃ§Ã£o pode ser feita antes do pedido.": "El plazo depende del tipo de servicio y volumen de ropa. La confirmaciÃ³n puede hacerse antes del pedido.",
  "Como faÃ§o o pedido?": "Â¿CÃ³mo hago el pedido?",
  "Basta criar conta ou entrar no app, escolher o serviÃ§o e acompanhar o estado do pedido online.": "Solo crea una cuenta o entra en la app, elige el servicio y sigue el estado online.",
  "Atendem minha zona?": "Â¿Atienden mi zona?",
  "O atendimento Ã© focado em Luxembourg. A disponibilidade da morada pode ser confirmada no contacto.": "El servicio se centra en Luxembourg. La disponibilidad de la direcciÃ³n puede confirmarse por contacto.",
});

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
          <Image
            src={currentLanguage.flagSrc}
            alt=""
            fill
            sizes="28px"
            className="object-cover"
          />
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
                    <Image
                      src={item.flagSrc}
                      alt=""
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black">{item.name}</span>
                    <span className="block text-[11px] font-bold uppercase tracking-widest text-gray-400">{item.label}</span>
                  </span>
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