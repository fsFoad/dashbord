export class Constants {
    static postalPattern = '\\b(?!(\\d)\\1{3})[13-9]{4}[1346-9][013-9]{5}\\b';
    static phoneNumPattern = '^[0][0-9][0-9]([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]*$)';
    static mobNumPattern = '^((\\+98-?)|0)?[9][0-9]{9}$';
    static BracesOpenAndClosePattern = /}[^}]*$/;
    static BracesClosePattern =/\}/;
    static BracesOpenPattern = /\{/;
    static BracesOpenAndCloseAndEveryPattern = /{.*}/;
    static farsiNameMaxLength = 25;
    static farsiFamilyMaxLength = 25;
    static maxAmountMaxLength = 21;
    static minAmountMaxLength = 21;
    static maxPostalCode = 10;
    static maxPhoneNumber = 11;
    static maxLicenseNumber = 25;
    static titleLimitMaxLength = 125;
    static titleRestrictionsMaxLength = 100;
    static wageTitleMaxLength = 125;
    static serviceAffectedIdMaxLength = 26;
    static feeAffectedIdMaxLength = 26;
    static maxToken = 26;
    static nationalCodeLength = 10;
    static shenaseMelliLength = 11;
    static mobileLength = 11;
    static cardNoLength = 16;
    static yearRangeNormal = '1300:1410';
    static optionValueNormal = 'code';
    static optionLabelNormal = 'name';

    static LTRDirectionForForDiv = 'ltr';
    static RTLDirectionForForDiv = 'rtl';
    static APPDirection = 'rtl';
    static IsFontIran = false;
    static AppFontClass = 'isFontIran';
    static AppWrapperInitializer = true;

    static TABVIEW_HOME_PANEL_NAME="خانه";
    static TABVIEW_MESSAGES_PANEL_NAME="پیام ها";
    static TABVIEW_RULES_PANEL_NAME="قواعد";
    static TABVIEW_PARTY_PANEL_NAME="سازمان";
    static TABVIEW_MODULE_PANEL_NAME="ماژول";
    static TABVIEW_CLIENT_PANEL_NAME="کلاینت";
    static TABVIEW_ACCESS_PANEL_NAME="لیست دسترسی";
    static TABVIEW_MEDIATORS_LIST_PANEL_NAME="لیست مدیاتور ها";
    static TABVIEW_MEDIATOR_XML_PANEL_NAME="مدیاتور xml";
    static TABVIEW_MEDIATOR_Json_PANEL_NAME="مدیاتور json";
    static TABVIEW_USERS_PANEL_NAME="کاربران";
    static TABVIEW_ROLES_PANEL_NAME="نقش ها";
    static TABVIEW_REPORT_LOG_PANEL_NAME="گزارش ریز کارکرد سرویس";
    static TABVIEW_REPORT_CALL_PANEL_NAME="گزارش فراخوانی تجمیعی سرویس ها";
    static TABVIEW_FACTOR_PANEL_NAME="فاکتور";
    static TABVIEW_COSTS_PANEL_NAME="هزینه ها";
    static TABVIEW_ABOUT_PANEL_NAME="درباره...";
    static TABVIEW_WAGE_PANEL_NAME="کارمزد سرویس";
    static TABVIEW_DATA_HUB="هاب داده";
    static TABVIEW_REPORT_CHART_PANEL_NAME="گزارش نموداری";
    static TABVIEW_Alerts_System="آلارم های سیستم";
    static SPEED_NOTIF_FAST=1000
    static SPEED_NOTIF_Mid=2000
    static SPEED_NOTIF_SLOW=4000
    // static postalPattern = '\\b(?!(\\d)\\1{3})[13-9]{4}[1346-9][013-9]{5}\\b';
    // static phonNumPattern = '^[0][0-9][0-9]([0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]*$)';
    // static mobNumPattern = '^((\\+98-?)|0)?[9][0-9]{9}$';
    // static farsiNameMaxLength = 25;
    // static farsiFamilyMaxLength = 25;
    // static farsiSegmentMaxLength = 50;
    // static EnSegmentMaxLength = 50;
    // static maxAmountMaxLength=21
    // static minAmountMaxLength=21
    // static maxPostalcode=10;
    // static maxPhonNumber=11;
    // static maxLicenseNumber=25;
    // static maxToken=26;
    // static nationalCodeLength = 10;
    // static shenaseMelliLength = 11;
    // static mobileLength = 11;
    // static cardNoLength = 16;
    // static yearRangeNormal = '1300:1410';
    // static optionValueNormal = 'code';
    // static optionLabelNormal = 'name';
    // static commercialproductId = 1300;
    // static commercialproductId2=1100;
    // static commercialproductId3=1200;
    // static LTRDirectionForForDiv = 'ltr';
    // static RTLDirectionForForDiv = 'rtl';
    // static APPDirection = 'rtl';
    // static IsFontIran = false;
    // static AppFontClass: string = 'isFontIran';
    // static AppWrapperInitializer: boolean = true;
    //
    //
    // constructor() {
    //     // Constants.notifiSuccess =this.translateService.instant('label.http.status.200');
    //
    // }
    static amountOrPercentage = [
        {id: 1, name: 'مبلغ ثابت'},
        {id: 2, name: 'درصد'},
    ];
    static amount = [
        {id: 1, name: 'مبلغ ثابت'},

    ];
    static billingStatus = [
        {id: 1, name: 'ثبت موقت'},
        {id: 2, name: 'ثبت نهائی'},
        {id: 2, name: 'پرداخت شد'},
    ];
    static wageTypeList = [
        {id: '1', name: 'تعدادی ساده'},
        {id: '2', name: 'تعدادی پلکانی'},
        {id: '3', name: 'مبلغی ساده'},
        {id: '4', name: 'مبلغی پلکانی'},
    ];
    static categoryListOptions = [
        {id: null,name: '-'},
        {id: '1', name: 'براساس سازمان'},
        {id: '2', name: 'براساس کلاینت'},
    ];
    static notifiSuccess = 'عملیات با موفقیت انجام شد';
    static licenseInfoList = [
        {'name': '-', 'code': null},
        {'name': 'جوازکسب', 'code': 1},
        {'name': 'جوازتاسیس', 'code': 2},
        {'name': 'جوازآموزشی', 'code': 3},
        {'name': 'پروانه تاسیس', 'code': 4},
        {'name': 'مجوز بسته بندی,توزیع,پخش و تولید', 'code': 5},
    ];
    static DBEngineOption = [
        {'name': '-', 'code': null},
        {'name': 'MSSQL', 'code': '1'},
        {'name': 'Oracle', 'code': '2'},
        {'name': 'PostgreSQL', 'code': '3'},
        {'name': 'MySQL', 'code': '4'},
    ];
    static Protocol = [
        {'name': '-', 'code': null},
        {'name': 'TCP', 'code': '1'},

    ];
    static typeChart = [
        {'name': '-', 'code': null},
        {'name': 'حداکثر تاخیر', 'code': '1'},
        {'name': 'میانگین ثانیه تاخیر', 'code': '2'},


    ];
    static sorttype = [
        {'name': 'بیشترین تاخیر پاسخ‌دهی', 'code': '1'},
        {'name': 'کمترین تاخیر پاسخ‌دهی', 'code': '0'},


    ];
    static testParamTypeOptions = [
        {'name': 'Input Parameter', 'code': '0'},
        {'name': 'Output Parameter', 'code': '1'},
        {'name': 'Oracle Cursor', 'code': '2'},
        {'name': 'Output Parameter and set as ResultSet', 'code': '3'},
    ];
    static paramTypeOptions = [
        {'name': 'Output Parameter', 'code': '1'},
        {'name': 'Oracle Cursor', 'code': '2'},
        {'name': 'Output Parameter and set as ResultSet', 'code': '3'},
    ];
    static dataTypeSpOptions = [
        {'name': '-', 'code': null},
        {'name': 'string', 'code': '0'},
        {'name': 'numeric', 'code': '1'},
    ];
    static dataTypeOptions = [
        {'name': 'string', 'code': '0'},
        {'name': 'numeric', 'code': '1'},
    ];
    static actionTypeOption = [
        {'name': 'Ok', 'code': '0'},
        {'name': 'Dont Care', 'code': '1'},
    ];
    static commandType = [
        {'name': 'SQL Text', 'code': '1'},
        {'name': 'Execute Procedure', 'code': '2'},
        {'name': 'Custom Query', 'code': '3'},
    ];
    static customerTypes = [
        {name: 'حقیقی', code: '1'},
        {name: 'حقوقی', code: '2'},
    ];
    static citizenshipTypes = [
        {name: 'ایرانی', code: '1'},
        {name: 'غیرایرانی', code: '2'},
    ];
    static genderTypes = [
        {name: '-', code: null},
        {name: 'مرد', code: '1'},
        {name: 'زن', code: '2'},
    ];
    static countryList = [
        {name: '-', code: null},
        {name: 'ایران', code: '1'},
        // {name: 'انگلیس', code: '2'},
        // {name: 'عربستان', code: '3'},
    ];
    static provinceList = [
        {name: '-', code: null},
        {name: 'تهران', code: '1', countryCode: '1'},
        {name: 'اصفهان', code:'2', countryCode: '1'},
        {name: 'فارس', code: '3', countryCode: '1'},
        {name: 'خراسان رضوی', code: '4', countryCode: '1'},
        {name: 'قم', code: '5', countryCode: '1'},
        {name: 'کرمان', code: '6', countryCode: '1'},
    ];
    static cityList = [
        {name: '-', code: null},
        {name: 'تهران', code: '1', provinceCode: '1'},
        {name: 'قم', code: '2', provinceCode: '5'},
        {name: 'اصفهان', code: '3', provinceCode: '2'},
        {name: 'شیراز', code: '4', provinceCode: '3'},
        {name: 'مشهد', code: '5', provinceCode: '4'},
        {name: 'کرمان', code: '6' , provinceCode: '6'},
        {name: 'سیرجان', code: '7', provinceCode: '6'},
        {name: 'رفسنجان', code: '8', provinceCode: '6'},
        {name: 'جیرفت', code: '9', provinceCode: '6'},
        {name: 'بم', code: '10', provinceCode: '6'},
    ];
    static residenceTypes = [
        {name: '-', code: null},
        {name: 'مقیم', code: '1'},
        {name: 'غیرمقیم', code: '2'},
    ];
    static howResidence = [
        {name: '-', code: null},
        {name: 'دائم', code: '1'},
        {name: 'موقت', code: '2'},
    ];
    static terminalTypesList = [
        {code: null, name: '-'},
        {code: '1', name: 'پایانه فروش متصل به خط تلفن'},
        {code: '2', name: 'پایانه متصل به خط شبکه'},
        {code: '3', name: 'پایانه متصل به صندوق فروشگاهی'},
        {code: '4', name: 'پایانه فروش سیار'},
        {code: '5', name: 'درگاه پرداخت اینترنتی'},

    ];
    static organizationList = [
        {code: null, name: '-'},
        {code: 1, name: 'بانک رسالت'},
        {code: 2, name: 'سازمان توانیر'},
        {code: 3, name: 'وزارت بهداشت،درمان و آموزش پزشکی'},
        {code: 4, name: 'وزارت صنعت، معدن وتجارت'},
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
    static accountTypes = new Map([['cash','نقدی'],['bonus','بن'],['loan','تسهیلات'],
        ['trust','نسیه'],['score','امتیاز'], ['credit','اعتبار']])


    constructor() {
        // Constants.notifiSuccess =this.translateService.instant('label.http.status.200');

    }
}
