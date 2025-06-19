"use client"

import { BarChart3, Package, ShoppingCart, Home, Phone } from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "products", label: "Quản lý sản phẩm", icon: Package },
    { id: "orders", label: "Quản lý đơn hàng", icon: ShoppingCart },
    { id: "statistics", label: "Thống kê", icon: BarChart3 },
  ]

  return (
    <div className="w-64 bg-white shadow-lg">
      <div className="p-6 border-b">
        <div className="flex items-center gap-2">
          <Phone className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800">Phone Store Admin</h1>
        </div>
      </div>
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-gray-50 transition-colors",
                activeTab === item.id && "bg-blue-50 text-blue-600 border-r-2 border-blue-600",
              )}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
