export type TNotification = {
    id?: number,
    description: string,
    data: any,
    // data: {
    //     message?: string,
    //     product?: string,
    //     subproduct?: string,
    //     validity?: string
    // },
    user?: {
        name: string
    },
    archived?: boolean,
    createdAt?: string,
}