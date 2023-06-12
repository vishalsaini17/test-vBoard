import { Route, Routes } from "react-router-dom";
import { DashboardLayout } from "../layout";
import { Courses, Home, Subjects } from "../pages";

const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Home />} />
          <Route path="courses" element={<Courses />} />
          <Route path="subjects" element={<Subjects />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;