import * as Dialog from "@radix-ui/react-dialog";
import Button from "./Button";

function joinClasses(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DeleteModal({
  open,
  onOpenChange,
  invoiceId,
  onConfirm,
}) {
  const handleDelete = () => {
    onConfirm?.();
    onOpenChange?.(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[1px]" />
        <Dialog.Content
          className={joinClasses(
            "fixed left-1/2 top-1/2 z-50 w-[calc(100vw-2rem)] max-w-120 -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white p-6 shadow-[0_24px_60px_rgba(0,0,0,0.28)] outline-none dark:bg-[#1E2139] sm:p-8",
          )}
        >
          <Dialog.Title className="text-2xl font-bold text-[#0C0E16] dark:text-white">
            Confirm Deletion
          </Dialog.Title>
          <Dialog.Description className="mt-4 text-sm leading-6 text-[#888EB0] dark:text-[#DFE3FA]">
            Are you sure you want to delete invoice #{invoiceId}? This action
            cannot be undone.
          </Dialog.Description>

          <div className="mt-8 flex items-center justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="secondary" className="min-w-24">
                Cancel
              </Button>
            </Dialog.Close>
            <Button
              variant="danger"
              className="min-w-24"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
