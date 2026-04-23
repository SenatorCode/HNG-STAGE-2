import { formatCurrency } from "../../utils/formatCurrency";
import { formatDate } from "../../utils/formatDate";

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function InvoiceDetail({ invoice }) {
  return (
    <div className="rounded-2xl bg-white p-6 dark:bg-[#1E2139] md:p-8">
      {/* Top Section */}
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-bold text-[#0C0E16] dark:text-white">
            #{invoice.id}
          </h2>
          <p className="mt-1 text-sm text-[#888EB0]">{invoice.description}</p>
        </div>
        <div className="text-right text-sm text-[#888EB0]">
          <div className="whitespace-nowrap">{invoice.senderAddress.street}</div>
          <div className="whitespace-nowrap">{invoice.senderAddress.city}</div>
          <div className="whitespace-nowrap">{invoice.senderAddress.postCode}</div>
          <div className="whitespace-nowrap">{invoice.senderAddress.country}</div>
        </div>
      </div>

      {/* Middle Section - 3 Columns */}
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Invoice & Payment Dates */}
        <div>
          <div className="mb-6">
            <p className="text-xs font-bold uppercase text-[#888EB0]">Invoice Date</p>
            <p className="mt-2 text-lg font-bold text-[#0C0E16] dark:text-white">
              {formatDate(invoice.createdAt)}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase text-[#888EB0]">Payment Due</p>
            <p className="mt-2 text-lg font-bold text-[#0C0E16] dark:text-white">
              {formatDate(invoice.paymentDue)}
            </p>
          </div>
        </div>

        {/* Bill To */}
        <div>
          <p className="text-xs font-bold uppercase text-[#888EB0]">Bill To</p>
          <p className="mt-2 font-bold text-[#0C0E16] dark:text-white">
            {invoice.clientName}
          </p>
          <div className="mt-2 text-sm text-[#888EB0]">
            <div>{invoice.clientAddress.street}</div>
            <div>{invoice.clientAddress.city}</div>
            <div>{invoice.clientAddress.postCode}</div>
            <div>{invoice.clientAddress.country}</div>
          </div>
        </div>

        {/* Sent To */}
        <div>
          <p className="text-xs font-bold uppercase text-[#888EB0]">Sent to</p>
          <p className="mt-2 font-bold text-[#0C0E16] dark:text-white">
            {invoice.clientEmail}
          </p>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8 overflow-x-auto rounded-lg bg-[#F8F8FB] p-6 dark:bg-[#252945]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="pb-4 text-left text-xs font-bold uppercase text-[#888EB0]">
                Item Name
              </th>
              <th className="pb-4 text-center text-xs font-bold uppercase text-[#888EB0]">
                Qty
              </th>
              <th className="pb-4 text-right text-xs font-bold uppercase text-[#888EB0]">
                Price
              </th>
              <th className="pb-4 text-right text-xs font-bold uppercase text-[#888EB0]">
                Total
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b border-white/10 last:border-b-0">
                <td className="py-4 font-bold text-[#0C0E16] dark:text-white">
                  {item.name}
                </td>
                <td className="py-4 text-center text-[#888EB0]">{item.quantity}</td>
                <td className="py-4 text-right text-[#888EB0]">
                  {formatCurrency(item.price)}
                </td>
                <td className="py-4 text-right font-bold text-[#0C0E16] dark:text-white">
                  {formatCurrency(item.total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Amount Due Footer */}
      <div className={joinClasses(
        "flex items-center justify-between rounded-b-lg bg-[#373B53] px-6 py-6 dark:bg-[#0C0E16]"
      )}>
        <p className="text-sm font-bold uppercase text-white">
          Amount Due
        </p>
        <p className="text-3xl font-bold text-[#7C5DFA]">
          {formatCurrency(invoice.total)}
        </p>
      </div>
    </div>
  );
}
