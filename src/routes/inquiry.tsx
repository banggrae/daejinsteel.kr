import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState, type FormEvent } from "react";
import { CheckCircle2, Clock, Mail, Phone, Printer } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/site/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { inquirySchema, PRODUCT_OPTIONS } from "@/lib/inquiry-schema";
import { submitInquiry } from "@/lib/inquiry.functions";
import { COMPANY, telHref } from "@/lib/company";

type Search = { product?: string };

export const Route = createFileRoute("/inquiry")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const p = typeof search["product"] === "string" ? search["product"] : undefined;
    return p ? { product: p } : {};
  },
  head: () => ({
    meta: [
      { title: "온라인 견적문의 | (주)대진스틸" },
      { name: "description", content: "와이어로프, 벨트슬링, 체인 및 부속 견적을 온라인으로 문의하세요. 담당자가 확인 후 연락드립니다." },
      { property: "og:title", content: "온라인 견적문의 | (주)대진스틸" },
      { property: "og:description", content: "필요한 제품과 규격, 수량을 남겨주시면 담당자가 연락드립니다." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InquiryPage,
});

type FormState = {
  company: string;
  name: string;
  phone: string;
  email: string;
  productCategory: string;
  quantity: string;
  message: string;
  privacyAgreed: boolean;
  website: string;
};

function matchCategory(product?: string): string {
  if (!product) return "";
  return (PRODUCT_OPTIONS as readonly string[]).includes(product) ? product : "";
}

function InquiryPage() {
  const { product } = Route.useSearch();
  const send = useServerFn(submitInquiry);
  const empty: FormState = {
    company: "",
    name: "",
    phone: "",
    email: "",
    productCategory: matchCategory(product),
    quantity: "",
    message: "",
    privacyAgreed: false,
    website: "",
  };
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const parsed = inquirySchema.safeParse(form);
    if (!parsed.success) {
      const next: Partial<Record<keyof FormState, string>> = {};
      for (const issue of parsed.error.issues) {
        const k = issue.path[0] as keyof FormState;
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      toast.error("입력 내용을 확인해 주세요.");
      return;
    }
    setSubmitting(true);
    try {
      await send({ data: parsed.data });
      setDone(true);
      setForm(empty);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("문의 접수 중 오류가 발생했습니다. 잠시 후 다시 시도하시거나 전화로 문의해 주세요.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <PageHeader eyebrow="Online Inquiry" title="온라인 견적문의" description="필요하신 제품, 규격, 수량을 남겨주시면 담당자가 확인 후 연락드립니다." />

      <section className="py-12 md:py-16">
        <div className="container-site grid gap-8 lg:grid-cols-[1fr_340px] lg:gap-12">
          <div className="rounded-lg border border-border bg-card p-5 shadow-card md:p-8">
            {done ? (
              <div className="py-10 text-center" role="status">
                <CheckCircle2 className="mx-auto h-14 w-14 text-signal" />
                <h2 className="mt-5 text-2xl font-extrabold text-navy">문의가 접수되었습니다</h2>
                <p className="mt-3 text-muted-foreground">
                  담당자가 확인 후 연락드리겠습니다. 급하신 경우 전화로 문의해 주세요.
                </p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button onClick={() => setDone(false)} variant="outline">추가 문의하기</Button>
                  <Button asChild><Link to="/">홈으로</Link></Button>
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} noValidate className="grid gap-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <Field label="회사명" id="company" error={errors.company}>
                    <Input id="company" value={form.company} onChange={(e) => set("company", e.target.value)} maxLength={100} autoComplete="organization" placeholder="(주)회사명" />
                  </Field>
                  <Field label="담당자 성함" id="name" required error={errors.name}>
                    <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} maxLength={50} autoComplete="name" placeholder="홍길동" />
                  </Field>
                  <Field label="연락처" id="phone" required error={errors.phone}>
                    <Input id="phone" type="tel" inputMode="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} maxLength={20} autoComplete="tel" placeholder="010-0000-0000" />
                  </Field>
                  <Field label="이메일" id="email" error={errors.email}>
                    <Input id="email" type="email" value={form.email} onChange={(e) => set("email", e.target.value)} maxLength={255} autoComplete="email" placeholder="name@company.com" />
                  </Field>
                  <Field label="문의 제품" id="productCategory" error={errors.productCategory}>
                    <select
                      id="productCategory"
                      value={form.productCategory}
                      onChange={(e) => set("productCategory", e.target.value)}
                      className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      <option value="">선택해 주세요</option>
                      {PRODUCT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                    </select>
                  </Field>
                  <Field label="규격 / 수량" id="quantity" error={errors.quantity}>
                    <Input id="quantity" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} maxLength={200} placeholder="예: Ø12mm 6×24, 200m" />
                  </Field>
                </div>
                <Field label="문의 내용" id="message" required error={errors.message}>
                  <Textarea
                    id="message"
                    value={form.message}
                    onChange={(e) => set("message", e.target.value)}
                    maxLength={2000}
                    rows={7}
                    placeholder={product && !matchCategory(product) ? `${product} 관련 문의드립니다.` : "사용 용도, 필요 수량, 납기 등을 자세히 적어주시면 정확한 견적에 도움이 됩니다."}
                  />
                </Field>

                {/* Honeypot field: hidden from people, catches automated spam. */}
                <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => set("website", e.target.value)} />
                </div>

                <div className="rounded-md bg-muted p-4 text-xs leading-relaxed text-muted-foreground">
                  <p className="font-semibold text-foreground">개인정보 수집·이용 안내</p>
                  <p className="mt-1">수집 항목: 회사명, 성함, 연락처, 이메일 · 수집 목적: 견적 및 문의 응대 · 문의 응대 목적 달성 후 지체 없이 파기합니다.</p>
                  <label className="mt-3 flex items-center gap-2 text-sm text-foreground">
                    <Checkbox checked={form.privacyAgreed} onCheckedChange={(v) => set("privacyAgreed", v === true)} aria-invalid={!!errors.privacyAgreed} />
                    개인정보 수집·이용에 동의합니다. <span className="text-destructive">*</span>
                  </label>
                  {errors.privacyAgreed && <p className="mt-1 text-xs text-destructive">{errors.privacyAgreed}</p>}
                </div>

                <Button type="submit" size="xl" disabled={submitting} className="w-full md:w-auto md:justify-self-start">
                  {submitting ? "접수 중..." : "견적 문의하기"}
                </Button>
              </form>
            )}
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg bg-navy-gradient p-6 text-navy-foreground">
              <p className="eyebrow text-steel-light">Call Us</p>
              <p className="mt-2 text-lg font-bold">전화로 바로 상담하기</p>
              <a href={telHref(COMPANY.tel1)} className="mt-4 flex items-center gap-2 font-mono text-2xl font-bold hover:underline">
                <Phone className="h-5 w-5" /> {COMPANY.tel1}
              </a>
              <a href={telHref(COMPANY.tel2)} className="mt-1 flex items-center gap-2 font-mono text-lg text-navy-muted hover:text-navy-foreground">
                <Phone className="h-4 w-4" /> {COMPANY.tel2}
              </a>
            </div>
            <div className="space-y-3 rounded-lg border border-border bg-card p-6 text-sm">
              <p className="flex items-center gap-2"><Printer className="h-4 w-4 text-steel" /> FAX {COMPANY.fax}</p>
              <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-steel" /> <a className="hover:text-navy" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></p>
              <p className="flex items-start gap-2 text-muted-foreground"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-steel" /> 남겨주신 문의는 담당자가 확인 후 순차적으로 연락드립니다.</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function Field({ label, id, required, error, children }: { label: string; id: string; required?: boolean; error?: string | undefined; children: React.ReactNode }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id} className="text-sm font-semibold">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
