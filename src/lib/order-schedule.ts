export const orderTimeSlots = [
  "08:00 - 10:00",
  "10:00 - 12:00",
  "12:00 - 14:00",
  "14:00 - 16:00",
  "16:00 - 18:00",
  "18:00 - 20:00",
];

export const minimumPickupLeadMinutes = 60;

export function getSlotStartMinutes(slot: string) {
  const [start] = slot.split(" - ");
  const [hour, minute] = start.split(":").map(Number);
  return hour * 60 + minute;
}

export function getMinutesFromMidnight(date: Date) {
  return date.getHours() * 60 + date.getMinutes();
}

export function isPickupSlotAvailable(slot: string, pickupDay: number, now = new Date()) {
  if (!orderTimeSlots.includes(slot)) return false;
  if (!Number.isInteger(pickupDay) || pickupDay < 0 || pickupDay > 4) return false;
  if (pickupDay > 0) return true;

  return getSlotStartMinutes(slot) >= getMinutesFromMidnight(now) + minimumPickupLeadMinutes;
}

export function validatePickupSchedule(pickupDay: number, pickupSlot: string, now = new Date()) {
  if (!Number.isInteger(pickupDay) || pickupDay < 0 || pickupDay > 4) {
    return { valid: false, message: "Escolhe um dia de recolha valido." };
  }

  if (!pickupSlot || !orderTimeSlots.includes(pickupSlot)) {
    return { valid: false, message: "Escolhe um horario de recolha valido." };
  }

  if (!isPickupSlotAvailable(pickupSlot, pickupDay, now)) {
    return {
      valid: false,
      message: "Esse horario ja nao esta disponivel. Escolhe um horario com pelo menos 1 hora de antecedencia.",
    };
  }

  return { valid: true, message: "" };
}
