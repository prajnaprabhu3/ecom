import {
  LayoutDashboard,
  ShoppingCart,
  ArrowRightLeft,
  Users,
  LineChart,
  PieChart,
  BarChart4,
  Tag,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const navigationLinks = [
  {
    label: "Dashboard",
    icon: <LayoutDashboard size={15} />,
    url: "/admin/dashboard",
  },
  {
    label: "Product",
    icon: <ShoppingCart size={15} />,
    url: "/admin/products",
  },
  {
    label: "Customer",
    icon: <Users size={15} />,
    url: "/admin/customers",
  },
  {
    label: "Transaction",
    icon: <ArrowRightLeft size={15} />,
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
    icon: <Tag size={15} />,
    url: "/admin/coupon",
  },
];

const Sidebar = () => {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <aside className="w-1/5 h-screen flex sticky top-1 flex-col gap-10 border-r p-4">
      <h4>Logo.</h4>

      <div className="flex flex-col gap-3">
        {navigationLinks.map((item) => (
          <Link
            to={item.url}
            className={`flex items-center gap-2 p-2 rounded ${
              location.pathname.includes(item.url)
                ? "bg-[#f7f6fb] text-blue-500"
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
