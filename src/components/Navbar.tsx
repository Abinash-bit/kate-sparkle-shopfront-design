
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

interface NavbarProps {
  isLoggedIn?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn = false }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  
  const handleLogout = () => {
    localStorage.removeItem('access_token');
    toast({
      title: "Logged out successfully",
      description: "You have been successfully logged out.",
    });
    window.location.href = '/';
  };

  return (
    <nav className="bg-white shadow-sm py-4">
      <div className="kate-container flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-katespade-black">kate spade</h1>
          <span className="text-xs text-katespade-gray ml-1 mt-4">new york</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-katespade-gray hover:text-katespade-black font-medium">Home</Link>
          <Link to="/#handbags" className="text-katespade-gray hover:text-katespade-black font-medium">Handbags</Link>
          <Link to="/#wallets" className="text-katespade-gray hover:text-katespade-black font-medium">Wallets</Link>
          <Link to="/#jewelry" className="text-katespade-gray hover:text-katespade-black font-medium">Jewelry</Link>
          <Link to="/#watches" className="text-katespade-gray hover:text-katespade-black font-medium">Watches</Link>
          <Link to="/#clothing" className="text-katespade-gray hover:text-katespade-black font-medium">Clothing</Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="text-katespade-gray hover:text-katespade-black font-medium">Sign In</Link>
              <Link to="/signup" className="kate-btn-primary">Sign Up</Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="text-katespade-gray hover:text-katespade-black font-medium">My Profile</Link>
              <button onClick={handleLogout} className="kate-btn-secondary">Log Out</button>
            </>
          )}
        </div>
        
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-katespade-gray"
        >
          {mobileMenuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>
      
      {mobileMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link to="/" className="text-katespade-gray hover:text-katespade-black font-medium">Home</Link>
            <Link to="/#handbags" className="text-katespade-gray hover:text-katespade-black font-medium">Handbags</Link>
            <Link to="/#wallets" className="text-katespade-gray hover:text-katespade-black font-medium">Wallets</Link>
            <Link to="/#jewelry" className="text-katespade-gray hover:text-katespade-black font-medium">Jewelry</Link>
            <Link to="/#watches" className="text-katespade-gray hover:text-katespade-black font-medium">Watches</Link>
            <Link to="/#clothing" className="text-katespade-gray hover:text-katespade-black font-medium">Clothing</Link>
            
            <div className="pt-4 border-t border-gray-200">
              {!isLoggedIn ? (
                <>
                  <Link to="/login" className="kate-btn-secondary w-full block text-center mb-2">Sign In</Link>
                  <Link to="/signup" className="kate-btn-primary w-full block text-center">Sign Up</Link>
                </>
              ) : (
                <>
                  <Link to="/profile" className="kate-btn-secondary w-full block text-center mb-2">My Profile</Link>
                  <button onClick={handleLogout} className="kate-btn-primary w-full block text-center">Log Out</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
