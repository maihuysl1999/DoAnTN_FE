// component
import Iconify from "../../components/Iconify";

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
    {
        title: "network",
        path: "/networks",
        icon: getIcon("clarity:network-globe-line"),
    },
    {
        title: "Dapp",
        path: "/dapps",
        icon: getIcon("fa6-brands:app-store"),
    },
    // {
    //     title: "product",
    //     path: "/dashboard/products",
    //     icon: getIcon("eva:shopping-bag-fill"),
    // },
    // {
    //     title: "blog",
    //     path: "/dashboard/blog",
    //     icon: getIcon("eva:file-text-fill"),
    // },
    {
        title: "Settings",
        path: "/settings",
        icon: getIcon("carbon:settings"),
    },
    // {
    //     title: "register",
    //     path: "/register",
    //     icon: getIcon("eva:person-add-fill"),
    // },
    // {
    //     title: "Not found",
    //     path: "/404",
    //     icon: getIcon("eva:alert-triangle-fill"),
    // },
];

export default navConfig;
