import {
  CatalogIcon,
  CommunticationIcon,
  DashboardIcon,
  FaqsIcon,
  MarketingIcon,
  PrivacyPoliceIcon,
  SIPsIcon,
  SettingsIcon,
  TermConditionIcon,
  TransactionIcon,
  UserIcon,
} from "./Icon";

export const sideBarData = [
  {
    icon: <DashboardIcon />,
    tabs: "Dashboard",
    path: "/",
  },
  {
    icon: <CatalogIcon />,
    tabs: "Catalog",
    hasDropdown: true,
    subItems: [
      {
        tabs: "Category List",
        path: "/catalogs",
      },
      {
        tabs: "Add Category",
        path: "/catalogs/add-category",
      },
      {
        tabs: "Product List",
        path: "/catalogs/product-list",
      },
      {
        tabs: "Add Product",
        path: "catalogs/add-products",
      },
    ],
  },
  {
    icon: <UserIcon />,
    tabs: "Customers",
    hasDropdown: true,
    subItems: [
      {
        tabs: "Campaigns",
        path: "/customers/campaigns",
      },
      {
        tabs: "SEO",
        path: "/customers/seo",
      },
    ],
  },
  {
    icon: <SIPsIcon />,
    tabs: "Orders",
    hasDropdown: true,
    subItems: [
      {
        tabs: "Campaigns",
        path: "/orders/campaigns",
      },
      {
        tabs: "SEO",
        path: "/orders/seo",
      },
    ],
  },
  {
    icon: <MarketingIcon />,
    tabs: "Marketing",
    hasDropdown: true,
    subItems: [
      {
        tabs: "Campaigns",
        path: "/marketing/campaigns",
      },
      {
        tabs: "SEO",
        path: "/marketing/seo",
      },
    ],
  },
  {
    icon: <CommunticationIcon />,
    tabs: "Communications",
    hasDropdown: true,
    subItems: [
      {
        tabs: "Campaigns",
        path: "/catalog/campaigns",
      },
      {
        tabs: "SEO",
        path: "/catalog/seo",
      },
    ],
  },
  {
    icon: <TransactionIcon />,
    tabs: "Invoices",
    path: "/invoices",
  },
  {
    icon: <FaqsIcon />,
    tabs: "FAQs",
    path: "/faqs",
  },
  {
    icon: <PrivacyPoliceIcon />,
    tabs: "Privacy Policy",
    path: "/term-conditions",
  },
  {
    icon: <TermConditionIcon />,
    tabs: "Terms and Conditions",
    path: "/term-conditions",
  },
  {
    icon: <SettingsIcon />,
    tabs: "Settings",
    hasDropdown: true,
    subItems: [
      {
        tabs: "Profile",
        path: "/settings/profile",
      },
      {
        tabs: "Security",
        path: "/settings/security",
      },
    ],
  },
];

export const recentTranjections = [
  {
    name: "hisar",
    amount: "12",
  },
  {
    name: "hansi",
    amount: "8",
  },
  {
    name: "fatehabad",
    amount: "4",
  },
  {
    name: "Siwani",
    amount: "9",
  },
  {
    name: "Agroha",
    amount: "10",
  },
  {
    name: "barwala",
    amount: "18",
  },
];

export const tableData = [
  {
    id: 1,
    name: "John Leo",
    registration: "01-01-2023",
    cityState: "Hisar / Haryana",
    memberStatus: "Active",
    totalInvestment: "₹ 5000",
  },
  {
    id: 2,
    name: "John Leo",
    registration: "01-01-2023",
    cityState: "Hisar / Haryana",
    memberStatus: "Active",
    totalInvestment: "₹ 5000",
  },
  {
    id: 3,
    name: "John Leo",
    registration: "01-01-2023",
    cityState: "Hisar / Haryana",
    memberStatus: "Active",
    totalInvestment: "₹ 5000",
  },
  {
    id: 3,
    name: "John Leo",
    registration: "01-01-2023",
    cityState: "Hisar / Haryana",
    memberStatus: "Active",
    totalInvestment: "₹ 5000",
  },
  {
    id: 3,
    name: "John Leo",
    registration: "01-01-2023",
    cityState: "Hisar / Haryana",
    memberStatus: "Active",
    totalInvestment: "₹ 5000",
  },
];

export const addNewUserData = [
  {
    label: "First Name",
    placeholder: "Enter First Name",
    name: "first_name",
  },
  {
    label: "last Name",
    placeholder: "Enter last Name",
    name: "last_name",
  },
  {
    label: "e-mail",
    placeholder: "enter mail",
    name: "email",
  },
  {
    label: "phone number ",
    placeholder: "Enter phone number ",
    name: "phone_no",
  },
  {
    label: "city",
    placeholder: "Enter city",
    name: "city",
  },
  {
    label: "state",
    placeholder: "Enter state",
    name: "state",
  },
];

export const dashboardTeils = [
  {
    title: "total sells",
    earning: "₹ 50680.00",
    margin: "15.3% ",
  },
  {
    title: "Average Order Value",
    earning: "₹ 1234.20",
    margin: "15.3% ",
  },
  {
    title: "Total Orders",
    earning: "238",
    margin: "15.3% ",
  },
];

export const areaOptions = [
  { value: "DabraChowk", label: "Dabra Chowk" },
  { value: "ModelTown", label: "Model Town" },
  { value: "Sector14", label: "Sector 14" },
  { value: "CityCenter", label: "City Center" },
];
export const discountOptions = [
  { value: "Amount", label: "Amount" },
  { value: "Percentage", label: "Percentage" },
];
export const categoryOption = [
  { value: "Electronics", label: "Electronics" },
  { value: "ModelTown", label: "Model Town" },
  { value: "AnimalSuppliments", label: "Animal Suppliments" },
  { value: "Grocery", label: "Grocery" },
];
