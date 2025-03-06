import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Rating from '../../components/Rating';

const ProductScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;
  if (!product) return <div className="text-center p-4">Product not found</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      
      <div className="container mx-auto p-4">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
        >
          Back
        </button>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 object-cover"
              />
            </div>
            
            <div className="p-6 md:w-1/2">
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
              
              <div className="mb-4">
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </div>

              <div className="text-2xl font-bold text-gray-800 mb-4">
                ${product.price.toFixed(2)}
              </div>

              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-gray-600">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="font-medium">Status</div>
                  <div className={product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}>
                    {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="font-medium">Category</div>
                  <div>{product.category}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="font-medium">Brand</div>
                  <div>{product.brand}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="font-medium">Stock</div>
                  <div>{product.countInStock}</div>
                </div>
              </div>

              {product.countInStock > 0 && (
                <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                  Add to Cart
                </button>
              )}
            </div>
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <div className="p-6 border-t border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Reviews</h2>
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review._id} className="border-b border-gray-200 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{review.name}</div>
                      <Rating value={review.rating} />
                    </div>
                    <div className="text-gray-600">{review.comment}</div>
                    <div className="text-sm text-gray-500 mt-1">
                      {new Date(review.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;