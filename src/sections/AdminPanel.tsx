import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Shield, Lock, Plus, Edit2, Trash2, Save, 
  Star, Check, AlertCircle, Search 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useProducts } from '@/hooks/useProducts';
import type { Product, ProductFormData } from '@/types/product';

const ADMIN_PASSWORD = 'admin123'; // In production, use proper authentication

const categories = [
  { id: 'machinery', name: 'Machinery' },
  { id: 'electronics', name: 'Electronics' },
  { id: 'textiles', name: 'Textiles' },
  { id: 'medical', name: 'Medical' },
  { id: 'construction', name: 'Construction' },
];

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdminPanel({ isOpen, onClose }: AdminPanelProps) {
  const { t } = useTranslation();
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);
  
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    nameZh: '',
    nameEs: '',
    nameAr: '',
    description: '',
    descriptionZh: '',
    descriptionEs: '',
    descriptionAr: '',
    price: 0,
    category: 'machinery',
    image: '',
    certification: [],
    moq: '',
    featured: false,
  });

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      nameZh: '',
      nameEs: '',
      nameAr: '',
      description: '',
      descriptionZh: '',
      descriptionEs: '',
      descriptionAr: '',
      price: 0,
      category: 'machinery',
      image: '',
      certification: [],
      moq: '',
      featured: false,
    });
    setSelectedProduct(null);
  };

  const handleAddNew = () => {
    resetForm();
    setIsEditDialogOpen(true);
  };

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setFormData({
      name: product.name,
      nameZh: product.nameZh || '',
      nameEs: product.nameEs || '',
      nameAr: product.nameAr || '',
      description: product.description,
      descriptionZh: product.descriptionZh || '',
      descriptionEs: product.descriptionEs || '',
      descriptionAr: product.descriptionAr || '',
      price: product.price,
      category: product.category,
      image: product.image,
      certification: product.certification,
      moq: product.moq,
      featured: product.featured,
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    if (selectedProduct) {
      deleteProduct(selectedProduct.id);
      setIsDeleteDialogOpen(false);
      setSelectedProduct(null);
    }
  };

  const handleSave = () => {
    if (selectedProduct) {
      updateProduct(selectedProduct.id, formData);
    } else {
      addProduct(formData);
    }
    setIsEditDialogOpen(false);
    resetForm();
  };

  const handleCertificationChange = (cert: string) => {
    setFormData((prev) => ({
      ...prev,
      certification: prev.certification.includes(cert)
        ? prev.certification.filter((c) => c !== cert)
        : [...prev.certification, cert],
    }));
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#1a1a1a] flex items-center gap-2">
            <Shield className="w-6 h-6 text-[#f2fe6f]" />
            {t('admin.title')}
          </DialogTitle>
        </DialogHeader>

        {!isLoggedIn ? (
          <div className="py-12">
            <div className="max-w-md mx-auto text-center">
              <div className="w-20 h-20 bg-[#f2fe6f]/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Lock className="w-10 h-10 text-[#f2fe6f]" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
                {t('admin.login')}
              </h3>
              <p className="text-gray-500 mb-6">
                Please enter the admin password to continue
              </p>
              <div className="space-y-4">
                <Input
                  type="password"
                  placeholder={t('admin.password')}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
                  className="h-12"
                />
                {loginError && (
                  <div className="flex items-center gap-2 text-red-500 text-sm">
                    <AlertCircle className="w-4 h-4" />
                    Incorrect password
                  </div>
                )}
                <Button onClick={handleLogin} className="w-full btn-primary">
                  {t('admin.loginBtn')}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="py-6">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-3">
                <Button onClick={handleAddNew} className="btn-primary flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  {t('admin.addNew')}
                </Button>
                <Button variant="outline" onClick={handleLogout}>
                  {t('admin.logout')}
                </Button>
              </div>
            </div>

            {/* Products Table */}
            <div className="border rounded-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Product</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Category</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Price</th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                    <th className="px-4 py-3 text-right text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-[#1a1a1a]">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.moq}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="secondary">{product.category}</Badge>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        ${product.price.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          {product.featured && (
                            <Badge className="bg-[#f2fe6f] text-[#1a1a1a]">
                              <Star className="w-3 h-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(product)}
                            className="hover:bg-[#f2fe6f]/20"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(product)}
                            className="hover:bg-red-100 text-red-500"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </DialogContent>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedProduct ? t('admin.editProduct') : t('admin.addNew')}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {/* Basic Info */}
            <div className="space-y-2">
              <Label>Product Name (English) *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Product name"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="space-y-2">
                <Label>中文名称</Label>
                <Input
                  value={formData.nameZh}
                  onChange={(e) => setFormData({ ...formData, nameZh: e.target.value })}
                  placeholder="中文名称"
                />
              </div>
              <div className="space-y-2">
                <Label>Nombre (Español)</Label>
                <Input
                  value={formData.nameEs}
                  onChange={(e) => setFormData({ ...formData, nameEs: e.target.value })}
                  placeholder="Nombre"
                />
              </div>
              <div className="space-y-2">
                <Label>الاسم (العربية)</Label>
                <Input
                  value={formData.nameAr}
                  onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
                  placeholder="الاسم"
                  dir="rtl"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Description (English) *</Label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Product description"
                rows={3}
              />
            </div>

            {/* Price & Category */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Price (USD) *</Label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                  placeholder="0.00"
                />
              </div>
              <div className="space-y-2">
                <Label>Category *</Label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full h-10 px-3 border rounded-md"
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <Label>Image URL *</Label>
              <Input
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://..."
              />
            </div>

            {/* MOQ */}
            <div className="space-y-2">
              <Label>Minimum Order Quantity (MOQ) *</Label>
              <Input
                value={formData.moq}
                onChange={(e) => setFormData({ ...formData, moq: e.target.value })}
                placeholder="e.g., 100 Pieces"
              />
            </div>

            {/* Certifications */}
            <div className="space-y-2">
              <Label>Certifications</Label>
              <div className="flex flex-wrap gap-2">
                {['CE', 'ISO 9001', 'FDA', 'RoHS', 'UL', 'HACCP', 'GOTS'].map((cert) => (
                  <Badge
                    key={cert}
                    variant={formData.certification.includes(cert) ? 'default' : 'outline'}
                    className={`cursor-pointer ${
                      formData.certification.includes(cert) ? 'bg-[#f2fe6f] text-[#1a1a1a]' : ''
                    }`}
                    onClick={() => handleCertificationChange(cert)}
                  >
                    {formData.certification.includes(cert) && (
                      <Check className="w-3 h-3 mr-1" />
                    )}
                    {cert}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Featured */}
            <div className="flex items-center justify-between">
              <Label>Featured Product</Label>
              <Switch
                checked={formData.featured}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, featured: checked })
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              {t('admin.cancel')}
            </Button>
            <Button onClick={handleSave} className="btn-primary">
              <Save className="w-4 h-4 mr-2" />
              {t('admin.save')}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {t('admin.confirmDelete')}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteDialogOpen(false)}>
              {t('admin.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-500 hover:bg-red-600"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t('admin.delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Dialog>
  );
}
