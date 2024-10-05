export const BASE = "";
export const ICONS_DIR = "/icons";

export type Menu = {
    name: string;
    link: string;
    icon: string;
    iconActive: string;
    isPath?: boolean;
    submenu?: Menu[];
    status?: boolean;
};

export const APP_MODULES: Menu[] = [
    {
        name: "Dashboard",
        link: "/dashboard",
        icon: "/assets/images/dashboard.svg",
        isPath: false,
        iconActive: "/assets/images/dashboard.svg",
        submenu: [
            {
                name: "Analisis",
                link: "/dashboard/analysis",
                icon: "",
                iconActive: "/assets/images/faq.svg",
                status: false,
            },
            {
                name: "Rangkuman Pembayaran",
                link: "/dashboard/recap",
                icon: "",
                iconActive: "/assets/images/faq.svg",
                status: false,
            },
            {
                name: "Performa Uker",
                link: "/dashboard/performance",
                icon: "",
                iconActive: "/assets/images/faq.svg",
                status: false,
            },
        ],
    },
    {
        name: "List Pengajuan",
        link: "/submission",
        icon: "/assets/images/submission.svg",
        isPath: true,
        iconActive: "/assets/images/submission-active.svg",
        submenu: [],
    },
    {
        name: "List Partner",
        link: "/partner",
        icon: "/assets/images/partner.svg",
        isPath: true,
        iconActive: "/assets/images/partner-active.svg",
        submenu: [],
    },
    {
        name: "List Access",
        link: "/access",
        icon: "/assets/images/access.svg",
        isPath: true,
        iconActive: "/assets/images/access-active.svg",
        submenu: [],
    },
    {
        name: "List Monitoring",
        link: "/monitoring",
        icon: "/assets/images/monitoring.svg",
        isPath: true,
        iconActive: "/assets/images/monitoring-active.svg",
        submenu: [],
    },
    {
        name: "List Aktifitas",
        link: "/activity",
        icon: "/assets/images/calender.svg",
        isPath: true,
        iconActive: "/assets/images/calender.svg",
        submenu: [],
    },
    {
        name: "Pengaturan",
        link: "/setting",
        icon: "/assets/images/settings.svg",
        isPath: false,
        iconActive: "/assets/images/settings.svg",
        submenu: [
            {
                name: "FAQ",
                link: "/setting/faq",
                icon: "",
                iconActive: "",
                status: true,
            },
            {
                name: "Kategori FAQ",
                link: "/setting/category",
                icon: "",
                iconActive: "",
                status: true,
            },
        ],
    },
];
