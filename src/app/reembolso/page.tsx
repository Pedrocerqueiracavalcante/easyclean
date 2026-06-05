import Link from "next/link";

export const metadata = {
  title: "Política de Reembolso",
};

export default function RefundPage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-12 text-[#102316]">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#dbe8d4] bg-white p-6 shadow-sm md:p-10">
        <Link href="/" className="text-sm font-semibold text-[#2D6A2D]">← Voltar</Link>
        <h1 className="mt-6 text-3xl font-black">Política de Reembolso</h1>
        <p className="mt-3 text-sm text-gray-500">Última atualização: 05/06/2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-gray-700">
          <section>
            <h2 className="text-lg font-bold text-gray-900">Cancelamento</h2>
            <p>Pedidos podem ser cancelados antes da recolha. Depois da recolha, o reembolso depende do estado do serviço e dos custos já incorridos.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">Problemas com o serviço</h2>
            <p>Se houver problema com uma peça ou entrega, o cliente deve contactar a Easy Clean com o número do pedido e fotos quando aplicável.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">Análise</h2>
            <p>Cada pedido de reembolso é analisado individualmente conforme o serviço contratado, estado das peças e evidências apresentadas.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
