import React, { useEffect, useState } from "react";
import service from "../Appwrite/database";
import { ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import config from "../Configure/config";

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState("");
  const [orders, setOrders] = useState([]);
  const [productData, setProductData] = useState({
    title: "",
    description: "",
    category: "",
    image: "",
    Price:""
  });
  useEffect(()=>{
    console.log("database id",config.appwriteDatabaseid)
    console.log("collection order id ", config.appwriteOrderCollectionid)
  },[])
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    const res = await service.getOrders();
    if (res?.documents) {
      setOrders(res.documents);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = "";
      if (imageFile) {
        const uploaded = await service.uploadFile(imageFile);
        imageUrl = uploaded.$id;
      }

      await service.createProduct({
        title: productData.title,
        description: productData.description,
        category: productData.category,
        image: imageUrl,
        Price: Number(productData.Price)
      });

      toast.success("✅ Product added successfully!");
      setProductData({ title: "", description: "", category: "", image: "" ,Price:0});
      setImageFile(null);
    } catch (err) {
      toast.error("❌ Failed to add product. Check console.");
      console.error("Error adding product:", err);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen  p-4 md:p-8">
      <ToastContainer position="top-right" autoClose={3000} />

      <motion.h1
        className="text-3xl font-bold text-red-700 mb-6 text-center"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Admin Dashboard
      </motion.h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-center">
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          onClick={() => {
            setActiveSection("orders");
            fetchOrders();
          }}
        >
          View Orders
        </button>
        <button
          className="px-4 py-2 bg-white border border-red-600 text-red-600 rounded hover:bg-red-100 transition"
          onClick={() => setActiveSection("addProduct")}
        >
          Add Product
        </button>
      </div>

      {/* Orders Section */}
      {activeSection === "orders" && (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <h2 className="text-xl font-semibold text-red-700 mb-4">Orders</h2>

    {orders.length === 0 ? (
      <p className="text-gray-500">No orders found.</p>
    ) : (
      <ul className="space-y-6">
        {orders.map((order) => {
          let items = [];
          try {
            items = JSON.parse(order.items);
          } catch (e) {
            console.error("Invalid items JSON", e);
          }

          return (
            <li key={order.$id} className="p-4 border rounded-lg shadow-sm">
              <div className="mb-2">
                <strong>User:</strong> {order.userEmail}
              </div>
              <div className="mb-2">
                <strong>Total Amount:</strong> Rs {order.totalAmount}
              </div>
              <div className="mb-2">
                <strong>Ordered At:</strong> {new Date(order.createdAt).toLocaleString()}
              </div>
              <div>
                <strong>Items:</strong>
                <ul className="ml-4 list-disc text-sm mt-2">
                  {items.map((item, idx) => (
                    <li key={idx}>
                      {item.title} - Rs {item.Price}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          );
        })}
      </ul>
    )}
  </motion.div>
)}


      {/* Add Product Section */}
      {activeSection === "addProduct" && (
        <motion.form
          onSubmit={addProduct}
          className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-xl font-semibold text-red-700 mb-4 text-center">
            Add Product
          </h2>

          <input
            type="text"
            placeholder="Title"
            className="w-full border border-red-300 rounded px-3 py-2 mb-4"
            value={productData.title}
            onChange={(e) =>
              setProductData({ ...productData, title: e.target.value })
            }
            required
          />

          <textarea
            placeholder="Description"
            className="w-full border border-red-300 rounded px-3 py-2 mb-4"
            value={productData.description}
            onChange={(e) =>
              setProductData({ ...productData, description: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full border border-red-300 rounded px-3 py-2 mb-4"
            value={productData.category}
            onChange={(e) =>
              setProductData({ ...productData, category: e.target.value })
            }
            required
          />

          <input
            type="file"
            accept="image/*"
            className="w-full border border-red-300 rounded px-3 py-2 mb-4"
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
          <input
            type="text"
            placeholder="Price"
            className="w-full border border-red-300 rounded px-3 py-2 mb-4"
            value={productData.Price}
            onChange={(e) =>
              setProductData({ ...productData, Price: e.target.value })
            }
            required
          />
          

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            } transition`}
          >
            {loading ? "Uploading..." : "Add Product"}
          </button>
        </motion.form>
      )}
    </div>
  );
};

export default AdminPage;
