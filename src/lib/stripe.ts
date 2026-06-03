import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "sk_test_placeholder", {
  apiVersion: "2026-05-27.dahlia",
});

export const PLANS = {
  basic: {
    name: "Basic",
    priceId: process.env.STRIPE_PRICE_BASIC!,
    price: 39,
    kgIncluded: 10,
    pickups: 2,
    bag: false,
  },
  pro: {
    name: "Pro",
    priceId: process.env.STRIPE_PRICE_PRO!,
    price: 69,
    kgIncluded: 20,
    pickups: 4,
    bag: true,
  },
  enterprise: {
    name: "Enterprise",
    priceId: process.env.STRIPE_PRICE_ENTERPRISE!,
    price: 119,
    kgIncluded: 40,
    pickups: 8,
    bag: true,
  },
} as const;
