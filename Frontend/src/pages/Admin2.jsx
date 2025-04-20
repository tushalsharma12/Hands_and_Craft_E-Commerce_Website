import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  MessageSquare,
  Plus,
  Pencil,
  Trash2,
  ChevronRight,
  AlertCircle,
  Menu,
  X
} from 'lucide-react';

const Admin2 = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [pageFilter, setPageFilter] = useState("");
  const [sectionFilter, setSectionFilter] = useState("");
  const [titleFilter, setTitleFilter] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/order/${orderId}/status`, { status: newStatus });
      toast.success("Order status updated!");
      // Refetch orders or update UI accordingly
    } catch (error) {
      toast.error("Failed to update status");
    }
  };


  const handleFilter = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products/filter`, {
        params: {
          page: pageFilter,
          section: sectionFilter,
          title: titleFilter,
        }
      });
      setProducts(res.data);
    } catch (error) {
      console.error("Error filtering products:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchData(); // tabhi call karo jab token ready ho
    }
  }, []);
  

  const fetchData = async () => {
    try {
      const [productRes, orderRes, contactRes, userRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/products`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/order`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/contact/getAllContacts`),
        axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/auth/users`)
      ]);
      setProducts(productRes.data);
      setOrders(orderRes.data);
      setContacts(contactRes.data);
      setUsers(userRes.data);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  };

  const [formData, setFormData] = useState({
    title: "",
    img: null,
    rating: 0,
    price: "",
    prev_price: "",
    discount: "",
    page: "Home",
    section: "Gifts",
    existingImg: "",
  });
  const [editId, setEditId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, img: file, existingImg: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));

    try {
      if (editId) {
        await axios.put(`${import.meta.env.VITE_API_BASE_URL}/api/products/${editId}`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully");
      } else {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/products/add`, formDataToSend, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product added successfully");
      }

      setEditId(null);
      setFormData({
        title: "",
        rating: 0,
        price: "",
        prev_price: "",
        discount: "",
        page: "Home",
        section: "Gifts",
        img: null,
        existingImg: "",
      });
      setShowAddProduct(false);
      fetchData();
    } catch (error) {
      toast.error(editId ? "Failed to update product" : "Failed to add product");
    }
  };

  const handleEdit = (product) => {
    setFormData({
      title: product.title,
      rating: product.rating,
      price: product.price,
      prev_price: product.prev_price,
      discount: product.discount,
      page: product.page,
      section: product.section,
      img: null,
      existingImg: product.img.startsWith("http") ? product.img : `${import.meta.env.VITE_API_BASE_URL}${product.img}`,
    });
    setEditId(product._id);
    setShowAddProduct(true);
  };

  const deleteProduct = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/products/delete/${id}`);
        setProducts(products.filter((product) => product._id !== id));
        toast.success("Product deleted successfully");
      } catch (error) {
        toast.error("Failed to delete product");
      }
    }
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user? This action cannot be undone.");
    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/auth/delete/${id}`);
        setUsers(users.filter((user) => user._id !== id));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const handleDeleteOrder = async (orderId) => {

    try {
      const response = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/api/order/delete/${orderId}`);
      if (response.status === 200) {
        toast.success("Order deleted successfully!");
        setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
      } else {
        toast.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    }

  };



  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "users", label: "Users", icon: Users },
    { id: "contacts", label: "Contacts", icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-42 right-4 m-3 z-50 md:hidden bg-white p-2 rounded-lg shadow-lg"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}



        <div className={`
          fixed md:static inset-y-0 left-0 z-40
          transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 transition-transform duration-300 ease-in-out
          w-64 bg-white border-r border-gray-200
        `}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800">Admin Panel</h2>
          </div>
          <nav className="mt-6">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsSidebarOpen(false);
                  }}
                  className={`w-full flex items-center px-6 py-3 text-sm font-medium transition-colors duration-150 ${activeTab === item.id
                    ? "text-blue-600 bg-blue-50 border-blue-600"
                    : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden">
          <header className="bg-white border-b border-gray-200 px-8 py-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-semibold text-gray-800">
                {menuItems.find(item => item.id === activeTab)?.label}
              </h1>
            </div>
          </header>

          <main className="p-8">
            {/* Dashboard Overview */}
            {activeTab === "dashboard" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard
                  title="Total Products"
                  value={products.length}
                  icon={Package}
                  color="blue"
                />
                <DashboardCard
                  title="Total Orders"
                  value={orders.length}
                  icon={ShoppingCart}
                  color="green"
                />
                <DashboardCard
                  title="Total Users"
                  value={users.length}
                  icon={Users}
                  color="purple"
                />
                <DashboardCard
                  title="Messages"
                  value={contacts.length}
                  icon={MessageSquare}
                  color="yellow"
                />
              </div>
            )}

            {/* Products Management */}
            {activeTab === "products" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <h2 className="text-xl font-semibold text-gray-800">Manage Products</h2>
                  <button
                    onClick={() => setShowAddProduct(!showAddProduct)}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                  </button>
                </div>

                {/* Filters */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <select
                    value={pageFilter}
                    onChange={(e) => setPageFilter(e.target.value)}
                    className="p-2 border rounded w-full"
                  >
                    <option value="">All Pages</option>
                    {["Home", "Dining", "Lighting", "Decor", "Garden", "ProductDetails", "Showmore"].map((page) => (
                      <option key={page} value={page}>{page}</option>
                    ))}
                  </select>

                  <select
                    value={sectionFilter}
                    onChange={(e) => setSectionFilter(e.target.value)}
                    className="p-2 border rounded w-full"
                  >
                    <option value="">All Sections</option>
                    {["Gifts", "today_big_deals", "New Arrivals", "Most Loved", "Indian Art Forms", "explore", "Special Price", "Popular", "SliderImages", "Slider2Images", "DiningRounded1", "DiningRounded2", "Drinkware1", "Drinkware2", "Tableware1", "Tableware2", "Serveware1", "Serveware2", "Cutlery", "LightingRounded1", "LightingRounded2", "Festivallight1", "Festivallight2", "Lamps1", "Lamps2", "DiyaSet1", "DiyaSet2", "Candles1", "Candles2", "DecorRounded1", "DecorRounded2", "Wall_Decor1", "Wall_Decor2", "Vases1", "Vases2", "OfficeDesk1", "OfficeDesk2", "BathDecor1", "BathDecor2", "GardenRounded1", "GardenRounded2", "Pots_Planters1", "Pots_Planters2", "Decorative_Hangings1", "Decorative_Hangings2", "Garden_Decor_Product1", "Garden_Decor_Product2", "More_Garden_Product", "testimonials"].map((section) => (
                      <option key={section} value={section}>{section}</option>
                    ))}
                  </select>

                  <input
                    type="text"
                    value={titleFilter}
                    onChange={(e) => setTitleFilter(e.target.value)}
                    placeholder="Search by title..."
                    className="p-2 border rounded w-full"
                  />

                  <button
                    onClick={handleFilter}
                    className="bg-blue-500 text-white px-4 py-2 rounded w-full"
                  >
                    Filter
                  </button>
                </div>

                {/* Product Form */}
                {showAddProduct && (
                  <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {editId ? "Edit Product" : "Add New Product"}
                    </h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        name="title"
                        placeholder="Product Title"
                        value={formData.title}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                        required
                      />
                      <input
                        type="number"
                        name="rating"
                        placeholder="Rating (0-5)"
                        value={formData.rating}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                        min="0"
                        max="5"
                        required
                      />
                      <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                        required
                      />
                      <input
                        type="number"
                        name="prev_price"
                        placeholder="Previous Price"
                        value={formData.prev_price}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                      />
                      <input
                        type="text"
                        name="discount"
                        placeholder="Discount"
                        value={formData.discount}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                      />
                      <select
                        name="page"
                        value={formData.page}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                        required
                      >
                        <option value="">-- Select Page --</option>
                        <option value="Home">Home</option>
                        <option value="Dining">Dining</option>
                        <option value="Lighting">Lighting</option>
                        <option value="Decor">Decor</option>
                        <option value="Garden">Garden</option>
                        <option value="ProductDetails">ProductDetails</option>
                        <option value="Showmore">Showmore</option>
                      </select>

                      <select
                        name="section"
                        value={formData.section}
                        onChange={handleChange}
                        className="p-2 border rounded-lg focus:ring-2 focus:ring-blue-200 focus:border-blue-400 outline-none"
                        required
                      >
                        <option value="">-- Select Section --</option>
                        <option value="Gifts">Gifts</option>
                        <option value="today_big_deals">today_big_deals</option>
                        <option value="New Arrivals">New Arrivals</option>
                        <option value="Most Loved">Most Loved</option>
                        <option value="Indian Art Forms">Indian Art Forms</option>
                        <option value="explore">explore</option>
                        <option value="Special Price">Special Price</option>
                        <option value="Popular">Popular</option>
                        <option value="SliderImages">SliderImages</option>
                        <option value="Slider2Images">Slider2Images</option>
                        <option value="DiningRounded1">DiningRounded1</option>
                        <option value="DiningRounded2">DiningRounded2</option>
                        <option value="Drinkware1">Drinkware1</option>
                        <option value="Drinkware2">Drinkware2</option>
                        <option value="Tableware1">Tableware1</option>
                        <option value="Tableware2">Tableware2</option>
                        <option value="Serveware1">Serveware1</option>
                        <option value="Serveware2">Serveware2</option>
                        <option value="Cutlery">Cutlery</option>
                        <option value="LightingRounded1">LightingRounded1</option>
                        <option value="LightingRounded2">LightingRounded2</option>
                        <option value="Festivallight1">Festivallight1</option>
                        <option value="Festivallight2">Festivallight2</option>
                        <option value="Lamps1">Lamps1</option>
                        <option value="Lamps2">Lamps2</option>
                        <option value="DiyaSet1">DiyaSet1</option>
                        <option value="DiyaSet2">DiyaSet2</option>
                        <option value="Candles1">Candles1</option>
                        <option value="Candles2">Candles2</option>
                        <option value="DecorRounded1">DecorRounded1</option>
                        <option value="DecorRounded2">DecorRounded2</option>
                        <option value="Wall_Decor1">Wall_Decor1</option>
                        <option value="Wall_Decor2">Wall_Decor2</option>
                        <option value="Vases1">Vases1</option>
                        <option value="Vases2">Vases2</option>
                        <option value="OfficeDesk1">OfficeDesk1</option>
                        <option value="OfficeDesk2">OfficeDesk2</option>
                        <option value="BathDecor1">BathDecor1</option>
                        <option value="BathDecor2">BathDecor2</option>
                        <option value="GardenRounded1">GardenRounded1</option>
                        <option value="GardenRounded2">GardenRounded2</option>
                        <option value="Pots_Planters1">Pots_Planters1</option>
                        <option value="Pots_Planters2">Pots_Planters2</option>
                        <option value="Decorative_Hangings1">Decorative_Hangings1</option>
                        <option value="Decorative_Hangings2">Decorative_Hangings2</option>
                        <option value="Garden_Decor_Product1">Garden_Decor_Product1</option>
                        <option value="Garden_Decor_Product2">Garden_Decor_Product2</option>
                        <option value="More_Garden_Product">More_Garden_Product</option>
                        <option value="testimonials">testimonials</option>
                      </select>
                      <div className="col-span-2">
                        <input
                          type="file"
                          name="img"
                          onChange={handleImageChange}
                          className="p-2 border rounded-lg w-full"
                        />
                        {(formData.img || formData.existingImg) && (
                          <img
                            src={
                              formData.img
                                ? URL.createObjectURL(formData.img)
                                : formData.existingImg
                            }
                            alt="Preview"
                            className="mt-2 h-20 object-cover rounded-lg"
                          />
                        )}
                      </div>
                      <div className="col-span-2">
                        <button
                          type="submit"
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          {editId ? "Update Product" : "Add Product"}
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Products Table */}
                <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 text-left">
                        <th className="px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Product
                        </th>
                        <th className="px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Price
                        </th>
                        <th className="px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">
                          Category
                        </th>
                        <th className="px-4 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {products.map((product) => (
                        <tr key={product._id} className="hover:bg-gray-50">
                          <td className="px-4 md:px-6 py-4">
                            <div className="flex items-center">
                              <img
                                src={product.img}
                                alt={product.title}
                                className="h-10 w-10 rounded-lg object-cover"
                              />
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                  {product.title}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 md:px-6 py-4">
                            <div className="text-sm text-gray-900">₹{product.price}</div>
                            {product.prev_price && (
                              <div className="text-xs text-gray-500 line-through">
                                ₹{product.prev_price}
                              </div>
                            )}
                          </td>
                          <td className="px-4 md:px-6 py-4 hidden sm:table-cell">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {product.section}
                            </span>
                          </td>
                          <td className="px-4 md:px-6 py-4">
                            <div className="flex space-x-3">
                              <button
                                onClick={() => handleEdit(product)}
                                className="text-blue-600 hover:text-blue-900"
                              >
                                <Pencil className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => deleteProduct(product._id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Orders Management */}
            {activeTab === "orders" && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Customer</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Total</th>
                        <th className="px-6 py-3 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-100">
                      {orders.map((order) => (
                        <tr key={order._id} className="hover:bg-gray-50">
                          {/* Customer Info */}
                          <td className="px-6 py-4">
                            <div className="flex items-center">
                              <img
                                className="h-10 w-10 rounded-full object-cover border"
                                src={order.userId?.profilePicture || "https://via.placeholder.com/40"}
                                alt=""
                              />
                              <div className="ml-4">
                                <p className="text-sm font-semibold text-gray-800">{order.userId?.name}</p>
                                <p className="text-sm text-gray-500">{order.userId?.email}</p>
                              </div>
                            </div>
                          </td>

                          {/* Date */}
                          <td className="px-6 py-4 text-sm text-gray-700">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </td>

                          {/* Status */}
                          <td className="px-6 py-4">
                            <select
                              defaultValue={order.orderStatus}
                              className="text-xs font-medium rounded-md bg-gray-100 text-gray-700 py-1 px-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                              onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                            >
                              <option value="processing">Processing</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>

                          {/* Total */}
                          <td className="px-6 py-4 text-sm text-gray-900 font-semibold">
                            ₹{order.totalAmount}
                          </td>

                          {/* Actions */}
                          <td className="px-6 py-4 space-x-2">
                            <button
                              onClick={() => openOrderDetails(order)}
                              className="text-xs font-semibold text-blue-600 hover:text-blue-800 underline"
                            >
                              View
                            </button>

                            <button
                              onClick={() => handleDeleteOrder(order._id)}
                              className="text-xs font-semibold text-red-600 hover:text-red-800 underline"
                            >
                              Delete
                            </button>
                          </td>

                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {console.log(selectedOrder)}


                {/* Modal for Order Details - Optional */}
                {selectedOrder && (
                  <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-2xl">
                      <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold text-gray-800">Order Details</h2>
                        <button onClick={() => setSelectedOrder(null)} className="text-gray-500 hover:text-red-500">✕</button>
                      </div>
                      <div className="space-y-2 max-h-80 overflow-y-auto">
                        {selectedOrder.items?.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between border-b pb-2">
                            <div className="flex items-center gap-3">
                              <img src={item.img || "/placeholder.jpg"} className="w-10 h-10 object-cover rounded" />
                              <div>
                                <p className="font-medium text-sm">{item.title}</p>
                                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                              </div>
                            </div>
                            <div className="font-semibold text-gray-700">₹{item.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}


            {/* Users Management */}
            {activeTab === "users" && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <img
                          src={user.profilePicture || "https://via.placeholder.com/60"}
                          alt=""
                          className="h-16 w-16 rounded-full"
                        />
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            {user.name}
                          </h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === "admin"
                            ? "bg-purple-100 text-purple-800"
                            : "bg-blue-100 text-blue-800"
                            }`}>
                            {user.role}
                          </span>
                        </div>
                      </div>
                      {user.role !== "admin" && (
                        <button
                          onClick={() => deleteUser(user._id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500">Orders</p>
                        <p className="text-lg font-semibold">{user.orderCount || 0}</p>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-gray-500">Total Spent</p>
                        <p className="text-lg font-semibold">
                          ₹{user.totalSpent || 0}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Contacts Management */}
            {activeTab === "contacts" && (

              <div className="space-y-6 px-4 sm:px-6 lg:px-8">
                
                {contacts.map((contact) => (
                  <div
                    key={contact._id || contact.message}
                    className="bg-white rounded-lg shadow-sm p-4 sm:p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                      <div className="w-full sm:w-auto">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                          {contact.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 break-words">
                          {contact.email}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
                        <span className="text-xs sm:text-sm text-gray-500">
                          {new Date(contact.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 break-words">
                      {contact.message}
                    </p>
                  </div>
                ))}
              </div>
            )
            }
          </main>
        </div>
      </div>
    </div>
  );
};


// Dashboard Card Component
const DashboardCard = ({ title, value, icon: Icon, color }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    green: "bg-green-50 text-green-600",
    purple: "bg-purple-50 text-purple-600",
    yellow: "bg-yellow-50 text-yellow-600"
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center">
        <div className={`p-3 rounded-lg ${colors[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="ml-4">
          <h3 className="text-sm font-medium text-gray-500">{title}</h3>
          <p className="text-2xl font-semibold text-gray-900">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Admin2;
