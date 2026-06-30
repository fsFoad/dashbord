export class MessagesDto{
    code: string;
    title: string;
    text: string;
    textEN?: string;
    type: number;
    tableId: number;
    messageId?:number;
    isSystemMessage?:number;
}
