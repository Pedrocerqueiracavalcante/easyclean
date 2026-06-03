"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

type ContactFormProps = {
  email: string;
  whatsappNumber: string;
  whatsappMessage: string;
};

export function ContactForm({ email, whatsappNumber, whatsappMessage }: ContactFormProps) {
  const [status, setStatus] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "").trim();
    const senderEmail = String(form.get("email") || "").trim();
    const phone = String(form.get("phone") || "").trim();
    const message = String(form.get("message") || "").trim();

    const text = [
      whatsappMessage,
      "",
      `Nome: ${name || "Não informado"}`,
      `E-mail: ${senderEmail || "Não informado"}`,
      `Telefone: ${phone || "Não informado"}`,
      `Mensagem: ${message || "Não informada"}`,
    ].join("\n");

    if (whatsappNumber) {
      window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener,noreferrer");
      setStatus("Mensagem preparada no WhatsApp.");
      return;
    }

    if (email && !email.toLowerCase().startsWith("adicionar")) {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent("Contacto pelo site Easy Clean")}&body=${encodeURIComponent(text)}`;
      setStatus("Mensagem preparada no e-mail.");
      return;
    }

    setStatus("Adicione o número de WhatsApp ou e-mail da empresa para ativar o envio.");
  }

  return (
    <form className="grid gap-4" action="#contacto" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="contact-name" className="mb-2 block text-sm font-semibold text-white/70">Nome</label>
        <input
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          className="h-11 w-full rounded-md border border-white/10 bg-[#050806]/70 px-3 text-sm text-white outline-none transition-colors focus:border-[#b9f25a]"
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="contact-email" className="mb-2 block text-sm font-semibold text-white/70">E-mail</label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            className="h-11 w-full rounded-md border border-white/10 bg-[#050806]/70 px-3 text-sm text-white outline-none transition-colors focus:border-[#b9f25a]"
          />
        </div>
        <div>
          <label htmlFor="contact-phone" className="mb-2 block text-sm font-semibold text-white/70">Telefone</label>
          <input
            id="contact-phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            className="h-11 w-full rounded-md border border-white/10 bg-[#050806]/70 px-3 text-sm text-white outline-none transition-colors focus:border-[#b9f25a]"
          />
        </div>
      </div>
      <div>
        <label htmlFor="contact-message" className="mb-2 block text-sm font-semibold text-white/70">Mensagem</label>
        <textarea
          id="contact-message"
          name="message"
          rows={5}
          className="w-full resize-y rounded-md border border-white/10 bg-[#050806]/70 px-3 py-3 text-sm text-white outline-none transition-colors focus:border-[#b9f25a]"
        />
      </div>
      <div className="flex flex-col items-center gap-3 pt-2">
        <Button type="submit" className="min-w-36 bg-[#b9f25a] text-[#071108] hover:bg-[#a8e64d]">
          Enviar
        </Button>
        {status && <p className="text-center text-xs text-white/56">{status}</p>}
      </div>
    </form>
  );
}
