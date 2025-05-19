import { useGetUserTransactions } from "@/api/queries/payment";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const location = useLocation();
  const [_, setPathname] = useState<string>(location.pathname);

  const { data: recentTransactions, isPending } = useGetUserTransactions({
    limit: 3,
  });

  const menuItems = [
    { icon: "lucide:home", label: "Dashboard", to: "/dashboard" },
    { icon: "hugeicons:bank", label: "Transactions", to: "/transactions" },
    { icon: "lucide:chart-line", label: "Analysis", to: "/analysis" },
    // { icon: "lucide:calendar", label: "Calendar", to: "#" },
    // { icon: "lucide:settings", label: "Settings", to: "#" },
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
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className={`
      ${isOpen ? "w-64" : "w-20"} 
      transition-all duration-300
      ease-in-out
      overflow-hidden
      min-h-[calc(100vh-64px)] 
      border-r border-divider 
      bg-background
      p-4
      transform
      ${isOpen ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0 md:opacity-100 md:translate-x-0"}
      ${
        // On mobile: absolute, hidden when closed, visible when open
        isOpen
          ? "fixed inset-y-0 left-0 z-50 top-16 md:static"
          : "hidden md:block md:relative"
      }
      `}
      style={{
        ...(isOpen && window.innerWidth < 768
          ? { boxShadow: "0 0 0 9999px rgba(0,0,0,0.2)" }
          : {}),
      }}
    >
      <div className={`flex flex-col gap-2 ${isOpen ? "" : "items-center"}`}>
        {menuItems.map((item) => (
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

        {isPending &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className={`
          flex items-center gap-2
          text-sm p-2 rounded-lg 
          animate-pulse bg-default-100
          ${!isOpen && "justify-center"}
          `}
            >
              <div
                className={`rounded-full bg-default-300 ${!isOpen ? "w-6 h-6" : "w-5 h-5"}`}
              />
              {isOpen && (
                <>
                  <div className="flex-1 h-4 bg-default-300 rounded" />
                  <div className="w-12 h-4 bg-default-300 rounded" />
                </>
              )}
            </div>
          ))}

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
    </motion.aside>
  );
}
