import { describe, expect, it } from "vitest";
import { isValidEmail } from "./email-validation";

describe("isValidEmail", () => {
  it("accepts normal email addresses", () => {
    expect(isValidEmail("cliente@email.com")).toBe(true);
    expect(isValidEmail(" nome.sobrenome+tag@example.co ")).toBe(true);
  });

  it("rejects incomplete email addresses", () => {
    expect(isValidEmail("cliente")).toBe(false);
    expect(isValidEmail("cliente@")).toBe(false);
    expect(isValidEmail("cliente@email")).toBe(false);
    expect(isValidEmail("cliente email@email.com")).toBe(false);
  });
});
