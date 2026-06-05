import Link from "next/link";

export const metadata = {
  title: "Política de Privacidade",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-12 text-[#102316]">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#dbe8d4] bg-white p-6 shadow-sm md:p-10">
        <Link href="/" className="text-sm font-semibold text-[#2D6A2D]">← Voltar</Link>
        <h1 className="mt-6 text-3xl font-black">Política de Privacidade</h1>
        <p className="mt-3 text-sm text-gray-500">Última atualização: 05/06/2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-gray-700">
          <section>
            <h2 className="text-lg font-bold text-gray-900">Dados recolhidos</h2>
            <p>Podemos recolher nome, email, telefone, morada, dados do pedido, histórico de serviços e informações necessárias para recolha, entrega e suporte.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">Pagamentos</h2>
            <p>Os pagamentos por cartão são processados pela Stripe. A Easy Clean não armazena dados completos do cartão.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">Uso dos dados</h2>
            <p>Usamos os dados para criar conta, gerir pedidos, comunicar estado da encomenda, emitir confirmações e melhorar o serviço.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">Contacto</h2>
            <p>Para pedidos sobre dados pessoais, contacte a Easy Clean através dos canais indicados no rodapé do site.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
