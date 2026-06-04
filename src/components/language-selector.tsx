"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

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

const cleanTranslations: typeof translations = {
  en: {
    "Como funciona": "How it works",
    "Serviços": "Services",
    "Nossos serviços": "Our services",
    "Entrar": "Login",
    "Criar conta": "Create account",
    "Roupa limpa,": "Clean clothes,",
    "sem perder tempo.": "without losing time.",
    "Cria a tua conta, agenda a recolha e acompanha tudo pelo app da Easy Clean.": "Create your account, schedule pickup and track everything in the Easy Clean app.",
    "Criar conta agora": "Create account now",
    "Já tenho conta": "I already have an account",
    "Recolha em casa": "Home pickup",
    "Serviços por pedido": "Services on demand",
    "Acompanhamento online": "Online tracking",
    "Como funciona?": "How does it work?",
    "Um processo simples para o cliente entender rápido e começar pelo cadastro.": "A simple process so customers understand quickly and start by creating an account.",
    "Regista-te para guardar os teus dados e morada.": "Register to save your details and address.",
    "Agendar recolha": "Schedule pickup",
    "Escolhe o serviço e o horário ideal.": "Choose the service and preferred time.",
    "Tratamento da roupa": "Laundry care",
    "A roupa é lavada, seca e organizada com cuidado.": "Your laundry is washed, dried and organized with care.",
    "Entrega em casa": "Home delivery",
    "Recebe tudo pronto para usar.": "Receive everything ready to use.",
    "Serviços de lavandaria": "Laundry services",
    "O cliente pode conhecer os serviços aqui e depois entrar ou criar conta para fazer o pedido.": "Customers can view the services here, then log in or create an account to order.",
    "Lavagem": "Washing",
    "Passagem a Ferro": "Ironing",
    "Limpeza a Seco": "Dry Cleaning",
    "Roupas de Cama": "Bed Linen",
    "Calçado": "Shoes",
    "Saco Completo": "Full Bag",
    "Lavagem profissional para roupa do dia a dia.": "Professional washing for everyday clothes.",
    "Roupa sem vincos, pronta para usar.": "Wrinkle-free clothes, ready to wear.",
    "Cuidado especial para peças delicadas.": "Special care for delicate items.",
    "Lençóis, edredons e toalhas com sensação de limpeza.": "Sheets, duvets and towels with a fresh clean feel.",
    "Limpeza e tratamento para pares do dia a dia.": "Cleaning and care for everyday pairs.",
    "Preço fixo para uma recolha prática.": "Fixed price for a practical pickup.",
    "A partir de €4/kg": "From €4/kg",
    "A partir de €2/peça": "From €2/item",
    "A partir de €8/peça": "From €8/item",
    "A partir de €6/peça": "From €6/item",
    "A partir de €5/par": "From €5/pair",
    "A partir de €29/saco": "From €29/bag",
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
    "Segunda a sábado · 08h às 19h": "Monday to Saturday · 08:00 to 19:00",
  },
  fr: {
    "Como funciona": "Comment ça marche",
    "Serviços": "Services",
    "Nossos serviços": "Nos services",
    "Entrar": "Connexion",
    "Criar conta": "Créer un compte",
    "Roupa limpa,": "Linge propre,",
    "sem perder tempo.": "sans perdre de temps.",
    "Cria a tua conta, agenda a recolha e acompanha tudo pelo app da Easy Clean.": "Créez votre compte, planifiez la collecte et suivez tout dans l'app Easy Clean.",
    "Criar conta agora": "Créer un compte maintenant",
    "Já tenho conta": "J'ai déjà un compte",
    "Recolha em casa": "Collecte à domicile",
    "Serviços por pedido": "Services à la demande",
    "Acompanhamento online": "Suivi en ligne",
    "Como funciona?": "Comment ça marche ?",
    "Um processo simples para o cliente entender rápido e começar pelo cadastro.": "Un processus simple pour comprendre vite et commencer par l'inscription.",
    "Regista-te para guardar os teus dados e morada.": "Inscrivez-vous pour enregistrer vos informations et votre adresse.",
    "Agendar recolha": "Planifier la collecte",
    "Escolhe o serviço e o horário ideal.": "Choisissez le service et l'horaire idéal.",
    "Tratamento da roupa": "Entretien du linge",
    "A roupa é lavada, seca e organizada com cuidado.": "Le linge est lavé, séché et organisé avec soin.",
    "Entrega em casa": "Livraison à domicile",
    "Recebe tudo pronto para usar.": "Recevez tout prêt à utiliser.",
    "Serviços de lavandaria": "Services de blanchisserie",
    "O cliente pode conhecer os serviços aqui e depois entrar ou criar conta para fazer o pedido.": "Le client peut consulter les services puis se connecter ou créer un compte pour commander.",
    "Lavagem": "Lavage",
    "Passagem a Ferro": "Repassage",
    "Limpeza a Seco": "Nettoyage à sec",
    "Roupas de Cama": "Linge de lit",
    "Calçado": "Chaussures",
    "Saco Completo": "Sac complet",
    "Lavagem profissional para roupa do dia a dia.": "Lavage professionnel pour le linge du quotidien.",
    "Roupa sem vincos, pronta para usar.": "Linge sans plis, prêt à porter.",
    "Cuidado especial para peças delicadas.": "Soin spécial pour les pièces délicates.",
    "Lençóis, edredons e toalhas com sensação de limpeza.": "Draps, couettes et serviettes avec une sensation de fraîcheur.",
    "Limpeza e tratamento para pares do dia a dia.": "Nettoyage et soin des chaussures du quotidien.",
    "Preço fixo para uma recolha prática.": "Prix fixe pour une collecte pratique.",
    "A partir de €4/kg": "À partir de €4/kg",
    "A partir de €2/peça": "À partir de €2/pièce",
    "A partir de €8/peça": "À partir de €8/pièce",
    "A partir de €6/peça": "À partir de €6/pièce",
    "A partir de €5/par": "À partir de €5/paire",
    "A partir de €29/saco": "À partir de €29/sac",
    "Ver guia": "Voir le guide",
    "Criar conta para pedir": "Créer un compte pour commander",
    "Recolha, tratamento e entrega com cuidado.": "Collecte, traitement et livraison avec soin.",
    "Empresa": "Entreprise",
    "Suporte": "Support",
    "Contacto": "Contact",
    "Registar": "S'inscrire",
    "Privacidade": "Confidentialité",
    "Adicionar email": "Ajouter un email",
    "Adicionar telefone": "Ajouter un téléphone",
    "Segunda a sábado · 08h às 19h": "Lundi à samedi · 08h à 19h",
  },
  de: {
    "Como funciona": "So funktioniert es",
    "Serviços": "Services",
    "Nossos serviços": "Unsere Services",
    "Entrar": "Einloggen",
    "Criar conta": "Konto erstellen",
    "Roupa limpa,": "Saubere Wäsche,",
    "sem perder tempo.": "ohne Zeitverlust.",
    "Cria a tua conta, agenda a recolha e acompanha tudo pelo app da Easy Clean.": "Erstellen Sie Ihr Konto, planen Sie die Abholung und verfolgen Sie alles in der Easy Clean App.",
    "Criar conta agora": "Jetzt Konto erstellen",
    "Já tenho conta": "Ich habe schon ein Konto",
    "Recolha em casa": "Abholung zu Hause",
    "Serviços por pedido": "Services auf Anfrage",
    "Acompanhamento online": "Online-Verfolgung",
    "Como funciona?": "Wie funktioniert es?",
    "Um processo simples para o cliente entender rápido e começar pelo cadastro.": "Ein einfacher Prozess, damit Kunden schnell verstehen und mit der Registrierung starten.",
    "Regista-te para guardar os teus dados e morada.": "Registrieren Sie sich, um Ihre Daten und Adresse zu speichern.",
    "Agendar recolha": "Abholung planen",
    "Escolhe o serviço e o horário ideal.": "Wählen Sie den Service und die passende Zeit.",
    "Tratamento da roupa": "Wäschepflege",
    "A roupa é lavada, seca e organizada com cuidado.": "Ihre Wäsche wird sorgfältig gewaschen, getrocknet und organisiert.",
    "Entrega em casa": "Lieferung nach Hause",
    "Recebe tudo pronto para usar.": "Alles kommt gebrauchsfertig zurück.",
    "Serviços de lavandaria": "Wäscheservices",
    "O cliente pode conhecer os serviços aqui e depois entrar ou criar conta para fazer o pedido.": "Kunden können die Services ansehen und sich dann anmelden oder ein Konto erstellen.",
    "Lavagem": "Waschen",
    "Passagem a Ferro": "Bügeln",
    "Limpeza a Seco": "Chemische Reinigung",
    "Roupas de Cama": "Bettwäsche",
    "Calçado": "Schuhe",
    "Saco Completo": "Kompletter Beutel",
    "Lavagem profissional para roupa do dia a dia.": "Professionelles Waschen für Alltagskleidung.",
    "Roupa sem vincos, pronta para usar.": "Knitterfreie Kleidung, bereit zum Tragen.",
    "Cuidado especial para peças delicadas.": "Besondere Pflege für empfindliche Stücke.",
    "Lençóis, edredons e toalhas com sensação de limpeza.": "Laken, Decken und Handtücher mit frischem Gefühl.",
    "Limpeza e tratamento para pares do dia a dia.": "Reinigung und Pflege für Alltagsschuhe.",
    "Preço fixo para uma recolha prática.": "Festpreis für eine praktische Abholung.",
    "A partir de €4/kg": "Ab €4/kg",
    "A partir de €2/peça": "Ab €2/Stück",
    "A partir de €8/peça": "Ab €8/Stück",
    "A partir de €6/peça": "Ab €6/Stück",
    "A partir de €5/par": "Ab €5/Paar",
    "A partir de €29/saco": "Ab €29/Beutel",
    "Ver guia": "Guide ansehen",
    "Criar conta para pedir": "Konto erstellen zum Bestellen",
    "Recolha, tratamento e entrega com cuidado.": "Abholung, Pflege und Lieferung mit Sorgfalt.",
    "Empresa": "Unternehmen",
    "Suporte": "Support",
    "Contacto": "Kontakt",
    "Registar": "Registrieren",
    "Privacidade": "Datenschutz",
    "Adicionar email": "E-Mail hinzufügen",
    "Adicionar telefone": "Telefon hinzufügen",
    "Segunda a sábado · 08h às 19h": "Montag bis Samstag · 08:00 bis 19:00",
  },
  es: {
    "Como funciona": "Cómo funciona",
    "Serviços": "Servicios",
    "Nossos serviços": "Nuestros servicios",
    "Entrar": "Entrar",
    "Criar conta": "Crear cuenta",
    "Roupa limpa,": "Ropa limpia,",
    "sem perder tempo.": "sin perder tiempo.",
    "Cria a tua conta, agenda a recolha e acompanha tudo pelo app da Easy Clean.": "Crea tu cuenta, agenda la recogida y sigue todo en la app de Easy Clean.",
    "Criar conta agora": "Crear cuenta ahora",
    "Já tenho conta": "Ya tengo cuenta",
    "Recolha em casa": "Recogida en casa",
    "Serviços por pedido": "Servicios por pedido",
    "Acompanhamento online": "Seguimiento online",
    "Como funciona?": "¿Cómo funciona?",
    "Um processo simples para o cliente entender rápido e começar pelo cadastro.": "Un proceso simple para entender rápido y empezar con el registro.",
    "Regista-te para guardar os teus dados e morada.": "Regístrate para guardar tus datos y dirección.",
    "Agendar recolha": "Agendar recogida",
    "Escolhe o serviço e o horário ideal.": "Elige el servicio y el horario ideal.",
    "Tratamento da roupa": "Cuidado de la ropa",
    "A roupa é lavada, seca e organizada com cuidado.": "La ropa se lava, seca y organiza con cuidado.",
    "Entrega em casa": "Entrega en casa",
    "Recebe tudo pronto para usar.": "Recibe todo listo para usar.",
    "Serviços de lavandaria": "Servicios de lavandería",
    "O cliente pode conhecer os serviços aqui e depois entrar ou criar conta para fazer o pedido.": "El cliente puede ver los servicios y luego entrar o crear una cuenta para pedir.",
    "Lavagem": "Lavado",
    "Passagem a Ferro": "Planchado",
    "Limpeza a Seco": "Limpieza en seco",
    "Roupas de Cama": "Ropa de cama",
    "Calçado": "Calzado",
    "Saco Completo": "Bolsa completa",
    "Lavagem profissional para roupa do dia a dia.": "Lavado profesional para ropa del día a día.",
    "Roupa sem vincos, pronta para usar.": "Ropa sin arrugas, lista para usar.",
    "Cuidado especial para peças delicadas.": "Cuidado especial para prendas delicadas.",
    "Lençóis, edredons e toalhas com sensação de limpeza.": "Sábanas, edredones y toallas con sensación de limpieza.",
    "Limpeza e tratamento para pares do dia a dia.": "Limpieza y cuidado para calzado diario.",
    "Preço fixo para uma recolha prática.": "Precio fijo para una recogida práctica.",
    "A partir de €4/kg": "Desde €4/kg",
    "A partir de €2/peça": "Desde €2/prenda",
    "A partir de €8/peça": "Desde €8/prenda",
    "A partir de €6/peça": "Desde €6/prenda",
    "A partir de €5/par": "Desde €5/par",
    "A partir de €29/saco": "Desde €29/bolsa",
    "Ver guia": "Ver guía",
    "Criar conta para pedir": "Crear cuenta para pedir",
    "Recolha, tratamento e entrega com cuidado.": "Recogida, cuidado y entrega con atención.",
    "Empresa": "Empresa",
    "Suporte": "Soporte",
    "Contacto": "Contacto",
    "Registar": "Registrarse",
    "Privacidade": "Privacidad",
    "Adicionar email": "Añadir email",
    "Adicionar telefone": "Añadir teléfono",
    "Segunda a sábado · 08h às 19h": "Lunes a sábado · 08:00 a 19:00",
  },
};

