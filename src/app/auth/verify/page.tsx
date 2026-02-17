import Link from "next/link";

export default function VerifyPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative" style={{ background: "var(--bg)" }}>
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
      }} />

      <div className="relative w-full max-w-[420px] mx-4 text-center">
        <div className="flex items-center justify-center mb-8" style={{ width: "64px", height: "64px", margin: "0 auto 32px", border: "1px solid var(--border)", background: "var(--bg-surface)" }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--cyan)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="4" width="20" height="16" rx="1" />
            <path d="M22 7l-10 6L2 7" />
          </svg>
        </div>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "24px", fontWeight: 700, color: "#fff", textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: "12px" }}>
          Check Your Email
        </h1>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6, marginBottom: "32px" }}>
          We sent a magic link to your inbox.<br />Click the link to sign in.
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-muted)" }}>
          Didn&apos;t receive it? Check spam or{" "}
          <Link href="/auth/signin" className="hover:underline" style={{ color: "var(--cyan)" }}>try again</Link>
        </p>
      </div>
    </div>
  );
}
