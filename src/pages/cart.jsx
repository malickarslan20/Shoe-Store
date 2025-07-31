import React from "react";
import { useCart } from "../Context/cartContext"; // Adjust path if needed

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.Price), 0);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">🛒 Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="grid gap-6">
            {cartItems.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white shadow rounded-xl p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.imageId}
                    alt={item.title}
                    className="w-24 h-24 object-contain rounded"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.description}</p>
                    <p className="text-md font-bold text-green-600">Rs:{item.Price}</p>
                  </div>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-bold">
              Total: <span className="text-green-700">Rs:{totalPrice}</span>
            </p>
            <button
              onClick={clearCart}
              className="bg-gray-800 hover:bg-gray-900 text-white px-6 py-2 rounded"
            >
              Clear Cart
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
