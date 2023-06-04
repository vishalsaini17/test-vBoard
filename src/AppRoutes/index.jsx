import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layout";
import { Courses, Home } from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;