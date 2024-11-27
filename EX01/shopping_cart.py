class ShoppingCart:
    def __init__(self, capacity=None):
        self.items = []
        self.capacity = capacity

    def add_item(self, item):
        if self.capacity is not None and len(self.items) >= self.capacity:
            raise Exception("Cart is full")
        self.items.append(item)

    def remove_item(self, item):
        if item in self.items:
            self.items.remove(item)

    def get_item_count(self):
        return len(self.items)

    def get_total_price(self):
        return sum(item.price for item in self.items)

    def empty_cart(self):
        self.items.clear()

    def __repr__(self):
        return f"ShoppingCart(items={self.items})"
