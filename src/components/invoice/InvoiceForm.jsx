import { format } from "date-fns";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useFieldArray, useForm, useWatch } from "react-hook-form";
import Button from "../ui/Button";
import { formatCurrency } from "../../utils/formatCurrency";

const paymentTermsOptions = [
  { value: 1, label: "Net 1 Day" },
  { value: 7, label: "Net 7 Days" },
  { value: 14, label: "Net 14 Days" },
  { value: 30, label: "Net 30 Days" },
];

const emptyItem = { name: "", quantity: 1, price: 0 };

function getDefaultValues(invoice) {
  if (invoice) {
    return {
      senderAddress: {
        street: invoice.senderAddress?.street ?? "",
        city: invoice.senderAddress?.city ?? "",
        postCode: invoice.senderAddress?.postCode ?? "",
        country: invoice.senderAddress?.country ?? "",
      },
      clientName: invoice.clientName ?? "",
      clientEmail: invoice.clientEmail ?? "",
      clientAddress: {
        street: invoice.clientAddress?.street ?? "",
        city: invoice.clientAddress?.city ?? "",
        postCode: invoice.clientAddress?.postCode ?? "",
        country: invoice.clientAddress?.country ?? "",
      },
      invoiceDate: invoice.createdAt ?? format(new Date(), "yyyy-MM-dd"),
      paymentTerms: Number(invoice.paymentTerms) || 30,
      description: invoice.description ?? "",
      items: (invoice.items ?? []).map((item) => ({
        name: item.name ?? "",
        quantity: Number(item.quantity) || 1,
        price: Number(item.price) || 0,
      })),
    };
  }

  return {
    senderAddress: { street: "", city: "", postCode: "", country: "" },
    clientName: "",
    clientEmail: "",
    clientAddress: { street: "", city: "", postCode: "", country: "" },
    invoiceDate: format(new Date(), "yyyy-MM-dd"),
    paymentTerms: 30,
    description: "",
    items: [emptyItem],
  };
}

function fieldClass(hasError) {
  return [
    "mt-2 h-12 w-full rounded-lg border bg-white px-4 text-sm font-bold text-[#0C0E16] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-[#7C5DFA]/20 dark:bg-[#252945] dark:text-white",
    hasError
      ? "border-[#EC5757]"
      : "border-[#DFE3FA] hover:border-[#7C5DFA] focus:border-[#7C5DFA] dark:border-[#252945]",
  ].join(" ");
}

function itemFieldClass(hasError) {
  return [
    "h-12 w-full rounded-lg border bg-white px-4 text-sm font-bold text-[#0C0E16] caret-[#7C5DFA] outline-none transition-colors placeholder:text-[#888EB0] focus-visible:ring-2 focus-visible:ring-[#7C5DFA]/20 dark:bg-[#252945] dark:text-white dark:placeholder:text-[#DFE3FA]",
    hasError
      ? "border-[#EC5757] focus:border-[#EC5757] focus:ring-2 focus:ring-[#EC5757]/20"
      : "border-[#DFE3FA] hover:border-[#7C5DFA] focus:border-[#7C5DFA] focus:ring-2 focus:ring-[#7C5DFA]/20 dark:border-[#252945]",
  ].join(" ");
}

function ErrorText({ message }) {
  if (!message) return null;
  return (
    <p
      className="mt-2 text-xs font-semibold text-[#EC5757]"
      role="alert"
      aria-live="polite"
    >
      {message}
    </p>
  );
}

