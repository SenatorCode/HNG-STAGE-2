import { format, parseISO } from 'date-fns'

export const formatDate = (dateStr) => format(parseISO(dateStr), 'dd MMM yyyy')
