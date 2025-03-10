import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/useAuthContext';
import Register from './pages/Register';
import ProtectedRoute from './utils/ProtectedRoute';
import EmployeeList from './pages/EmployeesList';
import Navbar from './components/layout/Navbar';

function App() {
	return (
		<AuthProvider>
			<BrowserRouter>
				<Navbar />
				<Routes>
					<Route path="/" element={<Login />} index/>
					<Route path="/register" element={<Register />} />
					
					<Route element={<ProtectedRoute />}>
						<Route path="/employees" element={<EmployeeList />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
	);
}

export default App;
