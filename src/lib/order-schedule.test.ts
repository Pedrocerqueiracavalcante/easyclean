import { describe, expect, it } from "vitest";
import { isPickupSlotAvailable, validatePickupSchedule } from "./order-schedule";

describe("order schedule", () => {
  const now = new Date("2026-06-06T13:20:00");

  it("blocks slots that start less than one hour from now for today", () => {
    expect(isPickupSlotAvailable("14:00 - 16:00", 0, now)).toBe(false);
    expect(isPickupSlotAvailable("16:00 - 18:00", 0, now)).toBe(true);
  });

  it("allows all known slots for future days", () => {
    expect(isPickupSlotAvailable("08:00 - 10:00", 1, now)).toBe(true);
  });

  it("rejects unknown slots and invalid days", () => {
    expect(validatePickupSchedule(0, "07:00 - 08:00", now).valid).toBe(false);
    expect(validatePickupSchedule(6, "16:00 - 18:00", now).valid).toBe(false);
  });
});
