export interface Notification{
    id:string,
    firstName:string,
    lastName : string,
    avatar:string,
    date: Date,
    message: string,
    type: string,
    groupName: string,
    postTitle: string,
    unread: boolean,
    postedImage: string
}
export enum status{
 joinGroup,
 followYou
}
export type statusType = 'follow' | 'joinGroup' | 'recentPostReact' | 'sendMessage' | 'comment' | 'leftGroup';