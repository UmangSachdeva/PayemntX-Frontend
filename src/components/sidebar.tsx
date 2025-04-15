import { Button } from "@heroui/button";
import { Divider } from "@heroui/divider";
import { Icon } from "@iconify/react";
import React from "react";

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const menuItems = [
    { icon: "lucide:home", label: "Dashboard" },
    { icon: "lucide:users", label: "Team" },
    { icon: "lucide:folder", label: "Projects" },
    { icon: "lucide:calendar", label: "Calendar" },
    { icon: "lucide:settings", label: "Settings" },
  ];

  const recentTransactions = [
    { id: 1, description: "Grocery Store", amount: -125.5, type: "expense" },
    { id: 2, description: "Salary Deposit", amount: 3200.0, type: "income" },
    { id: 3, description: "Electric Bill", amount: -180.25, type: "expense" },
  ];

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
      <nav className={`flex flex-col gap-2 ${isOpen ? "" : "items-center"}`}>
        {menuItems.map((item) => (
          <Button
            key={item.label}
            variant="light"
            className={`justify-start ${!isOpen && "justify-center"} hover:bg-primaryDark hover:shadow-lg 
  transition-all duration-300`}
            startContent={
              <Icon icon={item.icon} className="text-xl text-primary" />
            }
          >
            {isOpen && <span>{item.label}</span>}
          </Button>
        ))}
      </nav>
      <Divider className="my-4 mr-4" />

      <div className="space-y-3">
        <h3
          className={`text-sm font-semibold flex items-center gap-2 ${!isOpen && "justify-center"}`}
        >
          <Icon icon="lucide:clock" className="text-default-500" />
          {isOpen && "Recent Transactions"}
        </h3>

        {recentTransactions.map((transaction) => (
          <div
            key={transaction.id}
            className={`
              flex items-center gap-2
              text-sm p-2 rounded-lg 
              hover:bg-default-100 
              transition-colors
              ${!isOpen && "justify-center"}
            `}
            title={
              !isOpen
                ? `${transaction.description}: ${transaction.type === "income" ? "+" : "-"}$${Math.abs(transaction.amount).toFixed(2)}`
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
                <span className="flex-1 truncate">
                  {transaction.description}
                </span>
                <span
                  className={`font-medium ${
                    transaction.type === "income"
                      ? "text-success-500"
                      : "text-danger-500"
                  }`}
                >
                  {transaction.type === "income" ? "+" : "-"}$
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
