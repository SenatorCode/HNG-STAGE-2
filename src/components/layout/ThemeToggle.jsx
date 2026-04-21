import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../../store/themeStore'

export default function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggle = useThemeStore((state) => state.toggle)

  return (
    <button
      type="button"
      aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
      onClick={toggle}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#7E88C3] transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-white/40"
    >
      {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  )
}
