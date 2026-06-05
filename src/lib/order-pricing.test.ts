import { describe, expect, it } from "vitest";
import { buildOrderCheckoutLineItems, calculateOrderTotal } from "./order-pricing";

describe("order pricing", () => {
  it("calculates the total from selected laundry services", () => {
    expect(calculateOrderTotal({ wash: 3, iron: 2, bag: 1 })).toBe(45);
  });

  it("builds Stripe Checkout line items in cents", () => {
    expect(buildOrderCheckoutLineItems({ wash: 2, shoes: 1 })).toEqual([
      {
        price_data: {
          currency: "eur",
          product_data: { name: "Lavagem" },
          unit_amount: 400,
        },
        quantity: 2,
      },
      {
        price_data: {
          currency: "eur",
          product_data: { name: "Calçado" },
          unit_amount: 500,
        },
        quantity: 1,
      },
    ]);
  });
});
