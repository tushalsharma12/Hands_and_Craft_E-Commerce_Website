import { useEffect, useState } from "react";
import axios from "axios";

const Admin = () => {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ img: "", 
    title: "", 
    rating: "", 
    price: "", 
    prev_price: "", 
    discount: "" });
  const [editingProduct, setEditingProduct] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState("name");
//   const [currentPage, setCurrentPage] = useState(1);
//   const productsPerPage = 5; // Pagination limit

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      await axios.post("http://localhost:5000/api/products/add", newProduct);
      setNewProduct({ img: "", 
        title: "", 
        rating: "", 
        price: "", 
        prev_price: "", 
        discount: ""  });
      fetchProducts();
      alert("Product Added Successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/update/${editingProduct._id}`, editingProduct);
      setEditingProduct(null);
      fetchProducts();
      alert("Product Updated Successfully!");
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  
//   const filteredProducts = products
//     .filter((product) => product.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     .sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));

//   const indexOfLastProduct = currentPage * productsPerPage;
//   const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
//   const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      {/* 🔍 Search & Sorting */}
      {/* <input
        type="text"
        placeholder="Search Product"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select onChange={(e) => setSortBy(e.target.value)}>
        <option value="name">Sort by Name</option>
        <option value="price">Sort by Price</option>
      </select> */}

      {/* ➕ Add New Product */}
      <div>
        <h3>Add New Product</h3>
        <input type="text" placeholder="Title" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
        <input type="text" placeholder="Rating" value={newProduct.rating} onChange={(e) => setNewProduct({ ...newProduct, rating: e.target.value })} />
        <input type="text" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
        <input type="text" placeholder="Previous Price" value={newProduct.prev_price} onChange={(e) => setNewProduct({ ...newProduct, prev_price: e.target.value })} />
        <input type="text" placeholder="Discount" value={newProduct.discount} onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })} />
        <input type="text" placeholder="Image URL" value={newProduct.img} onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })} />
        <button onClick={handleAddProduct}>Add Product</button>
      </div>

      {/* ✏ Edit Product */}
      {editingProduct && (
        <div>
          <h3>Edit Product</h3>
          <input type="text" placeholder="Title" value={editingProduct.title} onChange={(e) => setEditingProduct({ ...editingProduct, title: e.target.value })} />
          <input type="text" placeholder="Rating" value={editingProduct.rating} onChange={(e) => setEditingProduct({ ...editingProduct, rating: e.target.value })} />
          <input type="text" placeholder="Price" value={editingProduct.price} onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })} />
          <input type="text" placeholder="Previous Price" value={editingProduct.prev_price} onChange={(e) => setEditingProduct({ ...editingProduct, prev_price: e.target.value })} />
          <input type="text" placeholder="Discount" value={editingProduct.discount} onChange={(e) => setEditingProduct({ ...editingProduct, discount: e.target.value })} />
          <input type="text" placeholder="Image URL" value={editingProduct.img} onChange={(e) => setEditingProduct({ ...editingProduct, img: e.target.value })} />
          <button onClick={handleUpdateProduct}>Update Product</button>
        </div>
      )}

      {/* 📋 Show All Products */}
      <h3>All Products</h3>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {products.map((product) => (
          <li key={product._id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
            <h4>{product.title}</h4>
            <p>Rating: {product.rating}</p>
            <p>Price: {product.price}</p>
            <p>Previous Price: {product.prev_price}</p>
            <p>Discount: {product.discount}</p>
            <img src={product.img} alt={product.title} width="100" />
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;






// import{ useEffect, useState } from "react";
// import axios from "axios";

// const Admin = () => {
//   const [products, setProducts] = useState([]);
//   const [newProduct, setNewProduct] = useState({ 
//     img: "", 
//     title: "", 
//     rating: "", 
//     price: "", 
//     prev_price: "", 
//     discount: "" 
//   });

//   useEffect(() => {
//     fetchProducts();
//   }, []);

//   const fetchProducts = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/products");
//       setProducts(res.data);
//     } catch (error) {
//       console.error("Error fetching products:", error);
//     }
//   };

//   const handleAddProduct = async () => {
//     try {
//       await axios.post("http://localhost:5000/api/products/add", newProduct);
//       setNewProduct({  img: "", 
//         title: "", 
//         rating: "", 
//         price: "", 
//         prev_price: "", 
//         discount: ""  });
//       fetchProducts();
//       alert("Product Added Successfully!");
//     } catch (error) {
//       console.error("Error adding product:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm("Are you sure you want to delete this product?")) {
//       try {
//         await axios.delete(`http://localhost:5000/api/products/delete/${id}`);
//         fetchProducts();
//       } catch (error) {
//         console.error("Error deleting product:", error);
//       }
//     }
//   };

//   return (
//     <div>
//       <h2>Admin Dashboard</h2>

//       {/* Add New Product */}
//       <div>
//         <h3>Add New Product</h3>
//         <input type="text" placeholder="Name" value={newProduct.title} onChange={(e) => setNewProduct({ ...newProduct, title: e.target.value })} />
//         <input type="number" placeholder="Rating" value={newProduct.rating} onChange={(e) => setNewProduct({ ...newProduct, rating: Number(e.target.value) })} />
//         <input type="text" placeholder="Price" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} />
//         <input type="text" placeholder="Image URL" value={newProduct.img} onChange={(e) => setNewProduct({ ...newProduct, img: e.target.value })} />
//         <input type="text" placeholder="Previous Price" value={newProduct.prev_price} onChange={(e) => setNewProduct({ ...newProduct, prev_price: e.target.value })} />
//         <input type="text" placeholder="Discount" value={newProduct.discount} onChange={(e) => setNewProduct({ ...newProduct, discount: e.target.value })} />
//         <button onClick={handleAddProduct}>Add Product</button>
//       </div>

//       {/* Show All Products */}
//       <h3>All Products</h3>
//       {products.map((product) => (
//         <div key={product._id} style={{ border: "1px solid black", padding: "10px", margin: "10px" }}>
//           <h4>{product.title}</h4>
//           <p>Rating: {product.rating}</p>
//           <p>Price: {product.price}</p>
//           <p>Previous Price: {product.prev_price}</p>
//           <p>Discount: {product.discount}</p>
//           <img src={product.img} alt={product.title} width="100" />
//           <button onClick={() => handleDelete(product._id)}>Delete</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Admin;
