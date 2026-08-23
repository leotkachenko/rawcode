import type { Faq } from "@/lib/services";

export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="space-y-6">
      {faqs.map((faq) => (
        <div key={faq.question}>
          <h3 className="text-base font-semibold">{faq.question}</h3>
          <p className="mt-1 text-black/70 dark:text-white/70">{faq.answer}</p>
        </div>
      ))}
    </div>
  );
}
