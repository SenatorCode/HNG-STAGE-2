import logoMark from "../../assets/invoiceLogo.svg";
import avatarImage from "../../assets/avatar.svg";
import ThemeToggle from "./ThemeToggle";

function Avatar() {
  return (
    <img
      src={avatarImage}
      alt="Profile picture"
      className="h-10 w-10 rounded-full border border-white/10 object-cover shadow-[0_6px_16px_rgba(12,14,22,0.35)]"
    />
  );
}

export default function Sidebar() {
  return (
    <>
      <aside className="fixed inset-x-0 top-0 z-40 bg-[#373B53] md:inset-y-0 md:left-0 md:w-20 md:rounded-r-3xl">
        <div className="flex h-18 items-center px-0 md:h-full md:flex-col md:items-stretch md:justify-start md:py-6">
          <div className="flex h-18 w-18 items-center justify-center md:h-20 md:w-20 md:justify-start md:self-start md:overflow-hidden md:rounded-br-3xl">
            <img
              src={logoMark}
              alt="Invoice app"
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className="ml-auto flex items-center gap-3 pr-6 md:ml-0 md:hidden"
            aria-label="Theme and profile controls"
          >
            <ThemeToggle />
            <Avatar />
          </div>

          <div className="hidden flex-1 md:block" />

          <div className="mt-auto hidden w-full flex-col items-center gap-6 px-0 md:flex md:pb-0">
            <div className="h-px w-full bg-white/10" />
            <ThemeToggle />
            <Avatar />
          </div>
        </div>
      </aside>
    </>
  );
}
