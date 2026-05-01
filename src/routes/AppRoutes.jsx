import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import Home          from "../pages/Home";
import SubCategory   from "../pages/SubCategory";
import Content       from "../pages/Content";
import PrivacyPolicy from "../pages/PrivacyPolicy";
import AboutUs       from "../pages/AboutUs";
import Contact       from "../pages/Contact";

/* ── Scroll-to-top on every route change ── */
function ScrollHandler() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <ScrollHandler />

      <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />

        <main style={{ flex: 1 }}>
          <Routes>

            {/* HOME */}
            <Route path="/" element={<Home />} />

            {/* ── Redirect bare category routes to their default sub ── */}
            {/* This way /gk, /facts, /tips don't 404 and back-button works cleanly */}
            <Route path="/gk"    element={<Navigate to="/gk/fullForms"   replace />} />
            <Route path="/facts" element={<Navigate to="/facts/funFacts"  replace />} />
            <Route path="/tips"  element={<Navigate to="/tips/health"     replace />} />
            <Route path="/post/:slug"  element={<Content />} />
            <Route path="/privacy"     element={<PrivacyPolicy />} />
            <Route path="/about"       element={<AboutUs />} />
            <Route path="/contact"     element={<Contact />} />
            
            {/* ── SUBCATEGORY (list view) ── */}
            {/* Uses replace:true inside tab navigation so back → home */}
            <Route path="/:category/:sub"     element={<SubCategory />} />

            {/* ── CONTENT (detail view) ── */}
            <Route path="/:category/:sub/:id" element={<Content />} />

            {/* ── BLOGGER POST (single post view) ── */}
            <Route path="/post/:slug" element={<Content />} />

            {/* ── STATIC PAGES ── */}
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />

            {/* ── Catch-all → home ── */}
            <Route path="*" element={<Navigate to="/" replace />} />

          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}
