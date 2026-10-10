const base ="inline-flex h-10 cursor-pointer items-center justify-center gap-1.5 rounded-lg px-4 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60";

export const btnPrimary = `${base} border border-primary-strong bg-primary text-primary-content hover:border-primary-border-hover hover:bg-primary-stronger`;

export const btnGhost = `${base} border border-transparent text-base-content hover:border-hover-neutral-border hover:bg-hover-neutral`;

export const btnOutlineError = `${base} border border-error text-error hover:border-error-hover-border hover:bg-error-hover hover:text-error-content`;

export const btnSocial = `${base} border border-base-300 text-base-content hover:border-hover-neutral-border hover:bg-hover-neutral`;

export const inputCls ="h-10 w-full rounded-lg border border-base-content bg-base-100 px-3 text-sm text-base-content outline-none placeholder:text-base-content/50 focus:border-primary focus:ring-2 focus:ring-primary/30";

export const cardCls = "rounded-2xl border border-base-300 bg-base-100";

export const linkPrimary = "text-primary hover:text-link-hover hover:underline";