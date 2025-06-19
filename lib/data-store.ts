// Singleton Pattern - Quản lý dữ liệu toàn cục
export class DataStore {
  private static instance: DataStore
  private products: any[] = []
  private orders: any[] = []

  private constructor() {
    this.initializeData()
  }

  public static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore()
    }
    return DataStore.instance
  }

  private initializeData() {
    // Dữ liệu mẫu
    this.products = [
      {
        id: "1",
        name: "iPhone 15 Pro",
        brand: "Apple",
        price: 29990000,
        stock: 15,
        category: "smartphone",
        specs: {
          screen: "6.1 inch Super Retina XDR",
          camera: "48MP + 12MP + 12MP",
          battery: "3274mAh",
          storage: "128GB",
        },
      },
      {
        id: "2",
        name: "Samsung Galaxy S24",
        brand: "Samsung",
        price: 22990000,
        stock: 20,
        category: "smartphone",
        specs: {
          screen: "6.2 inch Dynamic AMOLED",
          camera: "50MP + 12MP + 10MP",
          battery: "4000mAh",
          storage: "256GB",
        },
      },
      {
        id: "3",
        name: "Xiaomi 14",
        brand: "Xiaomi",
        price: 18990000,
        stock: 25,
        category: "smartphone",
        specs: {
          screen: "6.36 inch AMOLED",
          camera: "50MP + 50MP + 50MP",
          battery: "4610mAh",
          storage: "256GB",
        },
      },
    ]

    this.orders = [
      {
        id: "ORD001",
        customerId: "CUST001",
        customerName: "Nguyễn Văn A",
        customerEmail: "nguyenvana@email.com",
        items: [{ productName: "iPhone 15 Pro", quantity: 1, price: 29990000 }],
        total: 29990000,
        status: "completed",
        shippingAddress: "123 Đường ABC, Quận 1, TP.HCM",
        createdAt: new Date().toISOString(),
      },
      {
        id: "ORD002",
        customerId: "CUST002",
        customerName: "Trần Thị B",
        customerEmail: "tranthib@email.com",
        items: [{ productName: "Samsung Galaxy S24", quantity: 2, price: 22990000 }],
        total: 45980000,
        status: "pending",
        shippingAddress: "456 Đường XYZ, Quận 2, TP.HCM",
        createdAt: new Date(Date.now() - 86400000).toISOString(),
      },
    ]
  }

  public getProducts(): any[] {
    return [...this.products]
  }

  public getOrders(): any[] {
    return [...this.orders]
  }

  public addProduct(product: any): void {
    product.id = Date.now().toString()
    this.products.push(product)
  }

  public updateProduct(id: string, updatedProduct: any): void {
    const index = this.products.findIndex((p) => p.id === id)
    if (index !== -1) {
      this.products[index] = { ...updatedProduct, id }
    }
  }

  public deleteProduct(id: string): void {
    this.products = this.products.filter((p) => p.id !== id)
  }

  public updateOrderStatus(orderId: string, status: string): void {
    const order = this.orders.find((o) => o.id === orderId)
    if (order) {
      order.status = status
    }
  }
}
