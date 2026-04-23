import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";
import StatusBadge from "../ui/StatusBadge";

export default function InvoiceCard({ invoice }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/invoices/${invoice.id}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="group flex w-full cursor-pointer items-center justify-between gap-4 rounded-lg border border-transparent bg-white p-4 text-left transition-all hover:border-[#7C5DFA] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5DFA] dark:bg-[#1E2139] md:gap-6 md:p-6"
    >
      {/* Desktop layout */}
      <div className="hidden flex-1 md:grid md:min-w-0 md:grid-cols-[auto_auto_minmax(0,1fr)_auto_auto_auto_auto] md:items-center md:gap-6">
        <div className="whitespace-nowrap font-bold text-[#0C0E16] dark:text-white">
          #{invoice.id}
        </div>
        <div className="whitespace-nowrap text-sm text-[#888EB0]">
          Due {formatDate(invoice.paymentDue)}
        </div>
        <div className="min-w-0 truncate text-sm text-[#888EB0]">
          {invoice.clientName}
        </div>
        <div className="flex-1" />
        <div className="whitespace-nowrap text-right font-bold text-[#0C0E16] dark:text-white">
          {formatCurrency(invoice.total)}
        </div>
        <div className="whitespace-nowrap">
          <StatusBadge status={invoice.status} />
        </div>
        <ChevronRight
          size={24}
          className="justify-self-end text-[#7E88C3] group-hover:text-[#7C5DFA]"
        />
      </div>

      {/* Mobile layout */}
      <div className="flex w-full flex-col md:hidden">
        <div className="flex items-center justify-between">
          <div className="min-w-0 truncate text-sm text-[#888EB0]">
            {invoice.clientName}
          </div>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="mt-3 flex items-end justify-between gap-4">
          <div className="min-w-0">
            <div className="truncate font-bold text-[#0C0E16] dark:text-white">
              #{invoice.id}
            </div>
            <div className="mt-2 wrap-break-word text-sm text-[#888EB0]">
              Due {formatDate(invoice.paymentDue)}
            </div>
          </div>
          <div className="shrink-0 text-right font-bold text-[#0C0E16] dark:text-white">
            {formatCurrency(invoice.total)}
          </div>
        </div>
      </div>
    </button>
  );
}
