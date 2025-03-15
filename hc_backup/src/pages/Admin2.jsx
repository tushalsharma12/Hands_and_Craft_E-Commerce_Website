import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";

const Admin2 = () => {

  // const { user } = useContext(AuthContext);
  const { isAdmin, isAuthenticated } = useContext(AuthContext);
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [orders, setOrders] = useState([]);

  // ✅ Fetch all orders
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/order", {
          headers: { 
            Authorization: `Bearer ${token}`
          }
        });
        console.log("Fetched orders:", response.data);
        setOrders(response.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, []);

  // ✅ Update Order Status
  const handleStatusUpdate = (orderId, newStatus) => {
    const token = localStorage.getItem("token");
    axios.put(`http://localhost:5000/api/order/${orderId}`, { orderStatus: newStatus },{ 
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId ? { ...order, orderStatus: newStatus } : order
          )
        );
      })
      .catch((err) => console.error("Error updating order:", err));
  };

  // ✅ Delete Order
  const handleDelete = async (orderId) => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.delete(`http://localhost:5000/api/order/${orderId}`, { 
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log("Deleted order:", response.data);
      setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);


  const fetchMessages = async () => {
    const res = await axios.get("http://localhost:5000/api/Contact/messages");
    setMessages(res.data);  
  };

  const deleteMessage = async (id) => {
    await axios.delete(`http://localhost:5000/api/Contact/messages/${id}`);
    fetchMessages();
  };

  const [formData, setFormData] = useState({
    title: "",
    rating: "",
    price: "",
    prev_price: "",
    discount: "",
    page: "Dining",
    section: "DiningRounded1",
    img: null,
  });
  const [editId, setEditId] = useState(null);

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get("http://localhost:5000/api/products");
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Handle Form Inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, img: e.target.files[0] });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) data.append(key, formData[key]);
    });

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/api/products/${editId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      } else {
        await axios.post("http://localhost:5000/api/products/add", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }
      setEditId(null);
      setFormData({
        title: "",
        rating: "",
        price: "",
        prev_price: "",
        discount: "",
        page: "Home",
        section: "Gifts",
        img: null,
      });
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Product
  const deleteProduct = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // Handle Edit
  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      rating: product.rating,
      price: product.price,
      prev_price: product.prev_price,
      discount: product.discount,
      page: product.page,
      section: product.section,
      img: null, // ✅ Image URL ko set kar rahe hain
      existingImg: product.img.startsWith("http") ? product.img : `http://localhost:5000${product.img}`, // ✅ Fix existingImg
    });
    setEditId(product._id);
  };

  
    // Check authentication and admin status
    if (!isAuthenticated) {
      return <Navigate to="/login" />;
  }
  
  if (!isAdmin) {
      return <Navigate to="/" />;
  } 



  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>

      <form className="bg-white p-4 shadow-md rounded-md" onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="block w-full p-2 border mb-2" required />
        <input type="number" name="rating" placeholder="Rating" value={formData.rating} onChange={handleChange} className="block w-full p-2 border mb-2" required />
        <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="block w-full p-2 border mb-2" required />
        <input type="text" name="prev_price" placeholder="Previous Price" value={formData.prev_price} onChange={handleChange} className="block w-full p-2 border mb-2" />
        <input type="text" name="discount" placeholder="Discount" value={formData.discount} onChange={handleChange} className="block w-full p-2 border mb-2" />

        <select name="page" value={formData.page} onChange={handleChange} className="block w-full p-2 border mb-2">
          {["Dining", "Lighting", "Decor", "Garden", "Home", "Dining", "Lighting", "Decor", "Garden", "ProductDetails", "Showmore"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <select name="section" value={formData.section} onChange={handleChange} className="block w-full p-2 border mb-2">
          {["testimonials","More_Garden_Product","Garden_Decor_Product2","Garden_Decor_Product1","Decorative_Hangings2","Decorative_Hangings1","Pots_Planters2","Pots_Planters1","GardenRounded2","GardenRounded1","BathDecor2","BathDecor1","OfficeDesk2","OfficeDesk1","Vases2","Vases1","Wall_Decor2","Wall_Decor1","DecorRounded2","DecorRounded1","Candles2","Candles1","DiyaSet2","DiyaSet1","Lamps2","Lamps1","Festivallight2","Festivallight1","LightingRounded2","LightingRounded1","Cutlery","Serveware2","Serveware1","Tableware2","Tableware1","Drinkware2","Drinkware1","DiningRounded2","DiningRounded1","Gifts", "today_big_deals", "New Arrivals", "Most Loved", "Indian Art Forms", "explore", "Special Price", "Popular", "SliderImages", "Slider2Images"].map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        {(formData.img || formData.existingImg) && (
          <img
            src={
              typeof formData.img === "string"
                ? formData.img
                : formData.img
                  ? URL.createObjectURL(formData.img)
                  : formData.existingImg
            }
            alt="Preview"
            width="100"
            className="mt-2 rounded-md"
          />
        )}



        <input type="file" onChange={handleFileChange} className="block w-full p-2 border mb-2" />

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          {loading ? "Processing..." : editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {loading ? <p>Loading...</p> : (
        <ul className="mt-6 space-y-4">
          {products.map((product) => (
            <li key={product._id} className="bg-white p-4 shadow-md flex items-center justify-between">
              <div>
                <p className="font-bold">{product.title}</p>
                <p> <span className="font-semibold">Page:</span> {product.page} |<span className="font-semibold">Section:</span>{product.section} </p>
                <p><span className="font-semibold">Price: </span> ₹{product.price} |<span className="font-semibold"> Previous Price: </span> <span className="line-through">₹{product.prev_price}  </span> </p>
                <p> <span className="font-semibold">Discount:</span>{product.discount}% off | <span className="font-semibold">Rating: </span>{product.rating} <i className="fa-solid fa-star text-yellow-600"></i></p>
                {product.img && (
                  <img src={product.img.startsWith("http") ? product.img : `http://localhost:5000${product.img}`} alt={product.title} width="100" className="mt-2" />
                )}
              </div>
              <div>
                <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-3 py-1 rounded-md mr-2">Edit</button>
                <button onClick={() => deleteProduct(product._id)} className="bg-red-500 text-white px-3 py-1 rounded-md">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
      <div className="my-20 flex flex-col items-center">
      <h2>Contact Messages</h2>
      <ul className="mt-6 space-y-4">
        {messages.map((msg) => (
          <li key={msg._id}>
            <div>Name :{msg.name}</div>
            <div>Email :{msg.email}</div>
            <div>Message :{msg.message}</div>
            <button className="bg-red-500 text-white px-3 py-1 rounded-md mr-2 hover:bg-red-600" onClick={() => deleteMessage(msg._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    <table className="w-full border-collapse border border-gray-300">
  <thead>
    <tr className="bg-gray-100">
      <th className="border p-2">Order ID</th>
      <th className="border p-2">Customer</th>
      <th className="border p-2">Items</th>
      <th className="border p-2">Total</th>
      <th className="border p-2">Status</th>
      <th className="border p-2">Payment</th>
      <th className="border p-2">Date</th>
      <th className="border p-2">Actions</th>
    </tr>
  </thead>
  <tbody>
    {orders.map((order) => (
      <tr key={order._id} className="border hover:bg-gray-50">
        <td className="border p-2">{order._id}</td>
        <td className="border p-2">{order.userId?.name || "Unknown"}</td>
        <td className="border p-2">
          <ul className="list-disc pl-4">
            {order.items?.map((item, idx) => (
              <li key={idx}>
                {item.title} (x{item.quantity})
              </li>
            ))}
          </ul>
        </td>
        <td className="border p-2">₹{order.totalAmount}</td>
        <td className="border p-2">
          <select
            value={order.orderStatus}
            onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
            className="border p-1 rounded"
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </td>
        <td className="border p-2">
          <span className={`px-2 py-1 rounded-full text-sm ${
            order.paymentStatus === 'paid' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {order.paymentStatus}
          </span>
        </td>
        <td className="border p-2">
          {new Date(order.createdAt).toLocaleDateString()}
        </td>
        <td className="border p-2">
          <button 
            onClick={() => handleDelete(order._id)} 
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>

  );
};

export default Admin2;
