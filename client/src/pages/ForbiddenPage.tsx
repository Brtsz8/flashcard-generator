import { Link } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';

export default function ForbiddenPage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-9xl font-bold text-gray-800">403</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mt-4">Access Forbidden</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          You do not have permission to access this page. Please log in with an account that has access or register to continue.
        </p>
        <div className="mt-8 space-x-4">
          <Link 
            to="/login" 
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
          >
            Login
          </Link>
          <Link 
            to="/register" 
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Register
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

