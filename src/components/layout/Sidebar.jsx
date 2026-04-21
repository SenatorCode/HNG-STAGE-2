import ThemeToggle from './ThemeToggle'

function LogoMark() {
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#7C5DFA] shadow-[0_10px_30px_rgba(124,93,250,0.35)] md:h-20 md:w-20 md:rounded-r-3xl md:rounded-tl-none md:rounded-bl-none">
      <span className="text-lg font-bold text-white md:text-2xl">M</span>
    </div>
  )
}

function Avatar() {
  return (
    <img
      src="https://i.pravatar.cc/100?img=12"
      alt="User avatar"
      className="h-10 w-10 rounded-full border border-white/10 object-cover md:h-10 md:w-10"
    />
  )
}

export default function Sidebar() {
  return (
    <>
      <aside className="fixed inset-x-0 top-0 z-40 flex h-18 items-center justify-between bg-[#373B53] px-6 md:inset-y-0 md:left-0 md:w-20 md:flex-col md:justify-between md:rounded-r-3xl md:px-0 md:py-6">
        <div className="flex items-center">
          <LogoMark />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <Avatar />
        </div>

        <div className="hidden w-full flex-col items-center gap-6 md:flex">
          <div className="flex w-full flex-col items-center gap-6 px-0 pb-0">
            <div className="h-px w-full bg-white/10" />
            <ThemeToggle />
            <Avatar />
          </div>
        </div>
      </aside>
    </>
  )
}
