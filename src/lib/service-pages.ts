export const servicePages = [
  {
    slug: "lavagem",
    title: "Lavagem",
    menuTitle: "Lavagem",
    subtitle: "Lavagem profissional para roupa do dia a dia.",
    description:
      "Tratamos as peças com separação por tecido, ciclo adequado e produtos escolhidos para limpar sem desgastar a roupa.",
    bestFor: "Ideal para roupa do dia a dia, camisetas, calças, roupa de trabalho e peças familiares.",
    highlights: ["Separação por tipo de roupa", "Ciclo adequado ao tecido", "Entrega dobrada e organizada"],
    process: ["Separação por cor e tecido", "Produto adequado para cada grupo", "Secagem e revisão final"],
    fabricGuide: [
      { fabric: "Algodão", care: "Suporta lavagem regular, mas deve ser separado por cor.", product: "Detergente líquido neutro" },
      { fabric: "Linho", care: "Precisa de lavagem suave para evitar encolhimento.", product: "Detergente delicado" },
      { fabric: "Sintéticos", care: "Secagem moderada para preservar elasticidade.", product: "Detergente para cores" },
      { fabric: "Roupa escura", care: "Exige baixa fricção para manter a cor.", product: "Produto para roupa preta/escura" },
    ],
    products: ["Detergente líquido", "Amaciador suave", "Tira-manchas controlado", "Produto para cores"],
    avoid: ["Misturar roupa branca com escura", "Usar lixívia em tecido delicado", "Secar peças sensíveis em alta temperatura"],
    price: "A partir de €4/kg",
  },
  {
    slug: "passagem-a-ferro",
    title: "Passagem a Ferro",
    menuTitle: "Passagem a Ferro",
    subtitle: "Roupa sem vincos, pronta para usar.",
    description:
      "Ideal para camisas, calças, vestidos, fardas e peças que precisam de acabamento alinhado.",
    bestFor: "Ideal para camisas, fardas, roupa social, calças, vestidos e peças que precisam de boa apresentação.",
    highlights: ["Acabamento alinhado", "Ideal para roupa social", "Peças separadas por cliente"],
    process: ["Análise da etiqueta", "Temperatura ajustada ao tecido", "Acabamento com vapor controlado"],
    fabricGuide: [
      { fabric: "Camisa de algodão", care: "Aceita temperatura média/alta com vapor.", product: "Vapor controlado" },
      { fabric: "Linho", care: "Precisa de vapor e pressão leve para não marcar.", product: "Spray de engomar leve" },
      { fabric: "Poliéster", care: "Temperatura baixa para não queimar fibra.", product: "Proteção com pano fino" },
      { fabric: "Seda/viscose", care: "Exige temperatura baixa e teste prévio.", product: "Passagem delicada sem excesso de vapor" },
    ],
    products: ["Vapor profissional", "Spray de engomar", "Proteção para tecido delicado"],
    avoid: ["Temperatura alta em poliéster", "Pressão forte em tecidos finos", "Vapor excessivo em peças sensíveis"],
    price: "A partir de €2/peça",
  },
  {
    slug: "limpeza-a-seco",
    title: "Limpeza a Seco",
    menuTitle: "Limpeza a Seco",
    subtitle: "Cuidado especial para peças delicadas.",
    description:
      "Opção indicada para fatos, casacos, vestidos, tecidos sensíveis e peças que não devem passar por lavagem comum.",
    bestFor: "Ideal para fatos, blazers, casacos, vestidos, lã e peças com estrutura ou tecido sensível.",
    highlights: ["Peças delicadas", "Fatos e casacos", "Mais conservação do tecido"],
    process: ["Verificação da etiqueta", "Tratamento sem excesso de água", "Acabamento e arejamento da peça"],
    fabricGuide: [
      { fabric: "Lã", care: "Evita encolhimento e deformação.", product: "Solução de limpeza a seco" },
      { fabric: "Fatos/blazers", care: "Mantém estrutura, ombros e acabamento.", product: "Tratamento a seco profissional" },
      { fabric: "Vestidos delicados", care: "Protege bordados, forros e detalhes.", product: "Produto para tecido sensível" },
      { fabric: "Casacos", care: "Remove odores sem saturar a fibra.", product: "Higienização a seco" },
    ],
    products: ["Solução a seco", "Neutralizador de odores", "Escovagem técnica"],
    avoid: ["Lavar fatos em ciclo comum", "Molhar lã em excesso", "Esfregar bordados ou detalhes delicados"],
    price: "A partir de €8/peça",
  },
  {
    slug: "roupas-de-cama",
    title: "Roupas de Cama",
    menuTitle: "Roupas de Cama",
    subtitle: "Lençóis, edredons e toalhas com sensação de limpeza.",
    description:
      "Lavagem de peças volumosas com foco em conforto, frescor e praticidade para famílias e alojamentos.",
    bestFor: "Ideal para lençóis, fronhas, toalhas, edredons, cobertores e peças volumosas.",
    highlights: ["Lençóis e fronhas", "Edredons e cobertores", "Toalhas e peças volumosas"],
    process: ["Separação por volume", "Lavagem higienizante suave", "Secagem controlada até a peça ficar pronta"],
    fabricGuide: [
      { fabric: "Lençóis de algodão", care: "Lavagem completa com boa remoção de suor e odor.", product: "Detergente higienizante suave" },
      { fabric: "Toalhas", care: "Precisa preservar absorção e maciez.", product: "Amaciador moderado" },
      { fabric: "Edredons", care: "Lavagem de volume com secagem prolongada.", product: "Detergente para peças volumosas" },
      { fabric: "Cobertores", care: "Ciclo suave para não deformar fibras.", product: "Produto delicado para fibras" },
    ],
    products: ["Detergente higienizante", "Amaciador suave", "Secagem controlada"],
    avoid: ["Guardar peça ainda úmida", "Excesso de amaciador em toalhas", "Secagem apressada em edredons"],
    price: "A partir de €6/peça",
  },
  {
    slug: "calcado",
    title: "Calçado",
    menuTitle: "Calçado",
    subtitle: "Limpeza e tratamento para pares do dia a dia.",
    description:
      "Serviço para renovar sapatilhas, sapatos e outros calçados laváveis, com cuidado no acabamento e secagem.",
    bestFor: "Ideal para sapatilhas, calçado de tecido, solas, couro sintético e pares laváveis do dia a dia.",
    highlights: ["Sapatilhas", "Sapatos laváveis", "Tratamento por par"],
    process: ["Remoção de sujidade solta", "Limpeza por material", "Secagem sem deformar o par"],
    fabricGuide: [
      { fabric: "Sapatilhas de tecido", care: "Limpeza suave para remover sujidade sem deformar.", product: "Espuma limpadora" },
      { fabric: "Couro sintético", care: "Não deve saturar com água.", product: "Produto de limpeza sem álcool" },
      { fabric: "Camurça", care: "Exige escova e pouco líquido.", product: "Escova própria e renovador" },
      { fabric: "Solas", care: "Pode receber limpeza mais intensa.", product: "Desengordurante suave" },
    ],
    products: ["Espuma limpadora", "Escova técnica", "Desodorizante", "Proteção de acabamento"],
    avoid: ["Encharcar camurça", "Usar álcool em couro sintético", "Secar calçado diretamente em calor forte"],
    price: "A partir de €5/par",
  },
  {
    slug: "saco-completo",
    title: "Saco Completo",
    menuTitle: "Saco Completo",
    subtitle: "Preço fixo para uma recolha prática.",
    description:
      "Ideal para clientes que querem resolver a lavagem semanal sem pesar peça por peça, com recolha e entrega organizadas.",
    bestFor: "Ideal para famílias, rotina semanal, roupa mista e clientes que querem uma solução simples.",
    highlights: ["Preço simples", "Bom para famílias", "Recolha semanal"],
    process: ["Triagem do saco", "Separação por cor e tecido", "Lavagem, secagem e dobra organizada"],
    fabricGuide: [
      { fabric: "Roupa mista", care: "Separação por cor e tipo antes da lavagem.", product: "Detergentes por categoria" },
      { fabric: "Peças delicadas", care: "Devem ser identificadas para tratamento separado.", product: "Detergente delicado" },
      { fabric: "Roupa branca", care: "Precisa preservar luminosidade sem amarelar.", product: "Produto para brancos" },
      { fabric: "Roupa colorida", care: "Foco em proteger tons e evitar transferência.", product: "Produto para cores" },
    ],
    products: ["Detergente para cores", "Produto para brancos", "Amaciador suave", "Tira-manchas controlado"],
    avoid: ["Colocar peças delicadas sem avisar", "Misturar calçado com roupa", "Enviar objetos nos bolsos"],
    price: "A partir de €29/saco",
  },
] as const;

export type ServiceSlug = (typeof servicePages)[number]["slug"];

export function getServiceBySlug(slug: string) {
  return servicePages.find((service) => service.slug === slug);
}
