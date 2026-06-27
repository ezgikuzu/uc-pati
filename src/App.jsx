import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import FloatingChatbot from "./components/FloatingChatbot";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Services from "./pages/public/Services";
import ServiceDetail from "./pages/public/ServiceDetail";
import Veterinarians from "./pages/public/Veterinarians";
import VetDetail from "./pages/public/VetDetail";
import Blog from "./pages/public/Blog";
import BlogDetail from "./pages/public/BlogDetail";
import FAQ from "./pages/public/FAQ";
import Chatbot from "./pages/public/Chatbot";
import Contact from "./pages/public/Contact";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Pets from "./pages/customer/Pets";
import Appointment from "./pages/customer/Appointment";
import MyAppointments from "./pages/customer/MyAppointments";
import HealthCard from "./pages/customer/HealthCard";
import AnimalPassport from "./pages/customer/AnimalPassport";
import LabResults from "./pages/customer/LabResults";
import LabResultDetail from "./pages/customer/LabResultDetail";
import CustomerPanel from "./pages/customer/CustomerPanel";

import AdminPanel from "./pages/admin/AdminPanel";
import AdminMessages from "./pages/admin/AdminMessages";
import UserManagement from "./pages/admin/UserManagement";
import PatientManagement from "./pages/admin/PatientManagement";
import PatientDetail from "./pages/admin/PatientDetail";
import CustomerControl from "./pages/admin/CustomerControl";

import DoctorPanel from "./pages/doctor/DoctorPanel";
import DoctorControl from "./pages/doctor/DoctorControl";


import Shop from "./pages/shop/Shop";
import ProductDetail from "./pages/shop/ProductDetail";
import Favorites from "./pages/shop/Favorites";
import Cart from "./pages/shop/Cart";
import Payment from "./pages/shop/Payment";

import Adoption from "./pages/adoption/Adoption";
import AdoptionDetail from "./pages/adoption/AdoptionDetail";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/hakkimizda" element={<About />} />

        <Route path="/hizmetler" element={<Services />} />
        <Route path="/hizmetler/:id" element={<ServiceDetail />} />

        <Route path="/evcil-hayvanlarim" element={<Pets />} />

        <Route path="/randevu-al" element={<Appointment />} />
        <Route path="/randevularim" element={<MyAppointments />} />

        <Route path="/saglik-karnesi" element={<HealthCard />} />
        <Route path="/hayvan-pasaportu" element={<AnimalPassport />} />

        <Route path="/laboratuvar-sonuclari" element={<LabResults />} />
        <Route
          path="/laboratuvar-sonuclari/:id"
          element={<LabResultDetail />}
        />

        <Route path="/veterinerlerimiz" element={<Veterinarians />} />
        <Route path="/veterinerlerimiz/:id" element={<VetDetail />} />

        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetail />} />

        <Route path="/faq" element={<FAQ />} />
        <Route path="/sss" element={<FAQ />} />

        <Route path="/chatbot" element={<Chatbot />} />

        <Route path="/pet-shop" element={<Shop />} />
        <Route path="/pet-shop/:id" element={<ProductDetail />} />

        <Route path="/favoriler" element={<Favorites />} />
        <Route path="/sepet" element={<Cart />} />
        <Route path="/odeme" element={<Payment />} />

        <Route path="/sahiplendirme" element={<Adoption />} />
        <Route path="/sahiplendirme/:id" element={<AdoptionDetail />} />

        <Route path="/iletisim" element={<Contact />} />
        <Route path="/giris-yap" element={<Login />} />
        <Route path="/kayit-ol" element={<Register />} />

        <Route
          path="/admin-panel"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        <Route
  path="/admin-mesajlar"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminMessages />
    </ProtectedRoute>
  }
/>

        <Route
          path="/musteri-kontrol"
          element={
            <ProtectedRoute allowedRole="admin">
              <CustomerControl />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hekim-kontrol"
          element={
            <ProtectedRoute allowedRole="admin">
              <DoctorControl />
            </ProtectedRoute>
          }
        />

        <Route
          path="/kullanici-yonetimi"
          element={
            <ProtectedRoute allowedRole="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hasta-yonetimi"
          element={
            <ProtectedRoute allowedRole="admin">
              <PatientManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hasta-yonetimi/:id"
          element={
            <ProtectedRoute allowedRole="admin">
              <PatientDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hekim-panel"
          element={
            <ProtectedRoute allowedRole="doctor">
              <DoctorPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hekim-hastalari"
          element={
            <ProtectedRoute allowedRole="doctor">
              <PatientManagement />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hekim-hastalari/:id"
          element={
            <ProtectedRoute allowedRole="doctor">
              <PatientDetail />
            </ProtectedRoute>
          }
        />

        <Route
          path="/musteri-panel"
          element={
            <ProtectedRoute allowedRole="customer">
              <CustomerPanel />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={
            <main className="min-h-[70vh] flex items-center justify-center px-4">
              <div className="bg-white border border-[#d8e7e4] rounded-[2rem] p-10 text-center shadow-sm max-w-xl">
                <div className="text-5xl mb-4">🐾</div>

                <h1 className="text-4xl font-black text-[#134e4a]">
                  Sayfa bulunamadı
                </h1>

                <p className="text-slate-500 mt-4 leading-7">
                  Aradığınız sayfa sistemde bulunamadı. Ana sayfaya dönerek
                  devam edebilirsiniz.
                </p>
              </div>
            </main>
          }
        />
      </Routes>

      <Footer />
      <FloatingChatbot />
    </>
  );
}