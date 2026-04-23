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
    <div
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleClick();
        }
      }}
      className="group flex cursor-pointer items-center justify-between gap-4 rounded-lg border border-transparent bg-white p-4 transition-all hover:border-[#7C5DFA] hover:shadow-[0_12px_24px_rgba(0,0,0,0.12)] dark:bg-[#1E2139] md:gap-6 md:p-6"
    >
      {/* Desktop layout */}
      <div className="hidden flex-1 md:flex md:items-center md:gap-6">
        <div className="min-w-max font-bold text-[#0C0E16] dark:text-white">
          #{invoice.id}
        </div>
        <div className="min-w-max text-sm text-[#888EB0]">
          Due {formatDate(invoice.paymentDue)}
        </div>
        <div className="min-w-max text-sm text-[#888EB0]">
          {invoice.clientName}
        </div>
        <div className="flex-1" />
        <div className="min-w-max text-right font-bold text-[#0C0E16] dark:text-white">
          {formatCurrency(invoice.total)}
        </div>
        <div className="min-w-max">
          <StatusBadge status={invoice.status} />
        </div>
        <ChevronRight
          size={24}
          className="min-w-max text-[#7E88C3] group-hover:text-[#7C5DFA]"
        />
      </div>

      {/* Mobile layout */}
      <div className="flex w-full flex-col md:hidden">
        <div className="flex items-center justify-between">
          <div className="font-bold text-[#0C0E16] dark:text-white">
            #{invoice.id}
          </div>
          <StatusBadge status={invoice.status} />
        </div>
        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-sm text-[#888EB0]">{invoice.clientName}</div>
            <div className="mt-1 text-sm text-[#888EB0]">
              Due {formatDate(invoice.paymentDue)}
            </div>
          </div>
          <div className="font-bold text-[#0C0E16] dark:text-white">
            {formatCurrency(invoice.total)}
          </div>
        </div>
      </div>
    </div>
  );
}
