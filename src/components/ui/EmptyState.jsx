import emailIllustration from "../../assets/Email_Illustration.svg";

export default function EmptyState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="mx-auto flex max-w-md flex-col items-center text-center">
        <img
          src={emailIllustration}
          alt="Illustration of an empty invoice envelope"
          className="mb-10 h-40 w-48 object-contain"
        />

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
