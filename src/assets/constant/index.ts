export const NEXT_PUBLIC_SERVER = `${process.env.NEXT_PUBLIC_SERVER}/api/v1`
export const NEXT_PUBLIC_CLIENT = `${process.env.NEXT_PUBLIC_CLIENT}`

export enum EWordListStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
    DELETED = 'deleted',
    PUBLIC = 'public',
    PRIVATE = 'private',
}