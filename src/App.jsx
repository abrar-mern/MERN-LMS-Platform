import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Error from "./pages/Error";
import Navbar from "./components/common/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import UpdatePassword from "./pages/UpdatePassword";
import About from "./pages/About";
import Contact from "./pages/Contact";
import VerifyEmail from "./pages/VerifyEmail";
import MyProfile from "./pages/Dashboard/MyProfile";
import MyProfileComponent from "./components/core/Dashboard/MyProfile";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import {useSelector} from "react-redux";
import { useEffect } from "react";
import Footer from "./components/common/Footer"
import AddCourse from "./components/core/Dashboard/AddCourse/index"
import MyCourses from "./components/core/Dashboard/MyCourses"
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog"
import CourseDetails from "./pages/CourseDetails";

function App() {
  const {user} = useSelector((state) => state.profile);
  const location = useLocation();

  return (
    <div className="w-full bg-richblack-900 flex flex-col items-center">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/*" element={<Error />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/update-password" element={<UpdatePassword />} />
        <Route path="/update-password/:token" element={<UpdatePassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/catalog/:catalogName" element = {<Catalog />} />
        <Route path = "/course/:courseId" element = {<CourseDetails />} />
       
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <MyProfile />
            </PrivateRoute>
          }
        >
          <Route path="my-profile" element={<MyProfileComponent />} />
          {/* Check Account type and render routes accordingly */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route path="enrolled-courses" element={<EnrolledCourses />} />
              <Route path="cart" element={<Cart />} />
            </>
          )}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route path="add-course" element={<AddCourse />} />
              <Route path="my-courses" element={<MyCourses />} />
              <Route path="edit-course/:courseId" element={<EditCourse />} />
            </>
          )}
        </Route>

      </Routes>
          {/* Footer ONLY on non-dashboard pages */}
          {
            !window.location.pathname.includes("/dashboard") && <Footer />
          }
      
    </div>
  );
}

export default App;