for (const code of ["en", "fr", "de", "es"] as const) {
  Object.assign(translations[code], cleanTranslations[code]);
}

Object.assign(translations.en, {
  "Confiança": "Trust",
  "Por que escolher a Easy Clean?": "Why choose Easy Clean?",
  "A equipa recolhe e devolve na morada combinada.": "The team picks up and returns at the agreed address.",
  "Pagamento seguro": "Secure payment",
  "Fluxo preparado para pedidos online com conta do cliente.": "Flow prepared for online orders with a customer account.",
  "Suporte direto": "Direct support",
  "Contacto simples para dúvidas, horários e pedidos especiais.": "Simple contact for questions, schedules and special requests.",
  "Serviço organizado": "Organized service",
  "Pedidos, serviços e entregas pensados para acompanhamento online.": "Orders, services and deliveries designed for online tracking.",
  "Dúvidas frequentes": "Frequently asked questions",
  "Antes de pedir": "Before ordering",
  "Como funciona a recolha?": "How does pickup work?",
  "O cliente cria conta, informa a morada e agenda a recolha. A roupa é tratada e depois devolvida em casa.": "The customer creates an account, enters the address and schedules pickup. The laundry is handled and returned home.",
  "Quanto tempo demora?": "How long does it take?",
  "O prazo depende do tipo de serviço e volume da roupa. A confirmação pode ser feita antes do pedido.": "The time depends on the service type and laundry volume. Confirmation can be made before the order.",
  "Como faço o pedido?": "How do I order?",
  "Basta criar conta ou entrar no app, escolher o serviço e acompanhar o estado do pedido online.": "Just create an account or log into the app, choose the service and track the order online.",
  "Atendem minha zona?": "Do you serve my area?",
  "O atendimento é focado em Luxembourg. A disponibilidade da morada pode ser confirmada no contacto.": "Service is focused on Luxembourg. Address availability can be confirmed by contact.",
});

