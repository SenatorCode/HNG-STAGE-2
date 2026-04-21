import { addDays, format, parseISO } from 'date-fns'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { seedData } from '../data/seedData'
import { generateId } from '../utils/generateId'

const STORAGE_KEY = 'invoice-data'

function roundToTwo(value) {
	return Number(Number(value).toFixed(2))
}

function normalizeItems(items = []) {
	return items.map((item) => {
		const quantity = Number(item.quantity) || 0
		const price = Number(item.price) || 0
		return {
			name: item.name ?? '',
			quantity,
			price,
			total: roundToTwo(quantity * price),
		}
	})
}

function calculateTotal(items = []) {
	return roundToTwo(
		items.reduce((sum, item) => sum + Number(item.total || 0), 0),
	)
}

function getInvoiceDate(data) {
	return data.invoiceDate ?? data.createdAt ?? format(new Date(), 'yyyy-MM-dd')
}

function buildInvoice(data, status, id = generateId()) {
	const items = normalizeItems(data.items ?? [])
	const invoiceDate = getInvoiceDate(data)
	const paymentTerms = Number(data.paymentTerms) || 30
	const paymentDue = format(
		addDays(parseISO(invoiceDate), paymentTerms),
		'yyyy-MM-dd',
	)

	return {
		id,
		status,
		createdAt: invoiceDate,
		paymentDue,
		paymentTerms,
		description: data.description ?? '',
		clientName: data.clientName ?? '',
		clientEmail: data.clientEmail ?? '',
		senderAddress: {
			street: data.senderAddress?.street ?? '',
			city: data.senderAddress?.city ?? '',
			postCode: data.senderAddress?.postCode ?? '',
			country: data.senderAddress?.country ?? '',
		},
		clientAddress: {
			street: data.clientAddress?.street ?? '',
			city: data.clientAddress?.city ?? '',
			postCode: data.clientAddress?.postCode ?? '',
			country: data.clientAddress?.country ?? '',
		},
		items,
		total: calculateTotal(items),
	}
}

export function selectFilteredInvoices(state) {
	if (state.filter === 'all') return state.invoices
	return state.invoices.filter((invoice) => invoice.status === state.filter)
}

export const useInvoiceStore = create(
	persist(
		(set, get) => ({
			invoices: seedData,
			filter: 'all',
			addInvoice: (data, status) => {
				const invoice = buildInvoice(data, status)
				set({ invoices: [invoice, ...get().invoices] })
			},
			updateInvoice: (id, data) => {
				set({
					invoices: get().invoices.map((invoice) =>
						invoice.id === id
							? buildInvoice({ ...invoice, ...data }, invoice.status, id)
							: invoice,
					),
				})
			},
			deleteInvoice: (id) => {
				set({ invoices: get().invoices.filter((invoice) => invoice.id !== id) })
			},
			markAsPaid: (id) => {
				set({
					invoices: get().invoices.map((invoice) =>
						invoice.id === id ? { ...invoice, status: 'paid' } : invoice,
					),
				})
			},
			setFilter: (value) => set({ filter: value }),
		}),
		{
			name: STORAGE_KEY,
			partialize: (state) => ({ invoices: state.invoices, filter: state.filter }),
		},
	),
)
