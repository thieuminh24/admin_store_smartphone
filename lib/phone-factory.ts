// Factory Pattern - Tạo các loại điện thoại khác nhau
interface Phone {
  id: string
  name: string
  brand: string
  price: number
  stock: number
  category: string
  specs: {
    screen: string
    camera: string
    battery: string
    storage: string
  }
}

class Smartphone implements Phone {
  id = ""
  name: string
  brand: string
  price: number
  stock: number
  category = "smartphone"
  specs: {
    screen: string
    camera: string
    battery: string
    storage: string
  }

  constructor(data: any) {
    this.name = data.name
    this.brand = data.brand
    this.price = data.price
    this.stock = data.stock
    this.specs = data.specs
  }
}

class FeaturePhone implements Phone {
  id = ""
  name: string
  brand: string
  price: number
  stock: number
  category = "feature"
  specs: {
    screen: string
    camera: string
    battery: string
    storage: string
  }

  constructor(data: any) {
    this.name = data.name
    this.brand = data.brand
    this.price = data.price
    this.stock = data.stock
    this.specs = {
      screen: data.specs.screen || "2.4 inch LCD",
      camera: data.specs.camera || "2MP",
      battery: data.specs.battery || "1500mAh",
      storage: data.specs.storage || "32MB",
    }
  }
}

class GamingPhone implements Phone {
  id = ""
  name: string
  brand: string
  price: number
  stock: number
  category = "gaming"
  specs: {
    screen: string
    camera: string
    battery: string
    storage: string
  }

  constructor(data: any) {
    this.name = data.name
    this.brand = data.brand
    this.price = data.price
    this.stock = data.stock
    this.specs = {
      screen: data.specs.screen || "6.7 inch AMOLED 144Hz",
      camera: data.specs.camera || "64MP Gaming Camera",
      battery: data.specs.battery || "6000mAh",
      storage: data.specs.storage || "512GB",
    }
  }
}

export class PhoneFactory {
  createPhone(type: "smartphone" | "feature" | "gaming", data: any): Phone {
    switch (type) {
      case "smartphone":
        return new Smartphone(data)
      case "feature":
        return new FeaturePhone(data)
      case "gaming":
        return new GamingPhone(data)
      default:
        throw new Error("Unknown phone type")
    }
  }
}
