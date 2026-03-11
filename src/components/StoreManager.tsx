import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, Save, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export const StoreManager = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const [showCreateProduct, setShowCreateProduct] = useState(false);
  const [newProductForm, setNewProductForm] = useState({
    title: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await (supabase as any)
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });
    if (!error && data) setProducts(data);
    setLoading(false);
  };

  const updateProduct = async (id: string, field: string, value: any) => {
    const { error } = await (supabase as any)
      .from("products")
      .update({ [field]: value })
      .eq("id", id);
    if (error) {
      toast({ title: "Error", description: "Failed to update product.", variant: "destructive" });
    } else {
      toast({ title: "Saved", description: "Product updated successfully." });
      fetchProducts();
    }
  };

  const createProduct = async () => {
    if (!newProductForm.title || !newProductForm.price) {
      toast({ title: "Error", description: "Title and price are required", variant: "destructive" });
      return;
    }

    const priceKobo = parseInt(newProductForm.price) * 100;

    const { error } = await (supabase as any).from("products").insert({
      title: newProductForm.title,
      description: newProductForm.description,
      price_kobo: priceKobo,
      is_active: false,
    });

    if (error) {
      toast({ title: "Error", description: "Failed to create product.", variant: "destructive" });
    } else {
      toast({ title: "Success! 🎉", description: "New product added." });
      setShowCreateProduct(false);
      setNewProductForm({ title: "", description: "", price: "" });
      fetchProducts();
    }
  };

  // --- NEW DELETE FUNCTION ---
  const deleteProduct = async (id: string) => {
    // Safety check so you don't accidentally click it
    if (!window.confirm("Are you sure you want to permanently delete this product? This cannot be undone.")) {
      return;
    }

    const { error } = await (supabase as any)
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {
      toast({ title: "Error", description: "Failed to delete product.", variant: "destructive" });
    } else {
      toast({ title: "Deleted", description: "Product removed successfully." });
      fetchProducts(); // Refresh the list
    }
  };

  const handleFileUpload = async (event: any, productId: string, column: "image_url" | "file_url") => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    const fileExt = file.name.split('.').pop();
    const filePath = `${productId}/${column}_${Math.random()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("store_assets")
      .upload(filePath, file);

    if (uploadError) {
      toast({ title: "Upload Failed", description: uploadError.message, variant: "destructive" });
      setUploading(false);
      return;
    }

    const { data: { publicUrl } } = supabase.storage.from("store_assets").getPublicUrl(filePath);

    await updateProduct(productId, column, publicUrl);
    setUploading(false);
  };

  if (loading) return <div className="text-center py-10"><Loader2 className="h-6 w-6 animate-spin mx-auto text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-display font-bold">Store Inventory</h2>
          <p className="text-sm text-muted-foreground">Manage your digital products and assets.</p>
        </div>
        <Button variant="hero" onClick={() => setShowCreateProduct(true)}>
          <Plus className="h-4 w-4 mr-2" /> Add New Product
        </Button>
      </div>

      <div className="space-y-6">
        {products.map((product) => (
          <div key={product.id} className="rounded-xl border border-border bg-card p-6">
            <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-4">
              <h3 className="font-display font-bold text-lg">{product.title}</h3>
              
              {/* --- UPDATED HEADER WITH DELETE BUTTON --- */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Active Status:</span>
                  <input
                    type="checkbox"
                    checked={product.is_active}
                    onChange={(e) => updateProduct(product.id, "is_active", e.target.checked)}
                    className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                  />
                </div>
                <Button variant="destructive" size="sm" className="h-8" onClick={() => deleteProduct(product.id)}>
                  <Trash2 className="h-3 w-3 mr-1" /> Delete
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Price (in Kobo - e.g. 500000 = ₦5,000)</label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      defaultValue={product.price_kobo}
                      onBlur={(e) => updateProduct(product.id, "price_kobo", parseInt(e.target.value))}
                    />
                    <Button variant="outline" size="icon"><Save className="h-4 w-4" /></Button>
                  </div>
                </div>
                
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Cover Image</label>
                  {product.image_url ? (
                    <img src={product.image_url} alt="Cover" className="h-24 w-auto rounded-md mb-2 border border-border" />
                  ) : (
                    <div className="text-xs text-destructive mb-2">No image uploaded</div>
                  )}
                  <div className="flex items-center gap-2">
                    <Input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, product.id, "image_url")} disabled={uploading} className="text-xs" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Description</label>
                  <Textarea
                    defaultValue={product.description}
                    onBlur={(e) => updateProduct(product.id, "description", e.target.value)}
                    className="h-[108px] resize-none"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Digital File (.zip, .pdf)</label>
                  {product.file_url ? (
                    <div className="text-xs text-green-500 mb-2 font-medium">✓ File securely attached</div>
                  ) : (
                    <div className="text-xs text-destructive mb-2 font-medium">No file attached yet</div>
                  )}
                  <div className="flex items-center gap-2">
                    <Input type="file" accept=".zip,.pdf,.rar" onChange={(e) => handleFileUpload(e, product.id, "file_url")} disabled={uploading} className="text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create Product Dialog */}
      <Dialog open={showCreateProduct} onOpenChange={setShowCreateProduct}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-display">Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Product Title</label>
              <Input
                placeholder="e.g. The Ultimate React Cheatsheet"
                value={newProductForm.title}
                onChange={(e) => setNewProductForm({ ...newProductForm, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Price (in Naira ₦)</label>
              <Input
                type="number"
                placeholder="e.g. 5000"
                value={newProductForm.price}
                onChange={(e) => setNewProductForm({ ...newProductForm, price: e.target.value })}
              />
              <p className="text-[10px] text-muted-foreground mt-1">We will automatically convert this to Kobo for Paystack.</p>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-1 block">Description</label>
              <Textarea
                placeholder="What is included in this digital product?"
                value={newProductForm.description}
                onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                className="resize-none h-24"
              />
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <Button variant="outline" size="sm" onClick={() => setShowCreateProduct(false)}>
                Cancel
              </Button>
              <Button variant="hero" size="sm" onClick={createProduct}>
                <Plus className="h-4 w-4 mr-1" /> Create Product
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};