"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Plus, Edit, Trash2 } from "lucide-react"
import { DataStore } from "@/lib/data-store"
import { PhoneFactory } from "@/lib/phone-factory"
import { NotificationService } from "@/lib/notification-service"

export function ProductManagement() {
  const [products, setProducts] = useState(DataStore.getInstance().getProducts())
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    category: "",
    specs: {
      screen: "",
      camera: "",
      battery: "",
      storage: "",
    },
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Sử dụng Factory Pattern để tạo sản phẩm
      const phoneFactory = new PhoneFactory()
      const newPhone = phoneFactory.createPhone(formData.category as any, {
        ...formData,
        price: Number.parseFloat(formData.price),
        stock: Number.parseInt(formData.stock),
      })

      const dataStore = DataStore.getInstance()

      if (editingProduct) {
        dataStore.updateProduct(editingProduct.id, newPhone)
        NotificationService.getInstance().notify("Cập nhật sản phẩm thành công!")
      } else {
        dataStore.addProduct(newPhone)
        NotificationService.getInstance().notify("Thêm sản phẩm thành công!")
      }

      setProducts(dataStore.getProducts())
      setIsAddDialogOpen(false)
      setEditingProduct(null)
      resetForm()
    } catch (error) {
      NotificationService.getInstance().notify("Có lỗi xảy ra!")
    }
  }

  const handleDelete = (id: string) => {
    const dataStore = DataStore.getInstance()
    dataStore.deleteProduct(id)
    setProducts(dataStore.getProducts())
    NotificationService.getInstance().notify("Xóa sản phẩm thành công!")
  }

  const handleEdit = (product: any) => {
    setEditingProduct(product)
    setFormData({
      name: product.name,
      brand: product.brand,
      price: product.price.toString(),
      stock: product.stock.toString(),
      category: product.category,
      specs: product.specs,
    })
    setIsAddDialogOpen(true)
  }

  const resetForm = () => {
    setFormData({
      name: "",
      brand: "",
      price: "",
      stock: "",
      category: "",
      specs: {
        screen: "",
        camera: "",
        battery: "",
        storage: "",
      },
    })
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Quản lý sản phẩm</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => {
                resetForm()
                setEditingProduct(null)
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Thêm sản phẩm
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Tên sản phẩm</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="brand">Thương hiệu</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="price">Giá (VNĐ)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Số lượng</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="category">Loại</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn loại" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="smartphone">Smartphone</SelectItem>
                      <SelectItem value="feature">Feature Phone</SelectItem>
                      <SelectItem value="gaming">Gaming Phone</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="screen">Màn hình</Label>
                  <Input
                    id="screen"
                    value={formData.specs.screen}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, screen: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="camera">Camera</Label>
                  <Input
                    id="camera"
                    value={formData.specs.camera}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, camera: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="battery">Pin</Label>
                  <Input
                    id="battery"
                    value={formData.specs.battery}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, battery: e.target.value },
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="storage">Bộ nhớ</Label>
                  <Input
                    id="storage"
                    value={formData.specs.storage}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, storage: e.target.value },
                      })
                    }
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Hủy
                </Button>
                <Button type="submit">{editingProduct ? "Cập nhật" : "Thêm"}</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <p className="text-sm text-gray-500">{product.brand}</p>
                </div>
                <Badge variant={product.stock > 0 ? "default" : "destructive"}>
                  {product.stock > 0 ? "Còn hàng" : "Hết hàng"}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-2xl font-bold text-blue-600">₫{product.price.toLocaleString()}</p>
                <p className="text-sm">Số lượng: {product.stock}</p>
                <p className="text-sm">Loại: {product.category}</p>

                <div className="text-xs text-gray-500 space-y-1">
                  <p>Màn hình: {product.specs.screen}</p>
                  <p>Camera: {product.specs.camera}</p>
                  <p>Pin: {product.specs.battery}</p>
                  <p>Bộ nhớ: {product.specs.storage}</p>
                </div>

                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => handleEdit(product)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(product.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
