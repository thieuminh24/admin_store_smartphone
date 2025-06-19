"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, TrendingUp, Package, ShoppingCart } from "lucide-react"
import { DataStore } from "@/lib/data-store"

export function Statistics() {
  const dataStore = DataStore.getInstance()
  const products = dataStore.getProducts()
  const orders = dataStore.getOrders()

  // Thống kê theo thương hiệu
  const brandStats = products.reduce(
    (acc, product) => {
      acc[product.brand] = (acc[product.brand] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  // Thống kê doanh thu theo tháng
  const monthlyRevenue = orders.reduce(
    (acc, order) => {
      const month = new Date(order.createdAt).getMonth()
      acc[month] = (acc[month] || 0) + order.total
      return acc
    },
    {} as Record<number, number>,
  )

  // Sản phẩm bán chạy
  const productSales = orders
    .flatMap((order) => order.items)
    .reduce(
      (acc, item) => {
        acc[item.productName] = (acc[item.productName] || 0) + item.quantity
        return acc
      },
      {} as Record<string, number>,
    )

  const topProducts = Object.entries(productSales)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)

  const months = [
    "Tháng 1",
    "Tháng 2",
    "Tháng 3",
    "Tháng 4",
    "Tháng 5",
    "Tháng 6",
    "Tháng 7",
    "Tháng 8",
    "Tháng 9",
    "Tháng 10",
    "Tháng 11",
    "Tháng 12",
  ]

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Thống kê</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Thống kê theo thương hiệu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(brandStats).map(([brand, count]) => (
                <div key={brand} className="flex items-center justify-between">
                  <span className="font-medium">{brand}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(count / Math.max(...Object.values(brandStats))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Doanh thu theo tháng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(monthlyRevenue).map(([month, revenue]) => (
                <div key={month} className="flex items-center justify-between">
                  <span className="font-medium">{months[Number.parseInt(month)]}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${(revenue / Math.max(...Object.values(monthlyRevenue))) * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium">₫{revenue.toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top sản phẩm bán chạy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topProducts.map(([product, sales], index) => (
                <div key={product} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{product}</p>
                    <p className="text-sm text-gray-500">Đã bán: {sales} sản phẩm</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Trạng thái đơn hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {["pending", "processing", "completed", "cancelled"].map((status) => {
                const count = orders.filter((order) => order.status === status).length
                const percentage = orders.length > 0 ? (count / orders.length) * 100 : 0
                const statusText = {
                  pending: "Chờ xử lý",
                  processing: "Đang xử lý",
                  completed: "Hoàn thành",
                  cancelled: "Đã hủy",
                }[status]

                return (
                  <div key={status} className="flex items-center justify-between">
                    <span className="font-medium">{statusText}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            status === "completed"
                              ? "bg-green-600"
                              : status === "processing"
                                ? "bg-blue-600"
                                : status === "pending"
                                  ? "bg-yellow-600"
                                  : "bg-red-600"
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
