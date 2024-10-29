import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../states/slices/authThunk';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
export default function Login() {
    const dispatch = useDispatch();
    const { userInfo } = useSelector((state)=> state.auth );
    console.log('userInfo: ', userInfo);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = {
        email: formData.email,
        password: formData.password,
    };
    await dispatch(login({ data, onSuccess:()=>{} }));
    const token = Cookies.get('token');
    if(token){
        navigate('/')
    }
    } 



  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-lg">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-indigo-500 rounded hover:bg-indigo-600 transition duration-200"
          >
            Log In
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Dont have an account? <a href="/signup" className="text-indigo-500 hover:underline">Sign up</a>
        </p>
      </div>
    </div>
  );
}