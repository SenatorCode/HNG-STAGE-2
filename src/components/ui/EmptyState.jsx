export default function EmptyState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <svg
          viewBox="0 0 240 200"
          role="img"
          aria-label="Illustration of an empty invoice envelope"
          className="mb-10 h-40 w-48"
        >
          <defs>
            <linearGradient id="empty-envelope" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#C9CCE4" />
              <stop offset="100%" stopColor="#7C5DFA" stopOpacity="0.9" />
            </linearGradient>
          </defs>
          <rect
            x="52"
            y="78"
            width="136"
            height="86"
            rx="20"
            fill="url(#empty-envelope)"
            opacity="0.95"
          />
          <path
            d="M58 96L120 132L182 96"
            stroke="#FFFFFF"
            strokeOpacity="0.75"
            strokeWidth="8"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d="M70 108L120 146L170 108"
            stroke="#FFFFFF"
            strokeOpacity="0.45"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="120" cy="58" r="28" fill="#FFF7E8" />
          <circle cx="120" cy="52" r="10" fill="#7C5DFA" opacity="0.9" />
          <path
            d="M105 82c4-10 10-14 15-14s11 4 15 14"
            stroke="#7C5DFA"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M92 118h56"
            stroke="#0C0E16"
            strokeOpacity="0.12"
            strokeWidth="10"
            strokeLinecap="round"
          />
        </svg>

        <h2 className="text-2xl font-bold text-[#0C0E16] dark:text-white">
          There is nothing here
        </h2>
        <p className="mt-4 text-sm leading-6 text-[#888EB0] dark:text-[#DFE3FA]">
          Create an invoice by clicking the <strong>New Invoice</strong> button
          and get started
        </p>
      </div>
    </div>
  );
}
