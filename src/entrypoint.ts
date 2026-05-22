import type { Alpine } from "alpinejs";

export default (Alpine: Alpine) => {
  const stored = localStorage.getItem("tusindfryd_cart");
  Alpine.store("cart", {
    items: (stored ? JSON.parse(stored) : []) as any[],
    open: false,

    get total(): number {
      return (this as any).items.reduce(
        (sum: number, item: any) => sum + item.price,
        0,
      );
    },

    add(item: any): void {
      if (!(this as any).items.some((i: any) => i.id === item.id)) {
        (this as any).items.push(item);
        localStorage.setItem(
          "tusindfryd_cart",
          JSON.stringify((this as any).items),
        );
      }
      (this as any).open = true;
    },

    remove(id: number): void {
      (this as any).items = (this as any).items.filter((i: any) => i.id !== id);
      localStorage.setItem(
        "tusindfryd_cart",
        JSON.stringify((this as any).items),
      );
    },
  });
};
