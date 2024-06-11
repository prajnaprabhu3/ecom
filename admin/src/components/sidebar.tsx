import { ArrowSwapHorizontal, Element3, Profile2User, ReceiptDiscount, ShoppingBag,Tag } from "iconsax-react";
import {
  LayoutDashboard,
  ShoppingCart,
  ArrowRightLeft,
  Users,
  LineChart,
  PieChart,
  BarChart4,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationLinks = [
  {
    label: "Dashboard",
    icon: <Element3 size="16" />,
    url: "/admin/dashboard",
  },
  {
    label: "Product",
    icon: <ShoppingBag size="16"/>,
    url: "/admin/products",
  },
  {
    label: "Customer",
    icon: <Profile2User size="16" />,
    url: "/admin/customers",
  },
  {
    label: "Transaction",
    icon: <ArrowSwapHorizontal size="16"/>,
    url: "/admin/transactions",
  },
  {
    label: "Bar",
    icon: <BarChart4 size={15} />,
    url: "/admin/bar",
  },
  {
    label: "Pie",
    icon: <PieChart size={15} />,
    url: "/admin/pie",
  },
  {
    label: "Line",
    icon: <LineChart size={15} />,
    url: "/admin/line",
  },
  {
    label: "Coupon",
    icon:<ReceiptDiscount size="16" />,
    url: "/admin/coupon",
  },
];

const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <aside className="w-1/6 h-screen flex sticky top-0 flex-col gap-10 border-r p-4">
      <h4 className="p-2 px-4">Logo.</h4>

      <div className="flex flex-col gap-3 text-gray-500 px-3">
        {navigationLinks.map((item) => (
          <Link
            to={item.url}
            className={`flex items-center gap-2 p-2 rounded hover:px-4 duration-300 ${
              location.pathname.includes(item.url)
                ? "text-blue-500"
                : ""
            }`}
           >
       

            <p> {item.icon}</p>
            <p className="text-sm">{item.label}</p>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
