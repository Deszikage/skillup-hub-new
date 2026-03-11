import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Download, ShoppingCart, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface Product {
  id: string;
  title: string;
  description: string;
  price_kobo: number;
  image_url: string;
  file_url: string;
}

const StorePage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [ownedProducts, setOwnedProducts] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
    if (user) {
      fetchPurchases();
    }
  }, [user]);

 const fetchProducts = async () => {
    const { data, error } = await (supabase as any)
      .from("products")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: true });

    if (!error && data) setProducts(data);
    setLoading(false);
  };

  const fetchPurchases = async () => {
    if (!user) return;
    const { data, error } = await (supabase as any)
      .from("purchases")
      .select("product_id")
      .eq("user_id", user.id);

    if (!error && data) {
      setOwnedProducts(data.map((p: any) => p.product_id));
    }
  };

  const formatPrice = (kobo: number) => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
      maximumFractionDigits: 0,
    }).format(kobo / 100);
  };

  const handleBuy = (product: Product) => {
    if (!user || !user.email) {
      toast({ title: "Sign in required", description: "Please sign in to make a purchase.", variant: "destructive" });
      navigate("/auth");
      return;
    }

    const handler = (window as any).PaystackPop?.setup({
      key: "pk_live_5acf6b90f4ce5aa4fb0c2697e8ff3f4c78adaacf",
      email: user.email,
      amount: product.price_kobo,
      currency: "NGN",
      ref: `store_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`,
      callback: async (response: any) => {
        const { error } = await (supabase as any).from("purchases").insert({
          user_id: user.id,
          product_id: product.id,
          paystack_reference: response.reference,
          amount_paid: product.price_kobo,
        });

        if (error) {
          toast({ title: "Error", description: "Payment went through, but we couldn't verify the product. Please contact support.", variant: "destructive" });
        } else {
          setOwnedProducts((prev) => [...prev, product.id]);
          toast({ title: "Purchase Successful! 🎉", description: "You can now download your item." });
        }
      },
      onClose: () => toast({ title: "Payment cancelled", description: "You can complete your purchase anytime." }),
    });

    if (handler) handler.openIframe();
  };

  const handleDownload = (product: Product) => {
    if (!product.file_url) {
      toast({ title: "Coming Soon", description: "The download file is being prepared by the admin." });
      return;
    }
    window.open(product.file_url, "_blank");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar /> {/* <-- Adds your top menu */}
      
      <main className="flex-grow pt-24 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
           <h1 className="text-4xl font-display font-bold mb-4">
  Digital <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-500">Resource Store</span>
</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Accelerate your tech career with our premium templates, cheat sheets, and starter kits. Buy once, keep forever.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">Loading store items...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => {
                const isOwned = ownedProducts.includes(product.id);
                
                return (
                  <Card key={product.id} className="flex flex-col overflow-hidden border-border/50 hover:border-primary/50 transition-colors">
                    <div className="h-48 overflow-hidden relative">
                      <img src={product.image_url} alt={product.title} className="w-full h-full object-cover transition-transform hover:scale-105" />
                      {isOwned && (
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded font-bold flex items-center gap-1">
                          <Lock className="w-3 h-3" /> OWNED
                        </div>
                      )}
                    </div>
                    <CardHeader>
                      <CardTitle className="line-clamp-2">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <CardDescription className="text-base line-clamp-3">{product.description}</CardDescription>
                    </CardContent>
                   <CardFooter className="flex justify-between items-center border-t pt-6 bg-muted/20">
                      <span className="font-bold text-xl">{formatPrice(product.price_kobo)}</span>
                      {isOwned ? (
                        <Button onClick={() => handleDownload(product)} variant="default" className="gap-2">
                          <Download className="w-4 h-4" /> Download
                        </Button>
                      ) : (
                        <Button onClick={() => handleBuy(product)} variant="outline" className="gap-2">
                          <ShoppingCart className="w-4 h-4" /> Buy Now
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer /> {/* <-- Adds your bottom links */}
    </div>
  );
};

export default StorePage;