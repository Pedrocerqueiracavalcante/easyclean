export const orderServices = [
  { id: "wash", name: "Lavagem", price: 4 },
  { id: "iron", name: "Passagem a ferro", price: 2 },
  { id: "dry", name: "Limpeza a seco", price: 8 },
  { id: "bed", name: "Roupas de cama", price: 6 },
  { id: "shoes", name: "Calçado", price: 5 },
  { id: "bag", name: "Saco completo", price: 29 },
] as const;

export type OrderServiceId = (typeof orderServices)[number]["id"];
export type OrderQuantities = Partial<Record<OrderServiceId | string, number>>;

export function calculateOrderTotal(items: OrderQuantities) {
  return Object.entries(items).reduce((acc, [id, qty]) => {
    const service = orderServices.find((item) => item.id === id);
    const quantity = Number(qty);

    if (!service || !Number.isFinite(quantity) || quantity <= 0) {
      return acc;
    }

    return acc + service.price * quantity;
  }, 0);
}

export function getOrderDiscount(coupon?: string, subtotal = 0) {
  const code = coupon?.trim().toUpperCase();

  if (code === "PRIMEIRA10" && subtotal > 0) {
    return {
      code,
      percent: 10,
      amount: Math.round(subtotal * 0.1 * 100) / 100,
    };
  }

  return {
    code: code || "",
    percent: 0,
    amount: 0,
  };
}

export function calculateOrderTotalWithCoupon(items: OrderQuantities, coupon?: string) {
  const subtotal = calculateOrderTotal(items);
  const discount = getOrderDiscount(coupon, subtotal);
  const total = Math.max(0, Math.round((subtotal - discount.amount) * 100) / 100);

  return { subtotal, discount, total };
}

export function buildOrderCheckoutLineItems(items: OrderQuantities, discountPercent = 0) {
  const multiplier = Math.max(0, 1 - discountPercent / 100);

  return Object.entries(items)
    .map(([id, qty]) => {
      const service = orderServices.find((item) => item.id === id);
      const quantity = Number(qty);

      if (!service || !Number.isFinite(quantity) || quantity <= 0) {
        return null;
      }

      return {
        price_data: {
          currency: "eur",
          product_data: { name: service.name },
          unit_amount: Math.round(service.price * multiplier * 100),
        },
        quantity,
      };
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);
}