Object.assign(translations.fr, {
  "Confiança": "Confiance",
  "Por que escolher a Easy Clean?": "Pourquoi choisir Easy Clean ?",
  "A equipa recolhe e devolve na morada combinada.": "L'équipe collecte et livre à l'adresse convenue.",
  "Pagamento seguro": "Paiement sécurisé",
  "Fluxo preparado para pedidos online com conta do cliente.": "Parcours préparé pour les commandes en ligne avec compte client.",
  "Suporte direto": "Support direct",
  "Contacto simples para dúvidas, horários e pedidos especiais.": "Contact simple pour questions, horaires et demandes spéciales.",
  "Serviço organizado": "Service organisé",
  "Pedidos, serviços e entregas pensados para acompanhamento online.": "Commandes, services et livraisons pensés pour le suivi en ligne.",
  "Dúvidas frequentes": "Questions fréquentes",
  "Antes de pedir": "Avant de commander",
  "Como funciona a recolha?": "Comment fonctionne la collecte ?",
  "O cliente cria conta, informa a morada e agenda a recolha. A roupa é tratada e depois devolvida em casa.": "Le client crée un compte, indique l'adresse et planifie la collecte. Le linge est traité puis livré à domicile.",
  "Quanto tempo demora?": "Combien de temps cela prend ?",
  "O prazo depende do tipo de serviço e volume da roupa. A confirmação pode ser feita antes do pedido.": "Le délai dépend du type de service et du volume. La confirmation peut être faite avant la commande.",
  "Como faço o pedido?": "Comment commander ?",
  "Basta criar conta ou entrar no app, escolher o serviço e acompanhar o estado do pedido online.": "Il suffit de créer un compte ou de se connecter, choisir le service et suivre la commande en ligne.",
  "Atendem minha zona?": "Servez-vous ma zone ?",
  "O atendimento é focado em Luxembourg. A disponibilidade da morada pode ser confirmada no contacto.": "Le service est centré sur Luxembourg. La disponibilité de l'adresse peut être confirmée par contact.",
});

