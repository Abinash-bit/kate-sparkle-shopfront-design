
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { getProfile } from '@/services/api';
import { isAuthenticated, removeToken } from '@/utils/auth';

interface ProfileData {
  email: string;
  dob: string;
  gender: string;
}

const ProfilePage = () => {
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated()) {
      toast({
        title: "Authentication required",
        description: "Please login to view your profile.",
        variant: "destructive"
      });
      navigate('/login');
      return;
    }
    
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfileData(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        // If unauthorized, redirect to login
        if ((error as any)?.message?.includes('Authentication')) {
          removeToken();
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, [navigate, toast]);

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not provided';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const capitalizeFirstLetter = (string: string) => {
    if (!string) return 'Not provided';
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleEditProfile = () => {
    navigate('/complete-profile');
  };

  const handleLogout = () => {
    removeToken();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account.",
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={true} />
      
      <div className="flex-grow py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold kate-heading mb-8 text-center">My Profile</h1>
          
          {loading ? (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p>Loading your profile information...</p>
            </div>
          ) : profileData ? (
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Profile Information</h2>
                <button 
                  onClick={handleEditProfile}
                  className="kate-btn-secondary text-sm py-2"
                >
                  Edit Profile
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="border-b pb-4">
                  <p className="text-sm font-medium text-gray-500">Email</p>
                  <p className="mt-1 text-lg">{profileData.email}</p>
                </div>
                
                <div className="border-b pb-4">
                  <p className="text-sm font-medium text-gray-500">Date of Birth</p>
                  <p className="mt-1 text-lg">{formatDate(profileData.dob)}</p>
                </div>
                
                <div>
                  <p className="text-sm font-medium text-gray-500">Gender</p>
                  <p className="mt-1 text-lg">{capitalizeFirstLetter(profileData.gender)}</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-semibold mb-4">Account Options</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={handleLogout}
                    className="kate-btn-primary bg-red-500 hover:bg-red-600"
                  >
                    Log Out
                  </button>
                  <button className="kate-btn-secondary">Change Password</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-md text-center">
              <p className="text-red-500">Failed to load profile information. Please try again later.</p>
              <button 
                onClick={() => window.location.reload()}
                className="kate-btn-primary mt-4"
              >
                Retry
              </button>
            </div>
          )}
          
          <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-6">Recent Orders</h2>
            <div className="text-center py-8 text-gray-500">
              <p>You haven't placed any orders yet.</p>
              <button className="kate-btn-primary mt-4">Start Shopping</button>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ProfilePage;
