
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useToast } from "@/hooks/use-toast";
import { isAuthenticated } from '@/utils/auth';

const Index = () => {
  const isLoggedIn = isAuthenticated();
  const { toast } = useToast();
  
  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Thanks for subscribing!",
      description: "You'll receive our latest updates soon.",
    });
  };

  const products = {
    handbags: [
      { id: 1, name: "Manhattan Tote", price: "$298", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=870&auto=format&fit=crop" },
      { id: 2, name: "Knott Shoulder Bag", price: "$248", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?q=80&w=1171&auto=format&fit=crop" },
      { id: 3, name: "Spade Flower Jacquard", price: "$328", image: "https://images.unsplash.com/photo-1559563458-527698bf5295?q=80&w=870&auto=format&fit=crop" },
      { id: 4, name: "Sam Icon Mini", price: "$198", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=869&auto=format&fit=crop" }
    ],
    wallets: [
      { id: 1, name: "Spade Flower Bifold", price: "$158", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=870&auto=format&fit=crop" },
      { id: 2, name: "Staci Slim Card", price: "$98", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=387&auto=format&fit=crop" },
      { id: 3, name: "Spencer Zip-Around", price: "$188", image: "https://images.unsplash.com/photo-1606503825008-909a67e63c3d?q=80&w=1064&auto=format&fit=crop" }
    ],
    jewelry: [
      { id: 1, name: "Pearl Drop Earrings", price: "$78", image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=387&auto=format&fit=crop" },
      { id: 2, name: "Knot Pendant", price: "$88", image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?q=80&w=388&auto=format&fit=crop" },
      { id: 3, name: "Heart Bracelet", price: "$68", image: "https://images.unsplash.com/photo-1603974372039-adc49044b6bd?q=80&w=1064&auto=format&fit=crop" }
    ],
    watches: [
      { id: 1, name: "Metro Watch", price: "$225", image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=694&auto=format&fit=crop" },
      { id: 2, name: "Park Row", price: "$175", image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?q=80&w=1020&auto=format&fit=crop" }
    ],
    clothing: [
      { id: 1, name: "Tweed Dress", price: "$398", image: "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?q=80&w=872&auto=format&fit=crop" },
      { id: 2, name: "Silk Blouse", price: "$228", image: "https://images.unsplash.com/photo-1533659828870-95ee305cee3e?q=80&w=387&auto=format&fit=crop" },
      { id: 3, name: "Pleated Skirt", price: "$178", image: "https://images.unsplash.com/photo-1528841684330-994c5cca9d69?q=80&w=387&auto=format&fit=crop" }
    ]
  };

  const ProductSection = ({ title, items, id }: { title: string, items: any[], id: string }) => (
    <section id={id} className="py-16">
      <div className="kate-container">
        <h2 className="text-3xl font-bold mb-8 text-center kate-heading">{title}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map(item => (
            <div key={item.id} className="kate-card">
              <div className="h-64 overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="text-katespade-gray mt-1">{item.price}</p>
                <button className="kate-btn-primary w-full mt-3 text-sm py-2">Add to Bag</button>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link to="#" className="kate-btn-secondary">View All {title}</Link>
        </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar isLoggedIn={isLoggedIn} />
      
      {/* Hero Section */}
      <section className="relative bg-katespade-cream">
        <div className="kate-container py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold kate-heading mb-4">Spring Collection</h1>
            <p className="text-xl mb-8 max-w-md">Discover our new arrivals. Bold colors and playful designs for the season ahead.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Link to="#handbags" className="kate-btn-primary">Shop Handbags</Link>
              <Link to="#clothing" className="kate-btn-secondary">Explore Collection</Link>
            </div>
          </div>
          <div className="md:w-1/2">
            <div className="relative">
              <div className="dot-pattern absolute inset-0 opacity-20 z-0"></div>
              <img 
                src="https://images.unsplash.com/photo-1591561954555-607968c989ab?q=80&w=1074&auto=format&fit=crop" 
                alt="Spring Collection" 
                className="relative z-10 rounded-lg shadow-xl max-h-[500px] w-full object-cover"
              />
              <div className="absolute -bottom-4 -right-4 h-24 w-24 bg-katespade-pink rounded-full z-0"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Categories Banner */}
      <section className="bg-white py-12">
        <div className="kate-container">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {['Handbags', 'Wallets', 'Jewelry', 'Watches', 'Clothing'].map((category, index) => (
              <Link 
                key={index} 
                to={`#${category.toLowerCase()}`} 
                className="bg-katespade-black text-white p-4 rounded-md text-center hover:bg-katespade-pink transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Product Sections */}
      <ProductSection title="Handbags" items={products.handbags} id="handbags" />
      <ProductSection title="Wallets" items={products.wallets} id="wallets" />
      <ProductSection title="Jewelry" items={products.jewelry} id="jewelry" />
      <ProductSection title="Watches" items={products.watches} id="watches" />
      <ProductSection title="Clothing" items={products.clothing} id="clothing" />
      
      {/* Newsletter Section */}
      <section className="bg-katespade-cream py-16">
        <div className="kate-container text-center">
          <h2 className="text-3xl font-bold mb-4 kate-heading">Join Our Community</h2>
          <p className="mb-8 max-w-md mx-auto">Sign up to receive our newsletter and get 10% off your first order.</p>
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow px-4 py-3 focus:outline-none border-2 border-r-0 border-katespade-black"
              required
            />
            <button 
              type="submit" 
              className="kate-btn-primary border-2 border-katespade-pink rounded-none"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
