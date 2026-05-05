import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { RxDropdownMenu } from "react-icons/rx";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { CiCirclePlus } from "react-icons/ci";
import SubSectionModal from "./SubSectionModal";
import {
  deleteSection,
  deleteSubSection,
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../redux/slice/courseSlice";

const NestedView = ({ handleEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  // Managing Flags for edit, view and add mode for sections and lectures
  const [addSubSection, setAddSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  const sections = Array.isArray(course?.courseContent)
    ? course.courseContent
    : course?.courseContent
      ? [course.courseContent]
      : [];

  // Function to handle delete section
const handleDeleteSection = async (sectionId) => {
  const result = await deleteSection(
    {
      sectionId,
      courseId: course?._id,
    },
    token
  );

  if (result?.course) {
    dispatch(setCourse(result.course)); // ✅ fresh state
  }

  setConfirmationModal(null);
};

  const handleDeleteSubSection = async (subSectionId, sectionId) => {
    // Call the delete subsection API here and pass the subSectionId to delete the subsection
    const result = await deleteSubSection(
      {
        subSectionId,
        sectionId,
        courseId: course?._id,
      },
      token
    );
    const updatedSection = result?.updatedSection || result?.data || result;
    if (updatedSection) {
      const updatedCourseContent = sections.map((section) =>
        section._id === sectionId ? updatedSection : section,
      );
      dispatch(setCourse({
        ...course,
        courseContent: updatedCourseContent,
      }));
    }
    setConfirmationModal(null);
  };

  return (
    <>
      <div className="mt-6 max-h-[300px] overflow-y-auto border border-richblack-700 p-4 rounded-md bg-richblack-800">
        <div className="flex flex-col gap-4">
          {sections.length === 0 ? (
            <p className="text-sm text-richblack-300">
              No sections added yet. Create a section to see it here.
            </p>
          ) : (
            sections.map((section, index) => (
              <details
                open
                key={section?._id || index}
                className="border border-richblack-700 rounded-md bg-richblack-900 p-4 group hover:border-yellow-25 transition-all duration-200 cursor-pointer hover:bg-richblack-900/80 hover:text-yellow-25 text-richblack-25"
              >
                <summary className="flex items-center justify-between curosr-pointer text-lg font-medium text-richblack-25 group-hover:text-yellow-25 transition-all duration-200">
                  <div className="flex items-center gap-2">
                    <RxDropdownMenu className="text-xl" />
                    {/* Section adding 2 first section is deleted fix the issue of section name not showing when section is added and also add the functionality to edit section name on click of section name */}

                    <p
                      className="hover:underline"
                      onClick={(e) => {
                        e.preventDefault();
                        handleEditSectionName(
                          section?._id,
                          section?.sectionName,
                        );
                      }}
                    >
                      {section?.sectionName}
                    </p>
                  </div>
                  {/* Edit Button */}
                  <div className="flex items-center gap-4  transition-opacity duration-200 cursor-pointer">
                    <button
                      className="text-md text-white hover:underline"
                      onClick={(event) => {
                        event.preventDefault();
                        handleEditSectionName(
                          section?._id,
                          section?.sectionName,
                        );
                      }}
                    >
                      <FaRegEdit />
                    </button>

                    {/* Delete Button and Confirmation Modal for delete can be added here */}
                    <button
                      className="text-md text-pink-500 hover:underline cursor-pointer"
                      onClick={() =>
                        setConfirmationModal({
                          text1:
                            "Are you sure you want to delete this section?",
                          text2: "This action cannot be undone.",
                          btntxt1: "Delete",
                          btntxt2: "Cancel",
                          btn1Handler: () => handleDeleteSection(section?._id),
                          btn2Handler: () => setConfirmationModal(null),
                        })
                      }
                    >
                      <MdDeleteSweep />
                    </button>
                    {/* Seperator can be added here if needed */}
                    <span className="text-white text-[25px] font-light">|</span>
                    {/* Dropdown for adding lecture can be added here */}
                    <button className="text-md text-white hover:underline cursor-pointer">
                      <IoMdArrowDropdownCircle />
                    </button>
                  </div>
                </summary>
                <div className="mt-4 ml-6 flex flex-col gap-2">
                  {/* Render lectures for the section */}
                  {(section.subSections || []).map((data, index) => (
                    <div
                      className="flex items-center justify-between cursor-pointer text-richblack-25 hover:text-yellow-25 transition-all duration-200"
                      key={data?._id || index}
                      onClick={() => setViewSubSection({
                        ...data,
                        sectionId: section?._id,
                      })}
                    >
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <RxDropdownMenu className="text-lg" />
                        <p>{data.title}</p>
                      </div>
                      <div className="flex items-center gap-4 cursor-pointer " onClick = {(e) => e.stopPropagation()}>
                        <button
                          
                          className="text-md text-white hover:underline cursor-pointer"
                          onClick={() => {
                            setEditSubSection({
                              ...data,
                              sectionId: section?._id,
                            });
                          }}
                        >
                          <FaRegEdit />
                        </button>
                        {/* Delete Button and Confirmation Modal for delete can be added here */}
                        <button
                          className="text-md text-pink-500 hover:underline cursor-pointer"
                          onClick={() =>
                            setConfirmationModal({
                              text1: "Delete the Sub Section?",
                              text2:
                                "Selected Lecture will be deleted permanently",
                              btntxt1: "Delete",
                              btntxt2: "Cancel",
                                btn1Handler: () =>
                                handleDeleteSubSection(data?._id, section?._id),
                                btn2Handler: () => setConfirmationModal(null),
                            })
                          }
                        >
                          <MdDeleteSweep />
                        </button>
                      </div>
                    </div>
                  ))}
                  {/* Add Lecture Button can be added here */}
                  <button
                    className="mt-2 text-sm text-yellow-25 hover:underline flex items-center gap-1 cursor-pointer transition-all duration-200"
                    onClick={() => setAddSubSection(section?._id)}
                  >
                    <CiCirclePlus />
                    Add Lecture
                  </button>
                </div>
              </details>
            ))
          )}
        </div>
        {/* Checking which of the section is in edit, view or add mode and rendering the respective component */}
        {viewSubSection ? (
          <SubSectionModal
            modalData={viewSubSection}
            setModalData={setViewSubSection}
            view={true}
          />
        ) : addSubSection ? (
          <SubSectionModal
            modalData={addSubSection}
            setModalData={setAddSubSection}
            add={true}
          />
        ) : editSubSection ? (
          <SubSectionModal
            modalData={editSubSection}
            setModalData={setEditSubSection}
            edit={true}
          />
        ) : (
          <div></div>
        )}

        {/* Confirmation Modal */}
        {confirmationModal && (
          <ConfirmationModal modalData={confirmationModal} />
        )}
      </div>
    </>
  );
};

export default NestedView;
