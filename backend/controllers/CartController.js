import Cart from "../models/Cart.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ userId })

    if (!cart) {
      cart = new Cart({ userId, products: [] });
  }

  const existingProduct = cart.products.find(
      item => item.productId.toString() === productId
  );

  if (existingProduct) {
      // Update quantity
      const newQuantity = existingProduct.quantity +   quantity;
      if (newQuantity > 0) {
          existingProduct.quantity = newQuantity;
      } else {
          // Remove product if quantity would become 0 or negative
          cart.products = cart.products.filter(
              item => item.productId.toString() !== productId
          );
      }
  } else if (quantity > 0) {
      // Only add new product if quantity is positive
      cart.products.push({ productId, quantity });
  }

    await cart.save();
    await cart.populate("products.productId");
    res.json({ message: "Product added to cart", cart });
  } catch (error) {
    res.status(500).json({ error: "Error adding to cart" });
    console.error("Add to cart error:", error);
  }
};

// export const removeFromCart = async (req, res) => {
//   const { userId, productId } = req.body;
//   const cart = await Cart.findOneAndUpdate(
//     { userId },
//     { $pull: { products: { productId } } },
//     { new: true }
//   );
//   res.json({ message: "Product removed from cart", cart });
// };

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.userId }).populate("products.productId");
    
    // if (!cart) return res.json({ cart: { products: [] } });

    res.json( cart || { products: [] } );
  } catch (error) {
    res.status(500).json({ error: "Error fetching cart" });
    console.error("Get cart error:", error);
  }
};


export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    cart.products = cart.products.filter(
      p => p.productId.equals(productId)
    );
    
    await cart.save();
    res.json({ message: "Item removed from cart" });
  } catch (error) {
    console.error("Remove from cart error:", error);
    res.status(500).json({ error: "Failed to remove item" });
  }
};