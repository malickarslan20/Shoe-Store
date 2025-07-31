import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import service from "../Appwrite/database";
import config from "../Configure/config";
import { Query, ID } from "appwrite";
import { useCart } from "../Context/cartContext"
import { toast } from "react-toastify";
import authService from "../Appwrite/auth";

const ProductPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const categoryFromQuery = params.get("category");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useCart();

  const fetchProducts = async () => {
    try {
      const response = await service.databases.listDocuments(
        config.appwriteDatabaseid,
        config.appwriteproductCollectionid,
        [Query.equal("category", categoryFromQuery)]
      );

      const items = response.documents.map((doc) => ({
        id: doc.$id,
        title: doc.title,
        description: doc.description,
        imageId: doc.image,
        Price: doc.Price,
      }));

      setProducts(items);
    } catch (error) {
      console.error("❌ Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };
const handleBuyNow = async (product) => {
  try {
    const user = await authService.getcurrentuser();

    if (!user) {
      toast.error("You must be logged in to place an order.");
      return;
    }

    const orderData = {
      userEmail: user.email,
      items: JSON.stringify([product]),
      totalAmount: parseFloat(product.Price),
      createdAt: new Date().toISOString(),
    };

    // ✅ Save order only
    await service.databases.createDocument(
      config.appwriteDatabaseid,
      config.appwriteOrderCollectionid,
      ID.unique(),
      orderData
    );

    // ✅ Show thank you message via toast (or state)
    toast.success(`🎉 Thank you ${user.name || user.email} for your order!`);
  } catch (err) {
    console.error("❌ Failed to place order:", err);
    toast.error("Something went wrong while placing the order.");
  }
};



  useEffect(() => {
    if (categoryFromQuery) {
      fetchProducts();
    }
  }, [categoryFromQuery]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">
        Products in <span className="text-red-600">{categoryFromQuery}</span>
      </h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="flex flex-wrap gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="w-full sm:w-64 bg-white shadow-md rounded-xl p-4"
            >
              <img
                src={product.imageId}
                alt={product.title}
                className="w-full h-64 object-contain rounded mb-2"
              />
              <h2 className="text-lg font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-500">{product.description}</p>
              <p className="text-md font-bold text-green-600 my-2">
                Price: Rs:{product.Price}
              </p>
              <div className="gap-2 flex flex-col items-center">
                <button
                  onClick={() => addToCart(product)}
                  className="bg-transparent border rounded-md border-red-600 text-red-600 mt-8 hover:bg-amber-100 text-lg"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleBuyNow(product)} // ✅ Buy logic
                  className="bg-red-500 border rounded-md border-red-600 text-white mt-2 ml-2 hover:bg-amber-200 hover:text-red-600"
                >
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductPage;
