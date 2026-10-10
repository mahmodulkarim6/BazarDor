const nf = new Intl.NumberFormat("bn-BD");
const nf1 = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const nf2 = new Intl.NumberFormat("bn-BD", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const toBn = (n) => nf.format(n);
export const toBnPct = (n) => nf1.format(Math.abs(n));
export const toBnAvg = (n) => (Number.isInteger(n) ? nf.format(n) : nf2.format(n));

export const UNIT_BN = {
  kg: "প্রতি কেজি",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};
export const UNIT_SHORT = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
export const unitBn = (u) => UNIT_BN[u] || `প্রতি ${u}`;
export const unitShort = (u) => UNIT_SHORT[u] || u;

export const banglaDate = (d = new Date()) => {
  const parts = new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).formatToParts(d);
  const g = (t) => parts.find((p) => p.type === t)?.value;
  return `${g("weekday")}, ${g("day")} ${g("month")}, ${g("year")}`;
};
