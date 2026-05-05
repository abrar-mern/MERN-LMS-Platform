import React, { useState } from "react";
import { apiConnector } from "../services/apiconnector";
import { categories } from "../services/apis";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getCatalogPageData } from "../services/operations/pageandComponent";
import CourseGrid from "../components/core/Catalog/CourseGrid";
import CourseSlider from "../components/core/Catalog/CourseSlider";


const Catalog = () => {
  const { catalogName } = useParams();
  const slugify = (value) =>
    value?.trim().toLowerCase().split(" ").filter(Boolean).join("-") || "";
  const [catalogPageData, setCatalogPageData] = useState(null);
  const [categoryId, setCategoryId] = useState("");
  // Fetch all Categories
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("Catalog: catalogName", catalogName);
      // Remove hypen, spaces and make it lowercase to match with catalogName
      const category_id = response?.data?.data?.filter(
        (ct) => slugify(ct?.name) === slugify(catalogName),
      )[0]?._id;
      if (!category_id && response?.data?.data?.length) {
        console.warn(
          "Catalog: no category match for URL, falling back to first category",
        );
        setCategoryId(response.data.data[0]._id);
      } else {
        setCategoryId(category_id);
      }
    };
    fetchCategories();
  }, [catalogName]);

  useEffect(() => {
    if (!categoryId) {
      console.log("Catalog: categoryId not ready yet");
      return;
    }
    const fetchCategoryDetails = async () => {
      try {
        const response = await getCatalogPageData(categoryId);
        console.log("Printing res: ", response);
        setCatalogPageData(response);
      } catch (error) {
        console.error("Error fetching category details:", error);
      }
    };
    fetchCategoryDetails();
  }, [categoryId]);

 const [activeTab, setActiveTab] = useState("Most Popular");


  return (
    <div className="text-white w-full  mx-auto">
      <div className="w-full flex flex-col items-start gap-6 bg-richblack-800 px-8 py-6">
        <div className="w-11/12 mx-auto mb-10 flex flex-col gap-3  p-6 rounded-lg animation-fadeIn transition-all duration-200 ">
          <p className="text-richblack-25 ">
            {`Home/ Catalog /`}
            <span className="text-yellow-25 font-semibold italic">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl font-bold">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="text-richblack-25">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Section1 */}
      <div className = "w-11/12 mx-auto flex flex-col gap-6 animation-fadeIn transition-all duration-200">
        <div className = "flex flex-col justify-between gap-3 p-6 rounded-lg">
          <div className = "flex items-center gap-2 text-yellow-25 font-semibold">
            <h2 className = "text-white font-semibold  text-[28px]">Courses to get you started</h2>
          </div>
          <div className = "flex gap-8 text-richblack-25 text-md pt-2 py-4 border-b border-richblack-700 ">
            <p className = {`cursor-pointer py-4 hover:text-yellow-25  ${activeTab === "Most Popular" ? "text-yellow-25 border-b-2 " : ""}`} onClick={() => setActiveTab("Most Popular")}>
                Most Popular
                </p>
            <p className = {`cursor-pointer py-4 hover:text-yellow-25  ${activeTab === "New" ? "text-yellow-25 border-b-2" : ""}`} onClick={() => setActiveTab("New")}>New</p>
          </div>
          <div>
             <CourseSlider Courses = {catalogPageData?.data?.selectedCategory?.courses} />
          </div>
         
        </div>

        {/* Section2 */}
        <div className = "flex flex-col justify-between gap-3 p-6 rounded-lg">
            <div className = "flex items-center gap-2 text-yellow-25 font-semibold">
                <h2 className = "text-white font-semibold text-[28px]">
                    Top Courses in {catalogPageData?.data?.differentCategories?.[0]?.name}
                </h2>
            </div>
    
          <div className = "flex gap-8 text-richblack-25 text-md pt-2 py-4 border-b border-richblack-700 ">
            <CourseSlider />
          </div>
        </div>

        {/* Section 3 */}
        <div className = "flex flex-col justify-between gap-3 p-6 rounded-lg">
          <div className = "flex items-center gap-2 text-yellow-25 font-semibold">
            <h2 className = "text-white font-semibold text-[28px]">
                          Frequently Bought Together
            </h2>
          </div>
           <div className = "flex gap-8 text-richblack-25 text-md pt-2 py-4 border-b border-richblack-700 ">
            
          </div>

          <div className = "py-8">
            <div className = "grid grid-cols-2 lg:grid-cols-2 gap-6 text-richblack-25 text-md pt-2 py-4 border-b border-richblack-700 ">
                {
                    catalogPageData?.data?.topSellingCourses?.slice(0,4)?.map((course, index) => (
                        <CourseGrid 
                        course = {course} key = {index} height = "h-[250px]"
                        />
                    ))
                }
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalog;
