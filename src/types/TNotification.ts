export type TNotification = {
    id?: number,
    description: string,
    data: any,
    user?: {
        name: string
    },
    archived?: boolean,
    createdAt?: string,
}