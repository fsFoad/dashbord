export class ApiGatewayConstants {
    static postalPattern = '\\b(?!(\\d)\\1{3})[13-9]{4}[1346-9][013-9]{5}\\b';
    static phoneNumPattern = '^[0][0-9][0-9]([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]*$)';
    static mobNumPattern = '^((\\+98-?)|0)?[9][0-9]{9}$';
    static cust_alphanumEn = /^(?:(?![\u0600-\u06FF]).)*$/;
    //static cust_float =  /^-?\d+(\.\d+)?$/
    //static cust_float =  /[-+]?[0-9]*\.?[0-9]*/
    static cust_float = /[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)/;
    static cust_alphanumFa = /^[^a-zA-Z]*$/;
    static url_cust_alphaEnOSlashOUnderLine = /^[A-Za-z0-9_/]+$/;
    static url_cust_alphaEnOSlashOUnderDashLine = /^[\dA-Za-z\/\-_]+$/;
    static url_cust_alphaEnOSlashOUnderDashLineAndDash = /^[a-zA-Z0-9_\-\/]+$/;
    static cust_alphaAndNumbers = /^[\dA-Za-z]+$/;
    static yearRangeNormal = '1300:1410';
    static optionValueNormal = 'code';
    static optionLabelNormal = 'name';
    static SPEED_NOTIF_LOW;
    static minLength_partyName = '3';
    static LTRDirectionForForDiv = 'ltr';
    static RTLDirectionForForDiv = 'rtl';
    static APPDirection = 'rtl';
    static IsFontIran = false;
    static AppFontClass = 'isFontIran';
    static AppWrapperInitializer = true;
    static notifiSuccess = 'عملیات با موفقیت انجام شد';
    static customerTypes = [
        { name: 'حقیقی', code: '1' },
        { name: 'حقوقی', code: '2' },
    ];
    static citizenshipTypes = [
        { name: 'ایرانی', code: '1' },
        { name: 'غیرایرانی', code: '2' },
    ];
    static genderTypes = [
        { name: '-', code: null },
        { name: 'مرد', code: '1' },
        { name: 'زن', code: '2' },
    ];
    static countryList = [
        { name: '-', code: null },
        { name: 'ایران', code: '1' },
        // {name: 'انگلیس', code: '2'},
        // {name: 'عربستان', code: '3'},
    ];
    static provinceList = [
        { name: '-', code: null },
        { name: 'تهران', code: '1', countryCode: '1' },
        { name: 'اصفهان', code: '2', countryCode: '1' },
        { name: 'فارس', code: '3', countryCode: '1' },
        { name: 'خراسان رضوی', code: '4', countryCode: '1' },
        { name: 'قم', code: '5', countryCode: '1' },
        { name: 'کرمان', code: '6', countryCode: '1' },
    ];
    static cityList = [
        { name: '-', code: null },
        { name: 'تهران', code: '1', provinceCode: '1' },
        { name: 'قم', code: '2', provinceCode: '5' },
        { name: 'اصفهان', code: '3', provinceCode: '2' },
        { name: 'شیراز', code: '4', provinceCode: '3' },
        { name: 'مشهد', code: '5', provinceCode: '4' },
        { name: 'کرمان', code: '6', provinceCode: '6' },
        { name: 'سیرجان', code: '7', provinceCode: '6' },
        { name: 'رفسنجان', code: '8', provinceCode: '6' },
        { name: 'جیرفت', code: '9', provinceCode: '6' },
        { name: 'بم', code: '10', provinceCode: '6' },
    ];
    static residenceTypes = [
        { name: '-', code: null },
        { name: 'مقیم', code: '1' },
        { name: 'غیرمقیم', code: '2' },
    ];
    static howResidence = [
        { name: '-', code: null },
        { name: 'دائم', code: '1' },
        { name: 'موقت', code: '2' },
    ];
    static terminalTypesList = [
        { code: null, name: '-' },
        { code: '1', name: 'پایانه فروش متصل به خط تلفن' },
        { code: '2', name: 'پایانه متصل به خط شبکه' },
        { code: '3', name: 'پایانه متصل به صندوق فروشگاهی' },
        { code: '4', name: 'پایانه فروش سیار' },
        { code: '5', name: 'درگاه پرداخت اینترنتی' },
    ];
    static organizationList = [
        { code: null, name: '-' },
        { code: 1, name: 'بانک رسالت' },
        { code: 2, name: 'سازمان توانیر' },
        { code: 3, name: 'وزارت بهداشت،درمان و آموزش پزشکی' },
        { code: 4, name: 'وزارت صنعت، معدن وتجارت' },
    ];
    static statusList = [
        {
            code: null,
            name: '-'
        },
        {
            code: 1,
            name: 'فعال'
        },
        {
            code: 2,
            name: 'غیرفعال'
        }
    ];
    static categoryMessages = [
        { name: '-', code: null },
        { name: 'سازمان', code: '1' },
        { name: 'ماژول', code: '2' },
        { name: 'اندپوینت', code: '3' },
        { name: 'المان های اندپوینت', code: '4' },
        { name: 'کلاینت', code: '5' },
        { name: 'سرویس', code: '6' },
        { name: 'قواعد سرویس', code: '7' },
        { name: 'شرایط قواعد سرویس', code: '8' },
    ];
    static typeMessages = [
        { name: '-', code: null },
        { name: 'INFO', code: '1' },
        { name: 'WARRING', code: '2' },
        { name: 'ERROR', code: '3' },
        { name: 'EXCEPTION', code: '4' },
        { name: 'RECORD OR DATA NOT_FOUND', code: '5' },
        { name: 'RECORD OR DATA IS NOT ENABLED', code: '6' }
    ];
    static moduleType = [
        { name: '-', code: null },
        { name: 'Restful', code: '1' },
        { name: 'soap', code: '2' },
    ];
    static headerType = [
        { name: '-', code: null },
        { name: 'ثابت', code: '1' },
        { name: 'جایگزین', code: '2' },
        { name: 'فوروارد', code: '3' },
    ];
    static headerTypeGroup = [
        { name: '-', code: null },
        { name: 'Header', code: '1' },
        { name: 'Body', code: '2' },
        { name: 'Query String', code: '3' },
    ];
    static headerTypeGroupNode = [
        { name: '-', code: null },
        { name: 'Header', code: '1' },
        { name: 'Body', code: '2' },
        { name: 'Query String', code: '2' },
    ];
    static protocol = [
        { name: '-', code: null },
        { name: 'امن (https)', code: '1' },
        { name: 'ناامن (http)', code: '2' },
    ];
    static retryCount = [
        { name: 'بدون تلاش مجدد', code: '0' },
        { name: '1 مرتبه', code: '1' },
        { name: '2 مرتبه', code: '2' },
        { name: '3 مرتبه', code: '3' },
    ];
    static type = [
        { name: '-', code: null },
        { name: 'Post', code: '1' },
        { name: 'get', code: '2' },
        { name: 'Delete', code: '3' },
        { name: 'Options', code: '4' },
        { name: 'wed', code: '5' },
        { name: 'Pattern', code: '6' },
        { name: 'Trace', code: '7' },
    ];
    static day = [
        { name: '-', code: null },
        { name: '7', code: '7' },
        { name: '30', code: '30' },
        { name: '60', code: '60' },
        { name: '90', code: '90' },
    ];
    static OperatorOptions = [
        { name: '-', code: null },
        { name: 'and', code: '1' },
        { name: 'or', code: '2' },
    ];
    static callDuration = [
        { name: '-', code: null },
        { name: 'روزانه', code: '1' },
        { name: 'هفتگی', code: '2' },
        { name: 'ماهانه', code: '3' },
    ];
    static reverseCondition = [
        { name: '-', code: null },
        { name: 'درخواست ناموفق می باشد', code: '1' },
        { name: 'درخواست تایم اوت می باشد', code: '2' },
        { name: 'هردو', code: '3' },
    ];
    static generalErrorCodes = [
        { name: '-', code: null },
        { name: '400', code: '400' },
        { name: '401', code: '401' },
        { name: '404', code: '404' },
        { name: '500', code: '500' },
    ];
    static httpsstatus = [
        { name: '-', code: null },
        { name: '400', code: '400' },
        { name: '404', code: '404' },
        { name: '500', code: '500' },
    ];
    static statusCode = [
        { name: '-', code: null },
        { name: '200', code: '200' },
        { name: '400', code: '400' },
        { name: '401', code: '401' },
        { name: '404', code: '404' },
        { name: '500', code: '500' },
    ];
    static statusCodeHub = [
        { name: '-', code: null },
        { name: '200', code: '200' },
        { name: '400', code: '400' },
        { name: '401', code: '401' },
        { name: '500', code: '500' },
    ];
    static statusCodeApi = [
        { name: '-', code: null },
        { name: '400', code: '400' },
        { name: '401', code: '401' },
        { name: '404', code: '404' },
        { name: '500', code: '500' },
        { name: '502', code: '502' },
        { name: '503', code: '503' },
        { name: '504', code: '504' },
    ];
    static ruleTemplate = [
        { name: '-', code: null },
        { name: 'بخش داخلی', code: '0' },
        { name: 'بخش خارجی', code: '1' },
    ];
    static conditionType = [
        { name: '-', code: null },
        { name: 'header', code: '2' },
        { name: 'body', code: '1' },
        { name: 'queryString', code: '3' },
    ];
    static limitType = [
        { name: '-', code: null },
        { name: 'Include', code: '1' },
        { name: 'Exclude', code: '2' },
    ];
    static conditionFieldType = [
        { name: '-', code: null },
        { name: 'عدد', code: '1' },
        { name: 'رشته', code: '2' },
    ];
    static authenticationMethod = [
        { name: '-', code: null },
        { name: 'Basic Authentication', code: '1' },
        { name: 'Digital Signature', code: '2' },
    ];
    static functionType = [
        { name: '-', code: null },
        { name: 'طول رشته (LEN)', code: '1' },
        { name: 'زیر رشته (SUBSTRING)', code: '3' },
        { name: 'تقسیم رشته (SPLIT)', code: '5' },
        { name: 'عبارت ترکیبی رشته (EXPRESSION)', code: '6' },
        { name: 'جمع (+)', code: '7' },
        { name: 'منها (-)', code: '8' },
        { name: 'ضرب (*)', code: '9' },
        { name: 'تقسیم (/)', code: '10' },
        { name: 'باقی مانده (%)', code: '11' },
    ];
    static functionTypeStringOptions = [
        { name: '-', code: null },
        { name: 'طول رشته (LEN)', code: '1' },
        { name: 'زیر رشته (SUBSTRING)', code: '3' },
        { name: 'تقسیم رشته (SPLIT)', code: '5' },
        { name: 'عبارت ترکیبی رشته (EXPRESSION)', code: '6' },
    ];
    static functionTypeNumberOptions = [
        { name: '-', code: null },
        { name: 'جمع (+)', code: '7' },
        { name: 'منها (-)', code: '8' },
        { name: 'ضرب (*)', code: '9' },
        { name: 'تقسیم (/)', code: '10' },
        { name: 'باقی مانده (%)', code: '11' },
    ];
    static conditions = [
        { name: '-', code: null },
        { name: 'بزرگ تر (>)', code: '1' },
        { name: 'کوچک تر (<)', code: '2' },
        { name: 'مساوی (==)', code: '3' },
        { name: 'نامساوی (!=)', code: '6' },
        { name: 'بزرگ تر مساوی (>=)', code: '4' },
        { name: 'کوچک تر مساوی (<=)', code: '5' },
    ];
    static conditionsMathInputMediator = [
        { name: '-', code: null },
        { name: '>', code: '1' },
        { name: '<', code: '2' },
        { name: '==', code: '3' },
        { name: '!=', code: '4' },
        { name: '>=', code: '5' },
        { name: '<=', code: '6' },
    ];
    static conditionsMediationsNodeInputMediator = [
        { name: '-', code: null },
        { name: '==', code: '3' },
        { name: '!=', code: '4' },
    ];
    static conditionsMath = [
        { name: '-', code: null },
        { name: '>', code: '1' },
        { name: '<', code: '2' },
        { name: '>=', code: '4' },
        { name: '<=', code: '5' },
    ];
    static conditionsMediationsNode = [
        { name: '-', code: null },
        { name: '==', code: '3' },
        { name: '!=', code: '6' },
    ];
    static xmlString = "{\n" +
        "    \"data\": [\n" +
        "        {\n" +
        "            \"label\": \"SOAP-ENV:Envelope\",\n" +
        "            \"data\": \"SOAP-ENV:Envelope\",\n" +
        "            \"children\": [\n" +
        "                {\n" +
        "                    \"label\": \"SOAP-ENV:Body\",\n" +
        "                    \"data\": \"SOAP-ENV:Body\",\n" +
        "                    \"children\": [\n" +
        "                        {\n" +
        "                            \"label\": \"FindPersonResponse\",\n" +
        "                            \"data\": \"FindPersonResponse\",\n" +
        "                            \"children\": [\n" +
        "                                {\n" +
        "                                    \"label\": \"FindPersonResult\",\n" +
        "                                    \"data\": \"FindPersonResult\",\n" +
        "                                    \"children\": [\n" +
        "                                        { \"label\": \"Name\", \"data\": \"Name\" },\n" +
        "                                        { \"label\": \"SSN\", \"data\": \"SSN\" },\n" +
        "                                        { \"label\": \"DOB\", \"data\": \"DOB\" },\n" +
        "                                        {\n" +
        "                                            \"label\": \"Home\",\n" +
        "                                            \"data\": \"Home\",\n" +
        "                                            \"children\": [\n" +
        "                                                { \"label\": \"Street\", \"data\": \"Street\" },\n" +
        "                                                { \"label\": \"City\", \"data\": \"City\" },\n" +
        "                                                { \"label\": \"State\", \"data\": \"State\" },\n" +
        "                                                { \"label\": \"Zip\", \"data\": \"Zip\" }\n" +
        "                                            ]\n" +
        "                                        },\n" +
        "                                        {\n" +
        "                                            \"label\": \"Office\",\n" +
        "                                            \"data\": \"Office\",\n" +
        "                                            \"children\": [\n" +
        "                                                { \"label\": \"Street\", \"data\": \"Street\" },\n" +
        "                                                { \"label\": \"City\", \"data\": \"City\" },\n" +
        "                                                { \"label\": \"State\", \"data\": \"State\" },\n" +
        "                                                {\n" +
        "                                                    \"label\": \"Zip\",\n" +
        "                                                    \"data\": \"Zip\",\n" +
        "                                                    \"children\": [\n" +
        "                                                        { \"label\": \"ZoneCode\", \"data\": \"ZoneCode\" },\n" +
        "                                                        { \"label\": \"PostCode\", \"data\": \"PostCode\" }\n" +
        "                                                    ]\n" +
        "                                                },\n" +
        "                                                {\n" +
        "                                                    \"label\": \"FavoriteColors\",\n" +
        "                                                    \"data\": \"FavoriteColors\",\n" +
        "                                                    \"children\": [\n" +
        "                                                        {\n" +
        "                                                            \"label\": \"FavoriteColorsItem\",\n" +
        "                                                            \"data\": \"FavoriteColorsItem\"\n" +
        "                                                        }\n" +
        "                                                    ]\n" +
        "                                                },\n" +
        "                                                { \"label\": \"Age\", \"data\": \"Age\" }\n" +
        "                                            ]\n" +
        "                                        }\n" +
        "                                    ]\n" +
        "                                }\n" +
        "                            ]\n" +
        "                        }\n" +
        "                    ]\n" +
        "                }\n" +
        "            ]\n" +
        "        }\n" +
        "    ]\n" +
        "}";
    constructor() {
        // Constants.notifiSuccess =this.translateService.instant('label.
    }
}
