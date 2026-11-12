import { createServerFn } from "@tanstack/react-start";
import { inquirySchema } from "./inquiry-schema";

export const submitInquiry = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("quote_inquiries").insert({
      company: data.company || null,
      name: data.name,
      phone: data.phone,
      email: data.email || null,
      product_category: data.productCategory || null,
      quantity: data.quantity || null,
      message: data.message,
    });
    if (error) {
      console.error("quote inquiry insert failed", error.message);
      throw new Error("문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    }
    return { ok: true as const };
  });
