import { z } from "zod";

export const PRODUCT_OPTIONS = [
  "와이어로프",
  "스테인레스로프",
  "로프가공",
  "체인/부속",
  "운반하역기",
  "마닐라/섬유로프",
  "벨트슬링",
  "코팅와이어",
  "기타",
] as const;

const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { message: `${max}자 이내로 입력해 주세요.` })
    .optional()
    .or(z.literal(""));

export const inquirySchema = z.object({
  company: optionalText(100),
  name: z
    .string()
    .trim()
    .min(1, { message: "담당자 성함을 입력해 주세요." })
    .max(50, { message: "50자 이내로 입력해 주세요." }),
  phone: z
    .string()
    .trim()
    .min(1, { message: "연락처를 입력해 주세요." })
    .regex(/^[0-9+\-\s()]{8,20}$/, { message: "올바른 연락처를 입력해 주세요." }),
  email: z
    .string()
    .trim()
    .max(255)
    .email({ message: "올바른 이메일 주소를 입력해 주세요." })
    .optional()
    .or(z.literal("")),
  productCategory: z.enum(PRODUCT_OPTIONS).optional().or(z.literal("")),
  quantity: optionalText(200),
  message: z
    .string()
    .trim()
    .min(5, { message: "문의 내용을 5자 이상 입력해 주세요." })
    .max(2000, { message: "2000자 이내로 입력해 주세요." }),
  privacyAgreed: z.literal(true, {
    errorMap: () => ({ message: "개인정보 수집·이용에 동의해 주세요." }),
  }),
  /** Honeypot: real visitors never see or fill this field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
