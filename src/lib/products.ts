import wireRope from "@/assets/p-wire-rope.jpg";
import ropeProcessing from "@/assets/p-rope-processing.jpg";
import chain from "@/assets/p-chain.jpg";
import hoist from "@/assets/p-hoist.jpg";
import fiberRope from "@/assets/p-fiber-rope.jpg";
import beltSling from "@/assets/p-belt-sling.jpg";
import coatedWire from "@/assets/p-coated-wire.jpg";

export type Product = {
  slug: string;
  name: string;
  nameEn: string;
  image: string;
  summary: string;
  description: string[];
  items: string[];
  features: string[];
  applications: string[];
  specs?: { label: string; value: string }[];
};

export const PRODUCTS: Product[] = [
  {
    slug: "wire-rope",
    name: "와이어로프",
    nameEn: "Wire Rope",
    image: wireRope,
    summary: "일반 와이어로프부터 스테인레스로프까지, 용도별 규격을 갖추고 있습니다.",
    description: [
      "와이어로프는 여러 가닥의 강선(소선)을 꼬아 스트랜드를 만들고, 이를 다시 심강 주위로 꼬아 만든 고강도 로프입니다.",
      "대진스틸은 아연도금 와이어로프, 비도금(흑) 와이어로프, 스테인레스 와이어로프 등 현장 용도에 맞는 다양한 구성과 직경의 제품을 공급합니다.",
    ],
    items: ["아연도금 와이어로프", "비도금 와이어로프", "스테인레스 와이어로프", "크레인용 와이어로프", "선박·항만용 와이어로프"],
    features: ["높은 인장강도와 내구성", "용도별 다양한 구성(꼬임) 선택", "절단 길이 맞춤 공급", "스테인레스 제품으로 내식성 확보"],
    applications: ["크레인·호이스트", "건설·토목 현장", "선박·항만 계류", "엘리베이터·기계설비"],
    specs: [
      { label: "구성", value: "6×7, 6×19, 6×24, 6×37, IWRC 등" },
      { label: "재질", value: "아연도금 / 비도금 / 스테인레스(SUS304·316)" },
      { label: "공급 형태", value: "릴(Reel) 단위 또는 절단 판매" },
    ],
  },
  {
    slug: "rope-processing",
    name: "로프가공",
    nameEn: "Rope Assembly",
    image: ropeProcessing,
    summary: "압착·아이 스플라이스 등 현장 맞춤형 슬링 가공을 직접 제작합니다.",
    description: [
      "와이어로프에 슬리브 압착, 아이(Eye) 가공, 딤블 삽입, 소켓 가공 등을 더해 바로 사용할 수 있는 와이어 슬링으로 제작합니다.",
      "필요한 길이, 하중, 단말 형태를 알려주시면 현장 조건에 맞게 맞춤 제작해 드립니다.",
    ],
    items: ["와이어로프 슬링(압착)", "아이 스플라이스 가공", "딤블·소켓 단말 가공", "섬유로프 가공", "맞춤 길이 절단"],
    features: ["주문 사양에 맞춘 맞춤 제작", "신속한 납기 대응", "용도에 맞는 단말 형태 상담", "소량 주문 가능"],
    applications: ["중량물 인양", "조선·플랜트", "건설 현장 줄걸이", "설비 고정·지지"],
  },
  {
    slug: "chain-fittings",
    name: "체인/부속",
    nameEn: "Chain & Fittings",
    image: chain,
    summary: "체인, 샤클, 턴버클, 훅, 클립 등 각종 악세사리 부속을 취급합니다.",
    description: [
      "와이어로프 및 체인 작업에 필요한 각종 연결 부속을 한 곳에서 구매하실 수 있습니다.",
      "아연도금, 스테인레스 등 재질과 사이즈별로 다양한 제품을 보유하고 있습니다.",
    ],
    items: ["링크 체인", "샤클(Shackle)", "턴버클(Turnbuckle)", "훅(Hook)", "와이어 클립", "딤블(Thimble)"],
    features: ["사이즈·재질별 다양한 재고", "와이어로프와 함께 일괄 구매", "스테인레스 부속 취급", "용도에 맞는 제품 추천"],
    applications: ["인양·고정 작업", "선박·항만", "건축·인테리어 와이어 설치", "울타리·지지선"],
  },
  {
    slug: "material-handling",
    name: "운반하역기",
    nameEn: "Material Handling",
    image: hoist,
    summary: "체인블록, 레버블록 등 운반·하역 장비와 하역도구를 공급합니다.",
    description: [
      "중량물을 들어 올리거나 당기고 이동하는 데 필요한 운반하역 장비를 공급합니다.",
      "작업 하중과 환경에 맞는 장비 선택을 도와드립니다.",
    ],
    items: ["체인블록", "레버블록", "클램프", "작키·리프팅 장비", "각종 하역도구"],
    features: ["작업 하중별 다양한 용량", "현장에 맞는 장비 상담", "슬링·부속과 함께 구성 가능"],
    applications: ["공장·창고 하역", "설비 설치·정비", "건설 현장", "물류 작업"],
  },
  {
    slug: "fiber-rope",
    name: "마닐라/섬유로프",
    nameEn: "Manila & Fiber Rope",
    image: fiberRope,
    summary: "마닐라로프, PP·나일론 등 섬유로프와 안전망을 취급합니다.",
    description: [
      "천연 섬유인 마닐라로프부터 PP, PE, 나일론 등 합성 섬유로프까지 다양한 굵기와 재질의 로프를 공급합니다.",
      "가볍고 다루기 쉬워 선박, 어업, 조경, 인테리어 등 폭넓게 사용됩니다. 각종 안전망도 함께 취급합니다.",
    ],
    items: ["마닐라로프", "PP로프", "PE로프", "나일론로프", "안전망"],
    features: ["가볍고 취급이 쉬움", "재질별 다양한 굵기", "롤 단위 또는 절단 판매", "안전망 동시 구매 가능"],
    applications: ["선박 계류·어업", "조경·인테리어", "건설 현장 안전망", "일반 결속"],
  },
  {
    slug: "belt-sling",
    name: "벨트슬링",
    nameEn: "Belt Sling",
    image: beltSling,
    summary: "폴리에스터 벨트슬링, 라운드슬링 등 인양용 슬링을 공급합니다.",
    description: [
      "벨트슬링은 고강도 폴리에스터 원사로 짠 인양용 슬링으로, 가볍고 유연하여 화물 표면 손상을 줄여줍니다.",
      "사용 하중과 길이에 맞춰 다양한 규격을 공급하며, 맞춤 길이 제작도 상담 가능합니다.",
    ],
    items: ["벨트슬링(아이형)", "엔드리스 슬링", "라운드슬링", "라쳇 바인더(화물 고정)"],
    features: ["가볍고 유연함", "화물 표면 손상 최소화", "하중별 색상 구분", "맞춤 길이 제작 상담"],
    applications: ["중량물 인양", "기계·설비 운반", "화물 고정", "조선·플랜트"],
  },
  {
    slug: "coated-wire",
    name: "코팅와이어",
    nameEn: "Coated Wire",
    image: coatedWire,
    summary: "PVC 코팅 와이어로프로 내식성과 안전성을 높였습니다.",
    description: [
      "와이어로프 표면에 PVC 등 피복을 입혀 부식을 방지하고, 손에 닿아도 안전하도록 만든 제품입니다.",
      "투명 및 컬러 코팅 제품이 있어 인테리어, 운동기구, 울타리 등 외관이 중요한 곳에도 적합합니다.",
    ],
    items: ["투명 PVC 코팅와이어", "컬러 코팅와이어", "스테인레스 코팅와이어"],
    features: ["우수한 내식성", "손 다침 위험 감소", "투명·컬러 선택 가능", "깔끔한 외관"],
    applications: ["인테리어·조명 와이어", "헬스·운동기구", "울타리·펜스", "간판·전시 설치"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export const HANDLED_ITEMS = [
  "와이어로프",
  "스테인레스로프",
  "섬유로프",
  "벨트슬링",
  "악세사리부속",
  "샤클",
  "턴버클",
  "체인",
  "안전망",
  "하역도구",
];
