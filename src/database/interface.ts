export interface DBUser {
    userId: number,
    username: string,
    locale: string,
    joinedAt: Date,
    isBanned: boolean
}