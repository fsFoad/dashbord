// @ts-nocheck

export class ConditionDto{
    ruleId: number;
    ruleCondition: number;
    conditionValue: string;
    conditionType: number;
    conditionName: string;
    conditionFieldType: number;
    messageId: number;
    status: number;
    functionType: number;
    bodyNodePath?: string;
}
