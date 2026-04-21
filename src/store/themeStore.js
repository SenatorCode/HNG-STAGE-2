import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const THEME_STORAGE_KEY = 'invoice-theme'

export function getStoredTheme() {
	if (typeof window === 'undefined') return 'light'

	try {
		const raw = localStorage.getItem(THEME_STORAGE_KEY)
		if (!raw) return 'light'

		const parsed = JSON.parse(raw)
		return parsed?.state?.theme === 'dark' ? 'dark' : 'light'
	} catch {
		return 'light'
	}
}

export function applyTheme(theme) {
	if (typeof document === 'undefined') return

	document.documentElement.classList.toggle('dark', theme === 'dark')
}

export const useThemeStore = create(
	persist(
		(set, get) => ({
			theme: getStoredTheme(),
			toggle: () => {
				const next = get().theme === 'light' ? 'dark' : 'light'
				applyTheme(next)
				set({ theme: next })
			},
		}),
		{
			name: THEME_STORAGE_KEY,
			partialize: (state) => ({ theme: state.theme }),
			onRehydrateStorage: () => (state) => {
				applyTheme(state?.theme ?? 'light')
			},
		},
	),
)
