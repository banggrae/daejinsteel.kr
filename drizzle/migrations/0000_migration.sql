CREATE TABLE public.notices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  content text NOT NULL,
  is_pinned boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.notices TO anon, authenticated;
GRANT ALL ON public.notices TO service_role;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read notices" ON public.notices FOR SELECT TO anon, authenticated USING (true);

CREATE TABLE public.quote_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company text,
  name text NOT NULL,
  phone text NOT NULL,
  email text,
  product_category text,
  quantity text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.quote_inquiries TO service_role;
ALTER TABLE public.quote_inquiries ENABLE ROW LEVEL SECURITY;

INSERT INTO public.notices (title, content, is_pinned, created_at) VALUES
('(주)대진스틸 홈페이지가 새롭게 리뉴얼되었습니다', E'안녕하세요, (주)대진스틸입니다.\n\n고객 여러분께 더 편리한 정보를 제공하기 위해 홈페이지를 새롭게 단장하였습니다.\nPC, 태블릿, 모바일 어디서나 제품 정보를 확인하시고 온라인으로 견적을 문의하실 수 있습니다.\n\n앞으로도 최고의 제품과 최상의 서비스로 보답하겠습니다. 감사합니다.', true, now() - interval '1 day'),
('온라인 견적문의 이용 안내', E'홈페이지 상단 [온라인문의] 메뉴에서 필요하신 제품, 규격, 수량을 남겨주시면 담당자가 확인 후 연락드립니다.\n\n급하신 문의는 대표전화 032-772-3637 / 032-764-3637 로 연락 주시기 바랍니다.', false, now() - interval '5 days'),
('와이어로프 · 벨트슬링 규격 및 재고 문의 안내', E'와이어로프, 스테인레스로프, 섬유로프, 벨트슬링, 체인 및 각종 부속의 규격과 재고는 전화 또는 온라인문의로 확인하실 수 있습니다.\n\n주문 제작(로프가공, 아이 스플라이스, 압착 가공 등)도 상담 가능합니다.', false, now() - interval '12 days');