import { toast } from "react-toastify";

// Observer Pattern - Quản lý thông báo
interface Observer {
  update(message: string): void;
}

export class NotificationService {
  private static instance: NotificationService;
  private observers: Observer[] = [];

  private constructor() {}

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  public subscribe(observer: Observer): void {
    this.observers.push(observer);
  }

  public unsubscribe(observer: Observer): void {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  public notify(message: string): void {
    // Hiển thị thông báo đơn giản
    if (typeof window !== "undefined") {
      toast(message);
    }

    // Thông báo cho tất cả observers
    this.observers.forEach((observer) => observer.update(message));
  }
}
