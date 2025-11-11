// src/App.tsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { CookieConsentProvider } from './contexts/CookieConsentContext';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';
import AuthLayout from './layouts/AuthLayout';

// Public Pages
import Home from './pages/public/Home';
import Products from './pages/public/Products';
import ProductDetail from './pages/public/ProductDetail';
import Contact from './pages/public/Contact';
import About from './pages/public/About';
import FAQs from './pages/public/FAQs';
import Solar from './pages/public/Solar';
import Privacy from './pages/public/Privacy';
import Terms from './pages/public/Terms';
import CookiePolicy from './pages/public/CookiePolicy';
import NotFound from './pages/public/NotFound';
import DealerList from './pages/admin/dealers/DealerList';
// Auth Pages
import Login from './pages/auth/Login';
import ForgotPassword from './pages/auth/ForgotPassword';

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/products/ProductList';
import ProductForm from './pages/admin/products/ProductForm';
import CategoryList from './pages/admin/categories/CategoryList';
import BannerList from './pages/admin/banners/BannerList';
import SectionList from './pages/admin/sections/SectionList';
import MenuList from './pages/admin/menus/MenuList';
import ContactList from './pages/admin/contacts/ContactList';
import ContactDetail from './pages/admin/contacts/ContactDetail';
import FAQList from './pages/admin/faqs/FAQList';
import MediaLibrary from './pages/admin/media/MediaLibrary';
import Settings from './pages/admin/settings/Settings';
import AdminList from './pages/admin/admins/AdminList';
import Profile from './pages/admin/Profile';

// Components
import ProtectedRoute from './components/shared/ProtectedRoute';
import BecomePartner from "@/pages/public/BecomePartner.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // 5 minutes
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <CookieConsentProvider>
                    <Router>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<PublicLayout />}>
                                <Route index element={<Home />} />
                                <Route path="products" element={<Products />} />
                                <Route path="products/:slug" element={<ProductDetail />} />
                                <Route path="contact" element={<Contact />} />
                                <Route path="about" element={<About />} />
                                <Route path="faqs" element={<FAQs />} />
                                <Route path="solar" element={<Solar />} />
                                <Route path="dealer-locator" element={<BecomePartner />} />
                                <Route path="privacy" element={<Privacy />} />
                                <Route path="terms" element={<Terms />} />
                                <Route path="cookie-policy" element={<CookiePolicy />} />
                                <Route path="*" element={<NotFound />} />
                            </Route>

                            {/* Auth Routes */}
                            <Route path="/admin" element={<AuthLayout />}>
                                <Route path="login" element={<Login />} />
                                <Route path="forgot-password" element={<ForgotPassword />} />
                            </Route>

                            {/* Admin Routes */}
                            <Route
                                path="/admin"
                                element={
                                    <ProtectedRoute>
                                        <AdminLayout />
                                    </ProtectedRoute>
                                }
                            >
                                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                                <Route path="dashboard" element={<Dashboard />} />

                                {/* Products */}
                                <Route path="products" element={<ProductList />} />
                                <Route path="products/new" element={<ProductForm />} />
                                <Route path="products/:id/edit" element={<ProductForm />} />

                                {/* Categories */}
                                <Route path="categories" element={<CategoryList />} />

                                {/* Banners */}
                                <Route path="banners" element={<BannerList />} />

                                {/* Sections */}
                                <Route path="sections" element={<SectionList />} />

                                {/* Menus */}
                                <Route path="menus" element={<MenuList />} />

                                {/* Contacts */}
                                <Route path="contacts" element={<ContactList />} />
                                <Route path="contacts/:id" element={<ContactDetail />} />
                                <Route path="dealers" element={<DealerList />} />
                                {/* FAQs */}
                                <Route path="faqs" element={<FAQList />} />

                                {/* Media */}
                                <Route path="media" element={<MediaLibrary />} />

                                {/* Settings */}
                                <Route path="settings" element={<Settings />} />

                                {/* Admins */}
                                <Route path="admins" element={<AdminList />} />

                                {/* Profile */}
                                <Route path="profile" element={<Profile />} />
                            </Route>
                        </Routes>

                        <Toaster
                            position="top-right"
                            toastOptions={{
                                duration: 4000,
                                style: {
                                    background: '#363636',
                                    color: '#fff',
                                },
                                success: {
                                    iconTheme: {
                                        primary: '#4ade80',
                                        secondary: '#fff',
                                    },
                                },
                                error: {
                                    iconTheme: {
                                        primary: '#ef4444',
                                        secondary: '#fff',
                                    },
                                },
                            }}
                        />
                    </Router>
                </CookieConsentProvider>
            </AuthProvider>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default App;