export default function InvoiceForm({
  isOpen,
  mode = "create",
  invoice,
  onClose,
  onSaveDraft,
  onSavePending,
  onSaveChanges,
}) {
  const isEditMode = mode === "edit";

  const {
    register,
    handleSubmit,
    control,
    getValues,
    reset,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ defaultValues: getDefaultValues(invoice) });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    reset(getDefaultValues(invoice));
  }, [invoice, reset, isOpen]);

  useEffect(() => {
    if (fields.length > 0 && errors.items?.message) {
      clearErrors("items");
    }
  }, [fields.length, errors.items?.message, clearErrors]);

  const watchedItems = useWatch({ control, name: "items" }) || [];

  const grandTotal = watchedItems.reduce((sum, item) => {
    const qty = Number(item?.quantity) || 0;
    const price = Number(item?.price) || 0;
    return sum + qty * price;
  }, 0);

  const ensureItemExists = (items) => {
    if (!items || items.length === 0) {
      setError("items", { type: "manual", message: "An item must be added" });
      return false;
    }
    clearErrors("items");
    return true;
  };

  const handleSaveAsDraft = () => {
    const formData = getValues();
    onSaveDraft?.(formData);
    onClose?.();
  };

  const handleSavePending = (formData) => {
    if (!ensureItemExists(formData.items)) return;
    onSavePending?.(formData);
    onClose?.();
  };

  const handleSaveEdit = (formData) => {
    if (!ensureItemExists(formData.items)) return;
    onSaveChanges?.(formData);
    onClose?.();
  };

  return (
    <>
      {isOpen && <div className="fixed inset-0 z-50 bg-black/50" />}

      <aside
        aria-hidden={!isOpen}
        className={[
          "fixed inset-y-0 left-0 z-60 w-full overflow-x-hidden overflow-y-auto bg-white transition-transform duration-300 dark:bg-[#141625] md:w-154 md:pl-20",
          isOpen ? "translate-x-0" : "-translate-x-full pointer-events-none",
        ].join(" ")}
      >
        <form
          className="flex min-h-full flex-col px-6 pb-8 pt-8 md:px-14"
          onSubmit={(event) => event.preventDefault()}
        >
          <h2 className="text-2xl font-bold text-[#0C0E16] dark:text-white">
            {isEditMode ? `Edit #${invoice?.id}` : "New Invoice"}
          </h2>

          <div className="mt-10 space-y-10">
            <section>
              <h3 className="text-sm font-bold text-[#7C5DFA]">Bill From</h3>
              <div className="mt-6">
                <label
                  htmlFor="sender-street"
                  className="text-xs font-medium text-[#7E88C3]"
                >
                  Street Address
                </label>
                <input
                  id="sender-street"
                  className={fieldClass(Boolean(errors.senderAddress?.street))}
                  {...register("senderAddress.street", {
                    required: "Street Address is required",
                  })}
                />
                <ErrorText message={errors.senderAddress?.street?.message} />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="sender-city"
                    className="text-xs font-medium text-[#7E88C3]"
                  >
                    City
                  </label>
                  <input
                    id="sender-city"
                    className={fieldClass(Boolean(errors.senderAddress?.city))}
                    {...register("senderAddress.city", {
                      required: "City is required",
                    })}
                  />
                  <ErrorText message={errors.senderAddress?.city?.message} />
                </div>
                <div>
                  <label
                    htmlFor="sender-postcode"
                    className="text-xs font-medium text-[#7E88C3]"
                  >
                    Post Code
                  </label>
                  <input
                    id="sender-postcode"
                    className={fieldClass(
                      Boolean(errors.senderAddress?.postCode),
                    )}
                    {...register("senderAddress.postCode", {
                      required: "Post Code is required",
                    })}
                  />
                  <ErrorText
                    message={errors.senderAddress?.postCode?.message}
                  />
                </div>
                <div>
                  <label
                    htmlFor="sender-country"
                    className="text-xs font-medium text-[#7E88C3]"
                  >
                    Country
                  </label>
                  <input
                    id="sender-country"
                    className={fieldClass(
                      Boolean(errors.senderAddress?.country),
                    )}
                    {...register("senderAddress.country", {
                      required: "Country is required",
                    })}
                  />
                  <ErrorText message={errors.senderAddress?.country?.message} />
                </div>
              </div>
            </section>

            <section>
              <h3 className="text-sm font-bold text-[#7C5DFA]">Bill To</h3>

              <div className="mt-6">
                <label
                  htmlFor="client-name"
                  className="text-xs font-medium text-[#7E88C3]"
                >
                  Client&apos;s Name
                </label>
                <input
                  id="client-name"
                  className={fieldClass(Boolean(errors.clientName))}
                  {...register("clientName", {
                    required: "Client name is required",
                  })}
                />
                <ErrorText message={errors.clientName?.message} />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="client-email"
                  className="text-xs font-medium text-[#7E88C3]"
                >
                  Client&apos;s Email
                </label>
                <input
                  id="client-email"
                  type="email"
                  className={fieldClass(Boolean(errors.clientEmail))}
                  {...register("clientEmail", {
                    required: "Client email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />
                <ErrorText message={errors.clientEmail?.message} />
              </div>

              <div className="mt-6">
                <label
                  htmlFor="client-street"
                  className="text-xs font-medium text-[#7E88C3]"
                >
                  Street Address
                </label>
                <input
                  id="client-street"
                  className={fieldClass(Boolean(errors.clientAddress?.street))}
                  {...register("clientAddress.street", {
                    required: "Street Address is required",
                  })}
                />
                <ErrorText message={errors.clientAddress?.street?.message} />
              </div>

              <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div>
                  <label
                    htmlFor="client-city"
                    className="text-xs font-medium text-[#7E88C3]"
                  >
                    City
                  </label>
                  <input
                    id="client-city"
                    className={fieldClass(Boolean(errors.clientAddress?.city))}
                    {...register("clientAddress.city", {
                      required: "City is required",
                    })}
                  />
                  <ErrorText message={errors.clientAddress?.city?.message} />
                </div>
                <div>
                  <label
                    htmlFor="client-postcode"
                    className="text-xs font-medium text-[#7E88C3]"
                  >
                    Post Code
                  </label>
                  <input
                    id="client-postcode"
                    className={fieldClass(
                      Boolean(errors.clientAddress?.postCode),
                    )}
                    {...register("clientAddress.postCode", {
                      required: "Post Code is required",
                    })}
                  />
                  <ErrorText
                    message={errors.clientAddress?.postCode?.message}
                  />
                </div>
                <div>
                  <label
                    htmlFor="client-country"
                    className="text-xs font-medium text-[#7E88C3]"
                  >
                    Country
                  </label>
                  <input
                    id="client-country"
                    className={fieldClass(
                      Boolean(errors.clientAddress?.country),
                    )}
                    {...register("clientAddress.country", {
                      required: "Country is required",
                    })}
                  />
                  <ErrorText message={errors.clientAddress?.country?.message} />
                </div>
              </div>
            </section>

            <section>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="invoice-date"
                    className="text-xs font-medium text-[#7E88C3]"
                  >
                    Invoice Date
                  </label>
                  <input
                    id="invoice-date"
                    type="date"
                    className={fieldClass(Boolean(errors.invoiceDate))}
                    {...register("invoiceDate", {
                      required: "Invoice date is required",
                    })}
                  />
                  <ErrorText message={errors.invoiceDate?.message} />
                </div>
                <div>
                  <label
                    htmlFor="payment-terms"
                    className="text-xs font-medium text-[#7E88C3]"
                  >
                    Payment Terms
                  </label>
                  <select
                    id="payment-terms"
                    className={fieldClass(Boolean(errors.paymentTerms))}
                    {...register("paymentTerms", {
                      required: "Payment terms are required",
                      setValueAs: (value) => Number(value),
                    })}
                  >
                    {paymentTermsOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ErrorText message={errors.paymentTerms?.message} />
                </div>
              </div>

              <div className="mt-6">
                <label
                  htmlFor="project-description"
                  className="text-xs font-medium text-[#7E88C3]"
                >
                  Project Description
                </label>
                <input
                  id="project-description"
                  className={fieldClass(Boolean(errors.description))}
                  {...register("description", {
                    required: "Project description is required",
                  })}
                />
                <ErrorText message={errors.description?.message} />
              </div>
            </section>

            <section>
              <h3 className="text-lg font-bold text-[#777F98]">Item List</h3>

              <div className="mt-6 hidden grid-cols-[minmax(0,1fr)_64px_88px_88px_24px] gap-3 text-xs font-semibold text-[#7E88C3] md:grid">
                <span>Item Name</span>
                <span>Qty</span>
                <span>Price</span>
                <span>Total</span>
                <span className="sr-only">Delete</span>
              </div>

              <div className="mt-4 space-y-6">
                {fields.map((field, index) => {
                  const qty = Number(watchedItems[index]?.quantity) || 0;
                  const price = Number(watchedItems[index]?.price) || 0;
                  const total = qty * price;
                  const nameError = errors.items?.[index]?.name?.message;
                  const quantityError =
                    errors.items?.[index]?.quantity?.message;
                  const priceError = errors.items?.[index]?.price?.message;

                  return (
                    <div key={field.id} className="rounded-lg md:rounded-none">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,1fr)_64px_88px_88px_24px] md:items-start md:gap-3">
                        <div>
                          <label
                            htmlFor={`item-name-${index}`}
                            className="text-xs font-medium text-[#7E88C3] md:sr-only"
                          >
                            Item Name
                          </label>
                          <input
                            id={`item-name-${index}`}
                            className={itemFieldClass(Boolean(nameError))}
                            {...register(`items.${index}.name`, {
                              required: "Required",
                            })}
                          />
                          <ErrorText message={nameError} />
                        </div>

                        <div>
                          <label
                            htmlFor={`item-qty-${index}`}
                            className="text-xs font-medium text-[#7E88C3] md:sr-only"
                          >
                            Qty
                          </label>
                          <input
                            id={`item-qty-${index}`}
                            type="number"
                            min="1"
                            className={itemFieldClass(Boolean(quantityError))}
                            {...register(`items.${index}.quantity`, {
                              required: "Required",
                              min: { value: 1, message: "Min 1" },
                              setValueAs: (value) =>
                                value === "" ? undefined : Number(value),
                            })}
                          />
                          <ErrorText message={quantityError} />
                        </div>

                        <div>
                          <label
                            htmlFor={`item-price-${index}`}
                            className="text-xs font-medium text-[#7E88C3] md:sr-only"
                          >
                            Price
                          </label>
                          <input
                            id={`item-price-${index}`}
                            type="number"
                            min="0"
                            step="0.01"
                            className={itemFieldClass(Boolean(priceError))}
                            {...register(`items.${index}.price`, {
                              required: "Required",
                              min: { value: 0, message: "Min 0" },
                              setValueAs: (value) =>
                                value === "" ? undefined : Number(value),
                            })}
                          />
                          <ErrorText message={priceError} />
                        </div>

                        <div className="flex h-12 items-center px-2 text-sm font-bold text-[#888EB0] md:mt-2">
                          {formatCurrency(total)}
                        </div>

                        <div className="flex h-12 items-center justify-start md:mt-2 md:justify-center">
                          <button
                            type="button"
                            aria-label="Delete item"
                            className="text-[#888EB0] transition-colors hover:text-[#EC5757] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5DFA]"
                            onClick={() => remove(index)}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <ErrorText message={errors.items?.message} />

              <Button
                type="button"
                variant="secondary"
                className="mt-6 w-full"
                onClick={() => append({ ...emptyItem })}
              >
                + Add New Item
              </Button>

              <div className="mt-6 text-right text-sm font-bold text-[#0C0E16] dark:text-white">
                Grand Total: {formatCurrency(grandTotal)}
              </div>
            </section>
          </div>

          <div className="mt-10 border-t border-[#DFE3FA] pt-6 dark:border-[#252945]">
            {isEditMode ? (
              <div className="flex items-center justify-end gap-2">
                <Button variant="secondary" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={handleSubmit(handleSaveEdit)}
                >
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <Button variant="ghost" onClick={onClose}>
                  Discard
                </Button>
                <div className="ml-auto flex items-center gap-2">
                  <Button variant="dark" onClick={handleSaveAsDraft}>
                    Save as Draft
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleSubmit(handleSavePending)}
                  >
                    Save &amp; Send
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      </aside>
    </>
  );
}
