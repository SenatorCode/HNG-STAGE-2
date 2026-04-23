import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import { useState } from "react";
import InvoiceCard from "../components/invoice/InvoiceCard";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import { useInvoiceStore, selectFilteredInvoices } from "../store/invoiceStore";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const invoices = useInvoiceStore((state) => state.invoices);
  const filter = useInvoiceStore((state) => state.filter);
  const setFilter = useInvoiceStore((state) => state.setFilter);
  const filteredInvoices = selectFilteredInvoices({
    invoices,
    filter,
  });

  const totalCount = invoices.length;
  const hasInvoices = filteredInvoices.length > 0;

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  return (
    <div className="min-h-screen w-full bg-[#F8F8FB] px-6 py-8 dark:bg-[#141625] md:px-12 md:py-14 lg:max-w-5xl lg:mx-auto">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-[#0C0E16] dark:text-white">
            Invoices
          </h1>
          <p className="mt-1 text-sm text-[#888EB0]">
            {totalCount === 0
              ? "No invoices"
              : `There are ${totalCount} total invoice${totalCount === 1 ? "" : "s"}`}
          </p>
        </div>

        {/* Filter + New Invoice button */}
        <div className="flex w-full items-center gap-4 md:w-auto">
          {/* Filter Dropdown */}
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <button className="flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold text-[#0C0E16] transition-colors hover:text-[#7C5DFA] dark:text-white dark:hover:text-[#7C5DFA] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5DFA]">
                Filter by status
                <ChevronDown size={16} />
              </button>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>
              <DropdownMenu.Content
                className="min-w-48 rounded-lg bg-white shadow-[0_10px_24px_rgba(0,0,0,0.15)] dark:bg-[#252945]"
                align="start"
                sideOffset={8}
              >
                <DropdownMenu.CheckboxItem
                  checked={filter === "all"}
                  onCheckedChange={() => handleFilterChange("all")}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-[#0C0E16] transition-colors hover:bg-[#F8F8FB] dark:text-white dark:hover:bg-[#1E2139] focus-visible:outline-none"
                >
                  <input
                    type="checkbox"
                    checked={filter === "all"}
                    readOnly
                    className="h-4 w-4 cursor-pointer"
                  />
                  All
                </DropdownMenu.CheckboxItem>

                <DropdownMenu.CheckboxItem
                  checked={filter === "draft"}
                  onCheckedChange={() => handleFilterChange("draft")}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-[#0C0E16] transition-colors hover:bg-[#F8F8FB] dark:text-white dark:hover:bg-[#1E2139] focus-visible:outline-none"
                >
                  <input
                    type="checkbox"
                    checked={filter === "draft"}
                    readOnly
                    className="h-4 w-4 cursor-pointer"
                  />
                  Draft
                </DropdownMenu.CheckboxItem>

                <DropdownMenu.CheckboxItem
                  checked={filter === "pending"}
                  onCheckedChange={() => handleFilterChange("pending")}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-[#0C0E16] transition-colors hover:bg-[#F8F8FB] dark:text-white dark:hover:bg-[#1E2139] focus-visible:outline-none"
                >
                  <input
                    type="checkbox"
                    checked={filter === "pending"}
                    readOnly
                    className="h-4 w-4 cursor-pointer"
                  />
                  Pending
                </DropdownMenu.CheckboxItem>

                <DropdownMenu.CheckboxItem
                  checked={filter === "paid"}
                  onCheckedChange={() => handleFilterChange("paid")}
                  className="flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-[#0C0E16] transition-colors hover:bg-[#F8F8FB] dark:text-white dark:hover:bg-[#1E2139] focus-visible:outline-none"
                >
                  <input
                    type="checkbox"
                    checked={filter === "paid"}
                    readOnly
                    className="h-4 w-4 cursor-pointer"
                  />
                  Paid
                </DropdownMenu.CheckboxItem>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>

          {/* New Invoice Button */}
          <Button
            variant="primary"
            className="flex items-center gap-2"
            onClick={() => setShowForm(true)}
          >
            <Plus size={18} />
            New Invoice
          </Button>
        </div>
      </div>

      {/* Invoice List or Empty State */}
      {hasInvoices ? (
        <div className="space-y-4">
          {filteredInvoices.map((invoice) => (
            <InvoiceCard key={invoice.id} invoice={invoice} />
          ))}
        </div>
      ) : (
        <EmptyState />
      )}

      {/* TODO: Form drawer will be rendered here when showForm is true */}
      {showForm && (
        <div className="text-center text-sm text-[#888EB0]">
          [Form drawer will be implemented in Stage 6]
        </div>
      )}
    </div>
  );
}
