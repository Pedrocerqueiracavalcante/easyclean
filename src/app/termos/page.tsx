import Link from "next/link";

export const metadata = {
  title: "Termos de Serviço",
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#f8faf7] px-4 py-12 text-[#102316]">
      <div className="mx-auto max-w-3xl rounded-2xl border border-[#dbe8d4] bg-white p-6 shadow-sm md:p-10">
        <Link href="/" className="text-sm font-semibold text-[#2D6A2D]">← Voltar</Link>
        <h1 className="mt-6 text-3xl font-black">Termos de Serviço</h1>
        <p className="mt-3 text-sm text-gray-500">Última atualização: 05/06/2026</p>

        <div className="mt-8 space-y-6 text-sm leading-7 text-gray-700">
          <section>
            <h2 className="text-lg font-bold text-gray-900">Serviço</h2>
            <p>A Easy Clean oferece recolha, tratamento e entrega de roupa conforme disponibilidade operacional e área atendida.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">Pedidos</h2>
            <p>O cliente deve informar morada, horário, serviços pretendidos e instruções especiais antes da confirmação do pedido.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">Pagamentos</h2>
            <p>Os valores são apresentados em euros. O pagamento pode ser solicitado antes da execução do serviço, conforme o tipo de pedido.</p>
          </section>
          <section>
            <h2 className="text-lg font-bold text-gray-900">Peças especiais</h2>
            <p>Peças delicadas, manchas, couro, camurça ou tecidos especiais podem exigir avaliação antes do tratamento.</p>
          </section>
        </div>
      </div>
    </main>
  );
}
