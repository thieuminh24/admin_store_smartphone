"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye } from "lucide-react"
import { DataStore } from "@/lib/data-store"
import { NotificationService } from "@/lib/notification-service"

export function OrderManagement() {
  const [orders, setOrders] = useState(DataStore.getInstance().getOrders())

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    const dataStore = DataStore.getInstance()
    dataStore.updateOrderStatus(orderId, newStatus)
    setOrders(dataStore.getOrders())
    NotificationService.getInstance().notify(`Đã cập nhật trạng thái đơn hàng #${orderId}`)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      case "processing":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "pending":
        return "Chờ xử lý"
      case "cancelled":
        return "Đã hủy"
      case "processing":
        return "Đang xử lý"
      default:
        return status
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Quản lý đơn hàng</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <Card key={order.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">Đơn hàng #{order.id}</CardTitle>
                  <p className="text-sm text-gray-500">
                    Khách hàng: {order.customerName} | {order.customerEmail}
                  </p>
                  <p className="text-sm text-gray-500">
                    Ngày đặt: {new Date(order.createdAt).toLocaleDateString("vi-VN")}
                  </p>
                </div>
                <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Sản phẩm:</h4>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                        <div>
                          <p className="font-medium">{item.productName}</p>
                          <p className="text-sm text-gray-500">Số lượng: {item.quantity}</p>
                        </div>
                        <p className="font-medium">₫{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t">
                  <div>
                    <p className="text-lg font-bold">Tổng cộng: ₫{order.total.toLocaleString()}</p>
                    <p className="text-sm text-gray-500">Địa chỉ: {order.shippingAddress}</p>
                  </div>

                  <div className="flex gap-2 items-center">
                    <Select value={order.status} onValueChange={(value) => updateOrderStatus(order.id, value)}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Chờ xử lý</SelectItem>
                        <SelectItem value="processing">Đang xử lý</SelectItem>
                        <SelectItem value="completed">Hoàn thành</SelectItem>
                        <SelectItem value="cancelled">Đã hủy</SelectItem>
                      </SelectContent>
                    </Select>

                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      Chi tiết
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
