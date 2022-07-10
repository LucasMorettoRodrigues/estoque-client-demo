export const formatDate = (date: string | null | undefined) => {
    if (date) {
        return `${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`
    }
    return 'Ind.'
}

export const formatValidity = (date: string | null | undefined) => {
    if (date) {
        return date.slice(0, 10)

    }
    return 'Ind.'
}

export const isExpired = (validity: string): boolean => {
    if (!validity) {
        return false
    }

    const validityDate = new Date(validity)
    const today = new Date()

    if (validityDate < today) {
        return true
    }

    return false
}

export const compareDates = (a: string, b: string): number => {
    let dateA: any = new Date(a);
    let dateB: any = new Date(b);
    return dateB - dateA;
}