export const COMPANY = {
  name: "(주)대진스틸",
  nameEn: "DAEJIN STEEL CO., LTD.",
  slogan: "최고의 제품과 최상의 서비스로 모시겠습니다",
  address: "인천광역시 동구 송현동 2-102 N동 9호",
  addressShort: "인천 동구 송현동 2-102 N동 9호",
  tel1: "032-772-3637",
  tel2: "032-764-3637",
  fax: "032-772-3638",
  email: "wire@daejinsteel.kr",
} as const;

/** Builds a tel: link that phones dial directly, e.g. "032-772-3637" -> "tel:0327723637". */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/[^0-9+]/g, "")}`;
}

export const NAV_ITEMS = [
  { to: "/", label: "HOME" },
  { to: "/about", label: "회사소개" },
  { to: "/products", label: "제품소개" },
  { to: "/inquiry", label: "온라인문의" },
  { to: "/notices", label: "공지사항" },
  { to: "/location", label: "오시는길" },
] as const;
