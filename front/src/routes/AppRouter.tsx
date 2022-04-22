import React, { lazy, Suspense } from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import Navbar from '../components/Navbar';

const HeroDetail = lazy(() => import("../pages/HeroDetail"));
const MainPage = lazy(() => import("../pages/MainPage"));

const AppRouter = () => {
  return (
    <>
      <Navbar />
      <Suspense fallback={<h1 className="text-center">Loading...</h1>}>
        <Routes>
          <Route path="/heroes" element={<MainPage />} />

          <Route path="/heroes/:id" element={<HeroDetail />} />

          <Route path="*" element={<Navigate to="/heroes" />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default AppRouter;
