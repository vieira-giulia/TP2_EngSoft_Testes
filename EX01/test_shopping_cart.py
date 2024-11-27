import unittest
from item import Item
from shopping_cart import ShoppingCart

class TestShoppingCart(unittest.TestCase):

    def test_add_item_to_cart(self):
        cart = ShoppingCart()
        item = Item("Laptop", 1200.00)
        cart.add_item(item)

        self.assertEqual(cart.get_item_count(), 1)
        self.assertIn(item, cart.items)

    def test_remove_item_from_cart(self):
        cart = ShoppingCart()
        item = Item("Laptop", 1200.00)
        cart.add_item(item)
        cart.remove_item(item)

        self.assertEqual(cart.get_item_count(), 0)
        self.assertNotIn(item, cart.items)

    def test_calculate_total_price(self):
        cart = ShoppingCart()
        cart.add_item(Item("Laptop", 1200.00))
        cart.add_item(Item("Mouse", 50.00))

        self.assertEqual(cart.get_total_price(), 1250.00)

    def test_empty_cart(self):
        cart = ShoppingCart()
        cart.add_item(Item("Laptop", 1200.00))
        cart.add_item(Item("Mouse", 50.00))
        cart.empty_cart()

        self.assertEqual(cart.get_item_count(), 0)
        self.assertEqual(cart.get_total_price(), 0.00)

    def test_cart_capacity(self):
        cart = ShoppingCart(capacity=2)
        cart.add_item(Item("Laptop", 1200.00))
        cart.add_item(Item("Mouse", 50.00))

        with self.assertRaises(Exception) as context:
            cart.add_item(Item("Keyboard", 100.00))

        self.assertTrue('Cart is full' in str(context.exception))


if __name__ == "__main__":
    unittest.main()
