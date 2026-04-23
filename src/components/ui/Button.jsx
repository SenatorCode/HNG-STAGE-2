const variantClasses = {
  primary:
    "bg-[#7C5DFA] text-white shadow-[0_8px_18px_rgba(124,93,250,0.24)] hover:bg-[#9277FF] focus-visible:ring-[#7C5DFA]",
  secondary:
    "bg-[#F3F4FA] text-[#7E88C3] hover:bg-[#DFE3FA] hover:text-[#0C0E16] dark:bg-[#252945] dark:text-[#DFE3FA] dark:hover:bg-[#1E2139] dark:hover:text-white focus-visible:ring-[#7C5DFA]",
  danger:
    "bg-[#EC5757] text-white hover:bg-[#FF9797] focus-visible:ring-[#EC5757]",
  dark: "bg-[#373B53] text-[#888EB0] hover:bg-[#1E2139] hover:text-white focus-visible:ring-[#7C5DFA]",
  ghost:
    "bg-transparent px-0 text-[#7E88C3] hover:text-[#0C0E16] dark:hover:text-white focus-visible:ring-[#7C5DFA]",
};

const sizeClasses = {
  default: "h-12 px-6 text-sm font-bold",
  compact: "h-10 px-4 text-sm font-bold",
};

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Button({
  variant = "primary",
  children,
  onClick,
  disabled = false,
  type = "button",
  className = "",
  size = "default",
  ...props
}) {
  const isGhost = variant === "ghost";

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={joinClasses(
        "inline-flex items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-50",
        isGhost
          ? "h-auto min-h-0 rounded-none p-0 font-bold underline-offset-4"
          : sizeClasses[size],
        variantClasses[variant] ?? variantClasses.primary,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
