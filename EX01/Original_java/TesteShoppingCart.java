import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class ShoppingCartTest {

    @Test
    void testAddItemToCart() {
        ShoppingCart cart = new ShoppingCart();
        Item item = new Item("Laptop", 1200.00);
        cart.addItem(item);
        
        assertEquals(1, cart.getItemCount());
        assertTrue(cart.getItems().contains(item));
    }

    @Test
    void testRemoveItemFromCart() {
        ShoppingCart cart = new ShoppingCart();
        Item item = new Item("Laptop", 1200.00);
        cart.addItem(item);
        cart.removeItem(item);
        
        assertEquals(0, cart.getItemCount());
        assertFalse(cart.getItems().contains(item));
    }

    @Test
    void testCalculateTotalPrice() {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem(new Item("Laptop", 1200.00));
        cart.addItem(new Item("Mouse", 50.00));
        
        assertEquals(1250.00, cart.getTotalPrice());
    }

    @Test
    void testEmptyCart() {
        ShoppingCart cart = new ShoppingCart();
        cart.addItem(new Item("Laptop", 1200.00));
        cart.addItem(new Item("Mouse", 50.00));
        cart.emptyCart();
        
        assertEquals(0, cart.getItemCount());
        assertEquals(0.00, cart.getTotalPrice());
    }

    @Test
    void testCartCapacity() {
        ShoppingCart cart = new ShoppingCart(2); // Assuming a max capacity of 2
        cart.addItem(new Item("Laptop", 1200.00));
        cart.addItem(new Item("Mouse", 50.00));
        
        Exception exception = assertThrows(IllegalStateException.class, () -> {
            cart.addItem(new Item("Keyboard", 100.00));
        });
        
        assertEquals("Cart is full", exception.getMessage());
    }
}
