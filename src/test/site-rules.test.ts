import { describe, expect, it } from "vitest";
import { telHref, COMPANY } from "@/lib/company";
import { inquirySchema } from "@/lib/inquiry-schema";

const valid = {
  name: "홍길동",
  phone: "010-1234-5678",
  message: "와이어로프 견적 부탁드립니다.",
  privacyAgreed: true as const,
};

describe("phone links dial directly", () => {
  it("turns the main number into a dialable tel: link", () => {
    expect(telHref(COMPANY.tel1)).toBe("tel:0327723637");
    expect(telHref(COMPANY.tel2)).toBe("tel:0327643637");
  });
});

describe("quote inquiry form rules", () => {
  it("accepts a minimal valid inquiry", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });
  it("requires a phone number", () => {
    expect(inquirySchema.safeParse({ ...valid, phone: "" }).success).toBe(false);
  });
  it("requires privacy consent", () => {
    expect(inquirySchema.safeParse({ ...valid, privacyAgreed: false }).success).toBe(false);
  });
  it("rejects submissions that fill the hidden spam field", () => {
    expect(inquirySchema.safeParse({ ...valid, website: "http://spam" }).success).toBe(false);
  });
});