Object.assign(translations.de, {
  "Confiança": "Vertrauen",
  "Por que escolher a Easy Clean?": "Warum Easy Clean wählen?",
  "A equipa recolhe e devolve na morada combinada.": "Das Team holt ab und liefert an die vereinbarte Adresse.",
  "Pagamento seguro": "Sichere Zahlung",
  "Fluxo preparado para pedidos online com conta do cliente.": "Ablauf für Online-Bestellungen mit Kundenkonto vorbereitet.",
  "Suporte direto": "Direkter Support",
  "Contacto simples para dúvidas, horários e pedidos especiais.": "Einfacher Kontakt für Fragen, Zeiten und Sonderwünsche.",
  "Serviço organizado": "Organisierter Service",
  "Pedidos, serviços e entregas pensados para acompanhamento online.": "Bestellungen, Services und Lieferungen für Online-Tracking gedacht.",
  "Dúvidas frequentes": "Häufige Fragen",
  "Antes de pedir": "Vor der Bestellung",
  "Como funciona a recolha?": "Wie funktioniert die Abholung?",
  "O cliente cria conta, informa a morada e agenda a recolha. A roupa é tratada e depois devolvida em casa.": "Der Kunde erstellt ein Konto, gibt die Adresse ein und plant die Abholung. Die Wäsche wird bearbeitet und nach Hause geliefert.",
  "Quanto tempo demora?": "Wie lange dauert es?",
  "O prazo depende do tipo de serviço e volume da roupa. A confirmação pode ser feita antes do pedido.": "Die Dauer hängt von Serviceart und Wäschemenge ab. Die Bestätigung kann vor der Bestellung erfolgen.",
  "Como faço o pedido?": "Wie bestelle ich?",
  "Basta criar conta ou entrar no app, escolher o serviço e acompanhar o estado do pedido online.": "Einfach Konto erstellen oder einloggen, Service wählen und den Status online verfolgen.",
  "Atendem minha zona?": "Bedienen Sie meine Gegend?",
  "O atendimento é focado em Luxembourg. A disponibilidade da morada pode ser confirmada no contacto.": "Der Service konzentriert sich auf Luxembourg. Die Verfügbarkeit der Adresse kann per Kontakt bestätigt werden.",
});

