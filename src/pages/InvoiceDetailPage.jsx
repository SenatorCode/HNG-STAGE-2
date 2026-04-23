import { ChevronLeft, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InvoiceDetail from "../components/invoice/InvoiceDetail";
import InvoiceForm from "../components/invoice/InvoiceForm";
import Button from "../components/ui/Button";
import DeleteModal from "../components/ui/DeleteModal";
import StatusBadge from "../components/ui/StatusBadge";
import { useInvoiceStore } from "../store/invoiceStore";

export default function InvoiceDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const invoices = useInvoiceStore((state) => state.invoices);
  const deleteInvoice = useInvoiceStore((state) => state.deleteInvoice);
  const markAsPaid = useInvoiceStore((state) => state.markAsPaid);
  const updateInvoice = useInvoiceStore((state) => state.updateInvoice);

  const invoice = invoices.find((inv) => inv.id === id);

  if (!invoice) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center gap-6 bg-[#F8F8FB] px-6 dark:bg-[#141625]">
        <h1 className="text-2xl font-bold text-[#0C0E16] dark:text-white">
          Invoice not found
        </h1>
        <Button variant="primary" onClick={() => navigate("/")}>
          Back to Invoices
        </Button>
      </div>
    );
  }

  const handleDelete = () => {
    deleteInvoice(id);
    navigate("/");
  };

  const handleMarkAsPaid = () => {
    markAsPaid(id);
  };

  const showEditDelete =
    invoice.status === "draft" || invoice.status === "pending";
  const showMarkAsPaid = invoice.status === "pending";
  const showDelete = true;

  return (
    <div className="min-h-screen w-full bg-[#F8F8FB] px-6 py-8 dark:bg-[#141625] md:px-12 md:py-14 lg:max-w-5xl lg:mx-auto">
      {/* Go Back Row */}
      <button
        onClick={() => navigate("/")}
        className="mb-8 flex items-center gap-3 text-sm font-bold text-[#7E88C3] transition-colors hover:text-[#0C0E16] dark:hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5DFA]"
      >
        <ChevronLeft size={16} />
        Go back
      </button>

      {/* Status Bar Card */}
      <div className="mb-6 flex flex-col items-start justify-between gap-4 rounded-lg bg-white p-6 dark:bg-[#1E2139] md:flex-row md:items-center">
        <div>
          <p className="text-sm text-[#888EB0]">Status</p>
          <StatusBadge status={invoice.status} className="mt-2" />
        </div>

        <div className="flex w-full gap-2 md:w-auto md:justify-end">
          {showEditDelete && (
            <Button
              variant="ghost"
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2"
            >
              <Edit size={16} />
              Edit
            </Button>
          )}
          {showDelete && (
            <Button
              variant="danger"
              onClick={() => setShowDeleteModal(true)}
              className="flex items-center gap-2"
            >
              <Trash2 size={16} />
              Delete
            </Button>
          )}
          {showMarkAsPaid && (
            <Button
              variant="primary"
              onClick={handleMarkAsPaid}
              className="flex items-center gap-2"
            >
              Mark as Paid
            </Button>
          )}
        </div>
      </div>

      {/* Invoice Detail Card */}
      <InvoiceDetail invoice={invoice} />

      {/* Delete Modal */}
      <DeleteModal
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
        invoiceId={id}
        onConfirm={handleDelete}
      />

      <InvoiceForm
        isOpen={showForm}
        mode="edit"
        invoice={invoice}
        onClose={() => setShowForm(false)}
        onSaveChanges={(formData) => updateInvoice(id, formData)}
      />
    </div>
  );
}
