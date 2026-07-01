/**
 * Default navigation tree. It is intentionally multi-level (up to 3 deep)
 * and includes a very long label to demonstrate truncation + tooltip in the
 * sidebar. In later phases the per-user menu service filters/reorders this
 * by role and pinned items.
 */
// ===== GATEWAY MENU =====
export const APP_MENU = [
    // صفحه اصلی
    {
        id: 'home',
        labelKey: 'gw.home',
        icon: 'pi pi-home',
        route: '/main/home',
    },
    // اطلاعات پایه
    {
        id: 'base-info',
        labelKey: 'gw.baseInfo',
        icon: 'pi pi-file',
        children: [
            { id: 'messages', labelKey: 'gw.messages', icon: 'pi pi-envelope', route: '/main/messages-management' },
            { id: 'rules', labelKey: 'gw.rules', icon: 'pi pi-list', route: '/main/rules' },
        ],
    },
    // پیکربندی
    {
        id: 'config',
        labelKey: 'gw.config',
        icon: 'pi pi-cog',
        children: [
            { id: 'data-hub', labelKey: 'gw.dataHub', icon: 'pi pi-sitemap', route: '/main/data-hub' },
            { id: 'recipients-alert', labelKey: 'gw.recipientsAlert', icon: 'pi pi-bell', route: '/main/recipients-alert' },
            { id: 'alert-category', labelKey: 'gw.alertCategory', icon: 'pi pi-tag', route: '/main/alert-category' },
            { id: 'alert-access-level', labelKey: 'gw.alertAccessLevel', icon: 'pi pi-users', route: '/main/alert-access-level' },
        ],
    },
    // سرویس گیرندگان
    {
        id: 'clients-group',
        labelKey: 'gw.clients',
        icon: 'pi pi-users',
        children: [
            { id: 'party', labelKey: 'gw.party', icon: 'pi pi-user', route: '/main/party' },
            { id: 'module-base', labelKey: 'gw.moduleBase', icon: 'pi pi-sitemap', route: '/main/moduleBase' },
        ],
    },
    // آلارم ها
    {
        id: 'alert-management',
        labelKey: 'gw.alertManagement',
        icon: 'pi pi-exclamation-triangle',
        route: '/main/alert-management',
    },
    // کلاینت
    {
        id: 'client',
        labelKey: 'gw.client',
        icon: 'pi pi-building',
        route: '/main/client',
    },
    // کارمزد سرویس
    {
        id: 'wage-services',
        labelKey: 'gw.wageServices',
        icon: 'pi pi-credit-card',
        route: '/main/wage-services',
    },
    // لیست دسترسی
    {
        id: 'access-list',
        labelKey: 'gw.accessList',
        icon: 'pi pi-lock',
        route: '/main/access-list',
    },
    // مدیاتور
    {
        id: 'mediator',
        labelKey: 'gw.mediator',
        icon: 'pi pi-share-alt',
        children: [
            { id: 'mediators-out', labelKey: 'gw.mediatorsOut', icon: 'pi pi-share-alt', route: '/main/mediators' },
            { id: 'mediators-xml', labelKey: 'gw.mediatorsXml', icon: 'pi pi-code', route: '/main/mediatorsXml' },
            { id: 'mediators-json', labelKey: 'gw.mediatorsJson', icon: 'pi pi-brackets', route: '/main/mediatorsJson' },
        ],
    },
    // گزارشات
    {
        id: 'reports',
        labelKey: 'gw.reports',
        icon: 'pi pi-chart-bar',
        children: [
            { id: 'log-reports', labelKey: 'gw.logReports', icon: 'pi pi-list', route: '/main/log-reports' },
            { id: 'call-services-report', labelKey: 'gw.callServicesReport', icon: 'pi pi-chart-line', route: '/main/call-services-report' },
            { id: 'chart-report', labelKey: 'gw.chartReport', icon: 'pi pi-chart-pie', route: '/main/chart-report' },
            { id: 'response-rate', labelKey: 'gw.responseRate', icon: 'pi pi-gauge', route: '/main/response-rate' },
        ],
    },
    // صورت حساب
    {
        id: 'invoice',
        labelKey: 'gw.invoice',
        icon: 'pi pi-dollar',
        children: [
            { id: 'factor', labelKey: 'gw.factor', icon: 'pi pi-file-text', route: '/main/factor' },
        ],
    },
    // api-store
    {
        id: 'api-store',
        labelKey: 'gw.apiStore',
        icon: 'pi pi-globe',
        children: [
            { id: 'bill-store', labelKey: 'gw.billStore', icon: 'pi pi-clipboard', route: '/main/bill-store' },
        ],
    },
    // درباره
    {
        id: 'about',
        labelKey: 'gw.about',
        icon: 'pi pi-info-circle',
        route: '/main/about',
    },
    // خروج
    {
        id: 'sign-out',
        labelKey: 'gw.signOut',
        icon: 'pi pi-sign-out',
        route: '/auth/login',
    },
];
/* ===== DEMO MENU (banking sample — commented, restore if needed for mega-menu testing) =====
const APP_MENU_DEMO: MenuItem[] = [
  { id: 'demo1', labelKey: 'مدیریت ذینفعان', icon: 'pi pi-users', children: [
      { id: 'demo2', labelKey: 'اصلاح ذینفع شخصی', route: '/personal-entity-edit' },
      { id: 'demo3', labelKey: 'ذینفع سازمانی', route: '/organizational-entity-edit' },
      { id: 'demo4', labelKey: 'گزارشات', route: '/coming-soon' },
    ] },
  { id: 'demo5', labelKey: 'مدیریت حساب', icon: 'pi pi-wallet', children: [
      { id: 'demo6', labelKey: 'لیست حسابها', children: [
          { id: 'demo7', labelKey: 'حسابهای ریالی شما', route: '/yourRialAccounts' },
          { id: 'demo8', labelKey: 'حسابهای ریالی براساس بانک', route: '/rialAccountByBank' },
          { id: 'demo9', labelKey: 'حسابهای ارزی شما', route: '/yourCurrencyAccounts' },
          { id: 'demo10', labelKey: 'گردش ریز انتقال وجوه', route: '/gardeshRizEnteghalVojooh' },
          { id: 'demo11', labelKey: 'دریافت فایل صورتحسابها', route: '/daryaftFileSooratHesab' },
          { id: 'demo12', labelKey: 'گزارش منابع سپرده', route: '/depositSourcesReport' },
        ] },
      { id: 'demo13', labelKey: 'حواله بانکی', children: [
          { id: 'demo14', labelKey: 'ثبت حواله های بانکی', route: '/internetRemittanceRegistration' },
          { id: 'demo15', labelKey: 'کارتابل حواله های بانکی', route: '/internetRemittanceCartable' },
          { id: 'demo16', labelKey: 'گزارش حواله های بانکی', route: '/reportBankTransfer' },
        ] },
      { id: 'demo17', labelKey: 'تگ گذاری تراکنش ها', route: '/identificationTransaction' },
      { id: 'demo18', labelKey: 'صورت حساب', children: [
          { id: 'demo19', labelKey: 'صورت حساب شرکت ها', route: '/oldBill' },
          { id: 'demo20', labelKey: 'صورت حساب هلدینگ', route: '/holdingsBill' },
        ] },
      { id: 'demo21', labelKey: 'ریز صورتحساب ذینفعان', route: '/bills' },
    ] },
  { id: 'demo22', labelKey: 'مدیریت پرداخت', icon: 'pi pi-credit-card', children: [
      { id: 'demo23', labelKey: 'مدیریت حواله ساتنا', children: [
          { id: 'demo24', labelKey: 'ثبت حواله ساتنا (مالی)', route: '/santaRegisterTransfer' },
          { id: 'demo25', labelKey: 'ثبت حواله ساتنا', route: '/satnaRemittanceRegistration' },
          { id: 'demo26', labelKey: 'کارتابل حواله ساتنا', route: '/cardBoardSatna' },
          { id: 'demo27', labelKey: 'گزارش حواله ساتنا', route: '/coming-soon' },
        ] },
      { id: 'demo28', labelKey: 'مدیریت حواله پایا', children: [
          { id: 'demo29', labelKey: 'ثبت حواله پایا (مالی)', route: '/registerPayaTransfer' },
          { id: 'demo30', labelKey: 'ثبت حواله پایا', route: '/coming-soon' },
          { id: 'demo31', labelKey: 'کارتابل حواله پایا', route: '/cardBoardPaya' },
          { id: 'demo32', labelKey: 'ثبت حواله پایا منظم', route: '/regularPayaRegisterTransfer' },
          { id: 'demo33', labelKey: 'ثبت حواله پایا منظم ۲', route: '/payaRegularRemittanceRegistration' },
          { id: 'demo34', labelKey: 'کارتابل حواله پایا منطم', route: '/payaRegularRemittanceCartable' },
          { id: 'demo35', labelKey: 'ثبت حواله پایا گروهی', route: '/payaGroupRemittanceUploadFile' },
          { id: 'demo36', labelKey: 'ثبت حواله پایا تک مرحله ای', route: '/payaTakTransfer' },
          { id: 'demo37', labelKey: 'کارتابل حواله پایا گروهی', route: '/payaGroupRemittanceCartable' },
          { id: 'demo38', labelKey: 'گزارش حواله پایا', route: '/reliableRemittanceReport' },
          { id: 'demo39', labelKey: 'گزارش حواله های گروهی', route: '/reportGroupRemittance' },
          { id: 'demo40', labelKey: 'گزارش وضعیت حواله های بانک پرداخت', route: '/reportPayaBank' },
        ] },
      { id: 'demo41', labelKey: 'مدیریت قبوض', children: [
          { id: 'demo42', labelKey: 'پرداخت قبوض', route: '/banckPayaGhabz' },
          { id: 'demo43', labelKey: 'کارتابل پرداخت قبوض', route: '/cardBoardGhoboz' },
          { id: 'demo44', labelKey: 'پرداخت گروهی قبوض', route: '/bankpayaCharge' },
          { id: 'demo45', labelKey: 'گزارش پرداخت قبوض', route: '/reportGhabz' },
        ] },
      { id: 'demo46', labelKey: 'مدیریت واریز ویژه', children: [
          { id: 'demo47', labelKey: 'بارگذاری فایل', route: '/ghobozUploadFile' },
          { id: 'demo48', labelKey: 'ثبت اطلاعات', route: '/submitInformationVariz' },
          { id: 'demo49', labelKey: 'مشاهده و ویرایش اطلاعات', route: '/viewEditInformationDepositManagement' },
          { id: 'demo50', labelKey: 'گزارش فایل های بارگذاری شده', route: '/reportUploadedFiles' },
        ] },
      { id: 'demo51', labelKey: 'مدیریت پرداخت ویژه', children: [
          { id: 'demo52', labelKey: 'بارگذاری فایل', route: '/uploadPaymentManagementFile' },
          { id: 'demo53', labelKey: 'ثبت اطلاعات', route: '/submitInformationPymentMnagement' },
          { id: 'demo54', labelKey: 'مشاهده و ویرایش اطلاعات', route: '/viewEditInformationPaymentManagement' },
          { id: 'demo55', labelKey: 'کارتابل پرداخت ویژه', route: '/specialPaymentCartable' },
          { id: 'demo56', labelKey: 'گزارش فایل های بارگذاری شده', route: '/reportUploadedFilesPaymentManagment' },
          { id: 'demo57', labelKey: 'گزارش صورتحساب', route: '/billingReport' },
          { id: 'demo58', labelKey: 'گزارش کارمزدهای دریافت شده', route: '/reportFeePaymentManagment' },
        ] },
      { id: 'demo59', labelKey: 'شارژ', children: [
          { id: 'demo60', labelKey: 'ثبت دستور بانک پرداخت شارژ سیم کارت', route: '/bankpayaCharge' },
        ] },
      { id: 'demo61', labelKey: 'مدیریت شناسه', children: [
          { id: 'demo62', labelKey: 'جستجو کد تراکنش یکتا', route: '/searchYekta' },
          { id: 'demo63', labelKey: 'لیست کد تراکنش یکتا', route: '/yektaList' },
          { id: 'demo64', labelKey: 'تولید کد یکتا', route: '/createYekta' },
        ] },
      { id: 'demo65', labelKey: 'گزارشات', children: [
          { id: 'demo66', labelKey: 'گزارش واریز', route: '/reportYektaVarriz' },
        ] },
    ] },
  { id: 'demo67', labelKey: 'مدیریت تسهیلات', icon: 'pi pi-percentage', children: [
      { id: 'demo68', labelKey: 'تسهیلات سازمان', children: [
          { id: 'demo69', labelKey: 'بازپرداخت اقساط', route: '/PardakhtAghsat' },
          { id: 'demo70', labelKey: 'مشاهده مانده بدهی', route: '/coming-soon' },
          { id: 'demo71', labelKey: 'صورتحساب تسهیلات', route: '/tashilatList' },
          { id: 'demo72', labelKey: 'گزارشات تعهدات غیر مستقیم', route: '/indirectLiabilitiesReports' },
        ] },
      { id: 'demo73', labelKey: 'تسهیلات کارکنان', children: [
          { id: 'demo74', labelKey: 'صورتحساب تسهیلات کارکنان', route: '/sorathesabTashilatKarkonan' },
        ] },
      { id: 'demo75', labelKey: 'مدیریت اعتبار', children: [] },
      { id: 'demo76', labelKey: 'نمودار تسهیلات دریافتی', route: '/chartOfFacilitiesReceived' },
    ] },
  { id: 'demo77', labelKey: 'مدیریت اوراق بهادار', icon: 'pi pi-file', children: [
      { id: 'demo78', labelKey: 'چک عادی / صیاد', children: [
          { id: 'demo79', labelKey: 'صدور چک', route: '/coming-soon' },
          { id: 'demo80', labelKey: 'چاپ چک', route: '/coming-soon' },
          { id: 'demo81', labelKey: 'اطلاعات چک های صادره', route: '/coming-soon' },
          { id: 'demo82', labelKey: 'استعلام وضعیت چک', route: '/inquiryCheck' },
          { id: 'demo83', labelKey: 'گزارش برداشت چک', route: '/reportCheckBardasht' },
          { id: 'demo84', labelKey: 'تاییدیه الکترونیکی چک', route: '/submitCheck' },
        ] },
      { id: 'demo85', labelKey: 'چکاوک', children: [
          { id: 'demo86', labelKey: 'واگذاری چک', route: '/coming-soon' },
          { id: 'demo87', labelKey: 'اسکن تصویر چک', route: '/coming-soon' },
          { id: 'demo88', labelKey: 'ارسال به چکاوک', route: '/coming-soon' },
          { id: 'demo89', labelKey: 'اطلاعات واگذاری اسناد', route: '/coming-soon' },
          { id: 'demo90', labelKey: 'گزارش تجمیعی واگذاری اسناد کلر', route: '/coming-soon' },
        ] },
      { id: 'demo91', labelKey: 'کلرینگ', children: [
          { id: 'demo92', labelKey: 'اسناد واگذاری', route: '/submitClear' },
          { id: 'demo93', labelKey: 'گزارش اسناد واگذاری', route: '/reportClear' },
        ] },
      { id: 'demo94', labelKey: 'گواهی سپرده', children: [
          { id: 'demo95', labelKey: 'لیست گواهی سپرده', route: '/coming-soon' },
        ] },
      { id: 'demo96', labelKey: 'اوراق مشارکت', children: [
          { id: 'demo97', labelKey: 'لیست اوراق مشارکت', route: '/coming-soon' },
        ] },
      { id: 'demo98', labelKey: 'گزارشات', children: [] },
    ] },
  { id: 'demo99', labelKey: 'مدیریت کارت و کیف پول', icon: 'pi pi-id-card', children: [
      { id: 'demo100', labelKey: 'کیف پول', children: [
          { id: 'demo101', labelKey: 'تعریف کیف پول کارکنان', route: '/creatWallet' },
          { id: 'demo102', labelKey: 'شارژ کیف پول', route: '/chargAmountWallet' },
          { id: 'demo103', labelKey: 'شارژ گروهی کیف پول', route: '/coming-soon' },
          { id: 'demo104', labelKey: 'انسداد کیف پول', route: '/ensedadWallet' },
        ] },
      { id: 'demo105', labelKey: 'بن کارت', children: [
          { id: 'demo106', labelKey: 'صدور بن کارت', route: '/registerBonCard' },
          { id: 'demo107', labelKey: 'انسداد بن کارت', route: '/ensedadBonCard' },
          { id: 'demo108', labelKey: 'رفع انسداد بن کارت', route: '/rafeEnsedadBonCard' },
        ] },
      { id: 'demo109', labelKey: 'هدیه کارت', children: [
          { id: 'demo110', labelKey: 'صدور هدیه کارت بانام/ بی نام', route: '/coming-soon' },
          { id: 'demo111', labelKey: 'انسداد هدیه کارت', route: '/coming-soon' },
          { id: 'demo112', labelKey: 'رفع انسداد هدیه کارت', route: '/coming-soon' },
          { id: 'demo113', labelKey: 'شارژ هدیه کارت', route: '/coming-soon' },
          { id: 'demo114', labelKey: 'شارژ گروهی هدیه کارت', route: '/coming-soon' },
          { id: 'demo115', labelKey: 'ابطال گروهي هديه کارتهاي خام منقضي شده', route: '/coming-soon' },
        ] },
      { id: 'demo116', labelKey: 'کارت مجازی', children: [
          { id: 'demo117', labelKey: 'درخواست صدور کارت مجازی', route: '/coming-soon' },
        ] },
      { id: 'demo118', labelKey: 'گزارشات', children: [
          { id: 'demo119', labelKey: 'وضعیت کیف پول', route: '/reportStatusWallet' },
          { id: 'demo120', labelKey: 'اطلاعات تراکنش بن کارت', route: '/BillingBonCard' },
          { id: 'demo121', labelKey: 'اطلاعات بن کارت های صادره', route: '/coming-soon' },
          { id: 'demo122', labelKey: 'اطلاعات تراکنس کارت ها', route: '/coming-soon' },
          { id: 'demo123', labelKey: 'اطلاعات شارژ کیف پول به تفکیک واحد های تابعه', route: '/walletTransaction' },
        ] },
    ] },
  { id: 'demo124', labelKey: 'مدیریت مالی و حسابداری', icon: 'pi pi-chart-line', children: [
      { id: 'demo125', labelKey: 'اسناد مالی متناظر با تراکنش‌های بانکی', route: '/accountTransactions' },
      { id: 'demo126', labelKey: 'اطلاعات واریز های تجمیعی', route: '/coming-soon' },
      { id: 'demo127', labelKey: 'اطلاعات برداشت های تجمیعی', route: '/coming-soon' },
      { id: 'demo128', labelKey: 'اطلاعات واریز های ذینفعان', route: '/coming-soon' },
      { id: 'demo129', labelKey: 'تعریف سرفصل های مالی', route: '/accountTree' },
      { id: 'demo130', labelKey: 'قالب اسناد مالی', route: '/coming-soon' },
      { id: 'demo131', labelKey: 'گزارشات', children: [] },
    ] },
  { id: 'demo132', labelKey: 'تنظیمات', icon: 'pi pi-cog', children: [
      { id: 'demo133', labelKey: 'بروزرسانی ها', children: [
          { id: 'demo134', labelKey: 'به روزرسانی اطلاعات ذینفعان', route: '/coming-soon' },
          { id: 'demo135', labelKey: 'به روزرسانی اطلاعات حساب‌ها', route: '/coming-soon' },
          { id: 'demo136', labelKey: 'به روزرسانی اطلاعات پرداخت‌ها', route: '/coming-soon' },
          { id: 'demo137', labelKey: 'به روزرسانی اطلاعات تراکنش ها', route: '/coming-soon' },
          { id: 'demo138', labelKey: 'به روزسانی اطلاعات اوراق بهادار', route: '/coming-soon' },
          { id: 'demo139', labelKey: 'به روزسانی اطلاعات کارت و کیف پول', route: '/coming-soon' },
          { id: 'demo140', labelKey: 'به روزسانی اطلاعات مالی و حسابداری', route: '/coming-soon' },
        ] },
      { id: 'demo141', labelKey: 'مدیریت پیامک', children: [
          { id: 'demo142', labelKey: 'ارسال پیامک', route: '/coming-soon' },
          { id: 'demo143', labelKey: 'ارسال پیامک گروهی', route: '/coming-soon' },
        ] },
      { id: 'demo144', labelKey: 'مدیریت پیکره بندی', children: [
          { id: 'demo145', labelKey: 'کارتابل', route: '/cardBoard' },
        ] },
      { id: 'demo146', labelKey: 'مدیریت کاربران', children: [
          { id: 'demo147', labelKey: 'اصلاح مشخصات کاربری', route: '/coming-soon' },
          { id: 'demo148', labelKey: 'تعریف نقش کاربری', route: '/coming-soon' },
        ] },
    ] },
];
===== end demo menu ===== */
/**
 * ============================ SITE (PUBLIC) MENU ============================
 *
 * By default the public "site" navigation is DERIVED from APP_MENU so both the
 * sidebar and the site share a single source of truth (change one, both update).
 * `siteMenuFromAppMenu()` flattens APP_MENU to its top-level navigable items
 * (skips separators, section headers, action-only items, and deep children).
 *
 * If you want the site to have its OWN, independent menu, set
 * USE_SEPARATE_SITE_MENU = true and edit SITE_MENU below. The two then diverge.
 */
