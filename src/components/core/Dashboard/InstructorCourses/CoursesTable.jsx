import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { useSelector } from "react-redux";
import { deleteCourse } from "../../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../../common/ConfirmationModal";
import "./CourseTable.css";
import { useNavigate } from "react-router-dom"

const CourseTable = ({ courses = [], setCourses }) => {
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const navigate = useNavigate();

  const handleDeleteCourse = async (courseId) => {
    setLoading(true);
    const result = await deleteCourse(courseId, token);

    if (result?.success) {
      const updatedCourses = courses.filter(
        (course) => course._id !== courseId
      );
      setCourses(updatedCourses);
      setConfirmationModal(null);
    }

    setLoading(false);
  };

  return (
    <div className="w-full overflow-x-auto rounded-xl bg-richblack-800 shadow-lg">
      <Table className="w-full min-w-max text-left border-collapse">

        {/* HEADER */}
        <Thead className="sticky top-0 z-10 bg-richblack-900 border-b border-richblack-700">
          <Tr>
            <Th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-richblack-300">
              Course
            </Th>
            <Th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-richblack-300 w-[140px]">
              Duration
            </Th>
            <Th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-richblack-300 w-[120px]">
              Price
            </Th>
            <Th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-richblack-300 w-[110px]">
              Actions
            </Th>
          </Tr>
        </Thead>

        {/* BODY */}
        <Tbody>
          {!courses || courses.length === 0 ? (
            <Tr>
              <Td colSpan="4" className="px-6 py-10 text-center text-richblack-400">
                No courses found.
              </Td>
            </Tr>
          ) : (
            courses.map((course) => {
              const isDraft =
                course.status === "Draft";

              return (
                <Tr
                  key={course._id}
                  className="border-b border-richblack-700 hover:bg-richblack-750 transition-colors"
                >
                  {/* COURSE COLUMN */}
                  <Td className="px-6 py-6">
                    <div className="flex gap-5">

                      <img
                        src={course.thumbnail}
                        alt={course.courseName}
                        className="w-44 h-24 object-cover rounded-lg"
                      />

                      <div className="flex flex-col justify-center">

                        {/* TITLE + BADGE */}
                        <div className="flex items-center gap-3">
                          <p className="text-base font-semibold text-richblack-5">
                            {course.courseName}
                          </p>

                         
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-sm text-richblack-400 mt-2 max-w-[420px]">
                          {(course.courseDescription || "").length > 120
                            ? `${course.courseDescription.substring(0, 120)}...`
                            : course.courseDescription || "No description"}
                        </p>

                        {/* CREATED DATE */}
                        <span className="text-xs text-richblack-500 mt-2">
                          Created on{" "}
                          {new Date(course.createdAt).toLocaleDateString()}
                        </span>

                         <span
                            className={`mt-4 inline-flex items-center px-2 py-2 text-xs font-semibold rounded-md border
                              ${
                                isDraft
                                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                  : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              }`}
                          >
                            {isDraft ? "Draft" : "Published"}
                          </span>

                      </div>
                    </div>
                  </Td>

                  {/* DURATION */}
                  <Td className="px-6 py-6 text-sm text-richblack-300">
                    {course.totalDuration || course.duration || "—"}
                  </Td>

                  {/* PRICE */}
                  <Td className="px-6 py-6 text-sm font-medium text-richblack-200">
                    {course.price === 0 ? "Free" : `₹ ${course.price}`}
                  </Td>

                  {/* ACTIONS */}
                  <Td className="px-6 py-6">
                    <div className="flex items-center gap-3">

                      <button
                        className="p-2 rounded-md hover:bg-richblack-700 text-richblack-400 hover:text-white transition"
                        disabled={loading}
                        onClick={() => navigate(`/dashboard/edit-course/${course._id}`)}
                      >
                        <FaRegEdit size={16} />
                      </button>

                      <button
                        className="p-2 rounded-md hover:bg-red-500/10 text-richblack-400 hover:text-red-400 transition"
                        disabled={loading}
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete the Course?",
                            text2: "This action cannot be undone.",
                            btntxt1: "Delete",
                            btntxt2: "Cancel",
                            btn1Handler: () => {
                              if (!loading) {
                                handleDeleteCourse(course._id);
                              }
                            },
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                      >
                        <MdDeleteOutline size={18} />
                      </button>

                    </div>
                  </Td>
                </Tr>
              );
            })
          )}
        </Tbody>
      </Table>

      {confirmationModal && (
        <ConfirmationModal
          modalData={confirmationModal}
          setModalData={setConfirmationModal}
        />
      )}
    </div>
  );
};

export default CourseTable;