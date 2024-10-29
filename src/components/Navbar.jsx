import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../states/slices/authThunk";
import Cookies from "js-cookie";
export default function Navbar() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const Logout = () => {
        dispatch(logout());
        navigate('/login');
    }
    const token = Cookies.get('token');

    return (
        <nav className="bg-indigo-500 p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-white text-xl font-bold">To-Do List</h1>
                {!token ? (
                    <div>
                    <Link to="/login" className="text-white px-4 py-2 rounded hover:bg-indigo-600 transition duration-300">
                        Login
                    </Link>
                    <Link to="/signup" className="text-white px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition duration-300">
                        Sign Up
                    </Link>
                </div>
                ):(

                <button onClick={Logout} className="text-white px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-700 transition duration-300"> Logout </button>
                )}


            </div>
        </nav>
    );
};
