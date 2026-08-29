/** Ma'lumot hali kiritilmagan bo'limlar uchun betaraf ko'rinish. */
export function EmptyState({ hint }: { hint?: string }) {
  return (
    <div className="placeholder-block mt-10 rounded-2xl px-6 py-10 text-center">
      <p className="text-[14px] text-muted">Ma&rsquo;lumot hali kiritilmagan.</p>
      <p className="label mt-3">{hint ?? "Admin panel orqali to'ldiriladi"}</p>
    </div>
  );
}