Object.assign(translations.es, {
  "Confiança": "Confianza",
  "Por que escolher a Easy Clean?": "¿Por qué elegir Easy Clean?",
  "A equipa recolhe e devolve na morada combinada.": "El equipo recoge y entrega en la dirección acordada.",
  "Pagamento seguro": "Pago seguro",
  "Fluxo preparado para pedidos online com conta do cliente.": "Flujo preparado para pedidos online con cuenta del cliente.",
  "Suporte direto": "Soporte directo",
  "Contacto simples para dúvidas, horários e pedidos especiais.": "Contacto simple para dudas, horarios y pedidos especiales.",
  "Serviço organizado": "Servicio organizado",
  "Pedidos, serviços e entregas pensados para acompanhamento online.": "Pedidos, servicios y entregas pensados para seguimiento online.",
  "Dúvidas frequentes": "Preguntas frecuentes",
  "Antes de pedir": "Antes de pedir",
  "Como funciona a recolha?": "¿Cómo funciona la recogida?",
  "O cliente cria conta, informa a morada e agenda a recolha. A roupa é tratada e depois devolvida em casa.": "El cliente crea una cuenta, informa la dirección y agenda la recogida. La ropa se trata y luego se devuelve en casa.",
  "Quanto tempo demora?": "¿Cuánto tarda?",
  "O prazo depende do tipo de serviço e volume da roupa. A confirmação pode ser feita antes do pedido.": "El plazo depende del tipo de servicio y volumen de ropa. La confirmación puede hacerse antes del pedido.",
  "Como faço o pedido?": "¿Cómo hago el pedido?",
  "Basta criar conta ou entrar no app, escolher o serviço e acompanhar o estado do pedido online.": "Solo crea una cuenta o entra en la app, elige el servicio y sigue el estado online.",
  "Atendem minha zona?": "¿Atienden mi zona?",
  "O atendimento é focado em Luxembourg. A disponibilidade da morada pode ser confirmada no contacto.": "El servicio se centra en Luxembourg. La disponibilidad de la dirección puede confirmarse por contacto.",
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
        className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#dbe8d4] bg-white shadow-sm transition-shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#6abf3c]/40"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="relative h-6 w-6 overflow-hidden rounded-full border border-[#dbe8d4] bg-white shadow-sm" aria-hidden="true">
          <Image
            src={currentLanguage.flagSrc}
            alt=""
            fill
            sizes="24px"
            className="object-cover"
          />
        </span>
      </button>

      {open ? (
        <div className="absolute right-0 top-12 z-50 flex gap-2 rounded-full border border-[#dbe8d4] bg-white p-2 shadow-xl shadow-[#245f2f]/10">
          {languages.map((item) => (
            <button
              key={item.code}
              type="button"
              aria-label={item.name}
              aria-pressed={item.code === language}
              title={item.name}
              className={`relative h-9 w-9 overflow-hidden rounded-full border bg-white shadow-sm transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#6abf3c]/40 ${
                item.code === language ? "border-[#2d6a2d] ring-2 ring-[#6abf3c]/35" : "border-[#dbe8d4]"
              }`}
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                handleLanguageChange(item.code);
              }}
            >
              <Image
                src={item.flagSrc}
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
