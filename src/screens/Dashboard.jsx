import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../../components/Card';
import Table from '../../components/Table';
import Navbar from '../../components/Navbar';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, usersRes] = await Promise.all([
          axios.get('/api/products'),
          axios.get('/api/users')
        ]);
        setProducts(productsRes.data);
        setUsers(usersRes.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const userColumns = [
    { header: 'ID', field: 'id' },
    { header: 'Username', field: 'username' },
    { header: 'Admin', field: 'is_admin', 
      render: (user) => user.is_admin ? 'Yes' : 'No' },
    { header: 'Staff', field: 'is_staff',
      render: (user) => user.is_staff ? 'Yes' : 'No' },
    { header: 'Active', field: 'is_active',
      render: (user) => user.is_active ? 'Yes' : 'No' },
    { header: 'Actions',
      render: (user) => (
        <Link to={`/user/${user.id}`} className="text-blue-600 hover:text-blue-800">
          View Details
        </Link>
      )
    }
  ];

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {products.map(product => (
            <Card key={product._id} product={product} />
          ))}
        </div>

        <h1 className="text-2xl font-bold mb-6">Users</h1>
        <Table data={users} columns={userColumns} />
      </div>
    </div>
  );
};

export default Dashboard;