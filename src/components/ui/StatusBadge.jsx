const statusStyles = {
  paid: {
    label: "Paid",
    dot: "bg-[#33D69F]",
    light: "bg-[#33D69F]/10 text-[#33D69F]",
    dark: "dark:bg-[#33D69F]/10 dark:text-[#33D69F]",
  },
  pending: {
    label: "Pending",
    dot: "bg-[#FF8F00]",
    light: "bg-[#FF8F00]/10 text-[#FF8F00]",
    dark: "dark:bg-[#FF8F00]/10 dark:text-[#FF8F00]",
  },
  draft: {
    label: "Draft",
    dot: "bg-[#373B53]",
    light: "bg-[#373B53]/10 text-[#373B53]",
    dark: "dark:bg-[#DFE3FA]/10 dark:text-[#DFE3FA]",
  },
};

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function StatusBadge({
  status = "draft",
  className = "",
  ...props
}) {
  const config = statusStyles[status] ?? statusStyles.draft;

  return (
    <span
      aria-label={`Status: ${status}`}
      className={joinClasses(
        "inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-bold capitalize",
        config.light,
        config.dark,
        className,
      )}
      {...props}
    >
      <span
        className={joinClasses("h-2 w-2 rounded-full", config.dot)}
        aria-hidden="true"
      />
      {config.label}
    </span>
  );
}
