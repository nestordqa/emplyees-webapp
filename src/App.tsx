import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import { AuthProvider } from './context/useAuthContext';
import Register from './pages/Register';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} index/>
          <Route path="/register" element={<Register />} />
          
          {/* <Route element={<ProtectedRoute />}>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/employees" element={<EmployeeList />} />
          </Route> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
