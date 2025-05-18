import { useGetUserTransactions } from "@/api/queries/payment";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const [_, setPathname] = useState<string>(location.pathname);

  const { data: recentTransactions } = useGetUserTransactions({
    limit: 3,
  });

  const menuItems = [
    { icon: "lucide:home", label: "Dashboard", to: "/dashboard" },
    { icon: "hugeicons:bank", label: "Transactions", to: "/transactions" },
    { icon: "lucide:chart-line", label: "Analysis", to: "/analysis" },
    { icon: "lucide:calendar", label: "Calendar", to: "#" },
    { icon: "lucide:settings", label: "Settings", to: "#" },
  ];

  const isActive = (path: string) => {
    return location.pathname == path;
  };

  useEffect(() => {
    if (location.pathname) {
      setPathname(location.pathname);
    }
  }, [location.pathname]);

  return (
    <aside
      className={`
      ${isOpen ? "w-64" : "w-20"} 
      transition-all overflow-hidden duration-300 
      min-h-[calc(100vh-64px)] 
      border-r border-divider 
      bg-background
      p-4
    `}
    >
      <div className={`flex flex-col gap-2 ${isOpen ? "" : "items-center"}`}>
        {menuItems.map((item) => (
          // <Link
          //   key={item.label}
          //   className={`justify-start  ${!isOpen && "justify-center"}`}
          //   to={item?.to}
          // >
          <Button
            key={item.label}
            as={Link}
            className={`justify-start group ${!isOpen && "justify-center"} ${isActive(item.to) ? "bg-primary text-bg hover:bg-primaryDark hover:text-textSecondary" : ""} hover:shadow-lg 
  transition-all duration-300 w-full `}
            variant="light"
            startContent={
              <Icon
                icon={item.icon}
                className={`text-xl  ${isActive(item.to) ? "text-bg group-hover:text-textSecondary" : "text-primary "}`}
              />
            }
            to={item.to}
          >
            {isOpen && <span>{item.label}</span>}
          </Button>
          // </Link>
        ))}
      </div>
      <Divider className="my-4 mr-4" />

      <div className="space-y-3">
        <h3
          className={`text-sm font-semibold flex items-center gap-2 ${!isOpen && "justify-center"}`}
        >
          <Icon icon="lucide:clock" className="text-default-500" />
          {isOpen && "Recent Transactions"}
        </h3>

        {recentTransactions?.data?.map((transaction) => (
          <div
            key={transaction?.id}
            className={`
              flex items-center gap-2
              text-sm p-2 rounded-lg 
              hover:bg-default-100 
              transition-colors
              ${!isOpen && "justify-center"}
            `}
            title={
              !isOpen
                ? `${transaction?.details}: ${transaction?.type === "CREDIT" ? "+" : "-"}$${Math.abs(transaction.amount).toFixed(2)}`
                : undefined
            }
          >
            <Icon
              icon={
                transaction.type === "income"
                  ? "lucide:arrow-down-right"
                  : "lucide:arrow-up-right"
              }
              className={`
                ${transaction.type === "income" ? "text-success-500" : "text-danger-500"}
                ${!isOpen && "text-xl"}
              `}
            />
            {isOpen && (
              <>
                <span className="flex-1 truncate">{transaction.details}</span>
                <span
                  className={`font-medium ${
                    transaction.type === "income"
                      ? "text-success-500"
                      : "text-danger-500"
                  }`}
                >
                  {transaction.type === "CREDIT" ? "+" : "-"}$
                  {Math.abs(transaction.amount).toFixed(2)}
                </span>
              </>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}
