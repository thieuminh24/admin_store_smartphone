"use client"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { Dashboard } from "@/components/dashboard"
import { ProductManagement } from "@/components/product-management"
import { OrderManagement } from "@/components/order-management"
import { Statistics } from "@/components/statistics"

export default function AdminApp() {
  const [activeTab, setActiveTab] = useState("dashboard")

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <Dashboard />
      case "products":
        return <ProductManagement />
      case "orders":
        return <OrderManagement />
      case "statistics":
        return <Statistics />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="flex-1 overflow-auto">{renderContent()}</main>
    </div>
  )
}