/** Toggle: when true, the site uses SITE_MENU instead of deriving from APP_MENU. */
export const USE_SEPARATE_SITE_MENU = false;
/** Independent site menu — only used when USE_SEPARATE_SITE_MENU is true. */
export const SITE_MENU = [
    { id: 'site-home', labelKey: 'site.nav.home', route: '/site' },
    { id: 'site-features', labelKey: 'site.nav.features', route: '/site', fragment: 'features' },
    { id: 'site-pricing', labelKey: 'site.nav.pricing', route: '/site', fragment: 'pricing' },
    { id: 'site-about', labelKey: 'site.nav.about', route: '/site', fragment: 'about' },
    { id: 'site-contact', labelKey: 'site.nav.contact', route: '/site', fragment: 'contact' },
];
/** Flatten APP_MENU to top-level navigable items for the horizontal site nav. */
export function siteMenuFromAppMenu() {
    const out = [];
    for (const item of APP_MENU) {
        if (item.separator || item.action)
            continue; // skip headers + action-only
        // a top-level item is navigable if it has a route/href, OR has children with routes
        if (item.route || item.href) {
            out.push(item);
        }
        else if (item.children?.length) {
            // use the first child's route as the group's landing target
            const firstRouted = findFirstRoute(item);
            if (firstRouted)
                out.push({ ...item, route: firstRouted });
        }
    }
    return out;
}
function findFirstRoute(item) {
    if (item.route)
        return item.route;
    for (const c of item.children ?? []) {
        const r = findFirstRoute(c);
        if (r)
            return r;
    }
    return undefined;
}
/** The menu the site nav should render, honoring the toggle. */
export function resolveSiteMenu() {
    return USE_SEPARATE_SITE_MENU ? SITE_MENU : siteMenuFromAppMenu();
}
/** Full menu tree for the site MEGA menu (keeps all nesting; skips separators
 *  and action-only items). Honors the separate-site-menu toggle. */
export function resolveSiteMegaMenu() {
    if (USE_SEPARATE_SITE_MENU)
        return SITE_MENU;
    return APP_MENU.filter((i) => !i.separator && !i.action);
}
