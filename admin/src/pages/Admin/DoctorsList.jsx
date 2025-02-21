// // // import React, { useContext, useEffect } from "react";
// // // import { AdminContext } from "../../context/AdminContext";

// // // const DoctorsList = () => {
// // //   const { adminToken, doctors, getAllDoctors, changeAvailability } = useContext(AdminContext);
// // //   useEffect(() => {
// // //     if (adminToken) {
// // //       getAllDoctors();
// // //     }
// // //   }, [adminToken]);
// // //   return (
// // //     <div className="m-5 max-h-[90vh] overflow-y-scroll">
// // //       <h1 className="font-medium">All Doctors</h1>
// // //       <div className="flex w-full flex-wrap gap-y-6 gap-4 pt-5">
// // //         {doctors.map((doctor, idx) => (

// // //           <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={idx}>
// // //             <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-500" src={doctor.image} />
// // //             <div className="p-4">
// // //               <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
// // //               <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
// // //               <div className="flex mt-4 gap-1 text-sm items-center">
// // //                 <input onChange={() => changeAvailability(doctor._id)} type="checkbox" checked={doctor.available} />
// // //                 <p>Available</p>
// // //               </div>
// // //             </div>

// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default DoctorsList;

// // // // import React, { useContext, useEffect } from "react";
// // // // import { AdminContext } from "../../context/AdminContext";

// // // // const DoctorsList = () => {
// // // //   const { doctors, getAllDoctors, changeAvailability } = useContext(AdminContext);

// // // //   useEffect(() => {
// // // //     // Directly fetching all doctors without checking for adminToken
// // // //     getAllDoctors();
// // // //   }, []);  // Removed adminToken dependency

// // // //   return (
// // // //     <div className="m-5 max-h-[90vh] overflow-y-scroll">
// // // //       <h1 className="font-medium">All Doctors</h1>
// // // //       <div className="flex w-full flex-wrap gap-y-6 gap-4 pt-5">
// // // //         {doctors.map((doctor, idx) => (
// // // //           <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={idx}>
// // // //             <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-500" src={doctor.image} />
// // // //             <div className="p-4">
// // // //               <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
// // // //               <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
// // // //               <div className="flex mt-4 gap-1 text-sm items-center">
// // // //                 <input onChange={() => changeAvailability(doctor._id)} type="checkbox" checked={doctor.available} />
// // // //                 <p>Available</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DoctorsList;

// // // // import React, { useContext, useEffect, useState } from "react";
// // // // import { AdminContext } from "../../context/AdminContext";

// // // // const DoctorsList = () => {
// // // //   const { doctors, getAllDoctors, changeAvailability } = useContext(AdminContext);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);

// // // //   useEffect(() => {
// // // //     const fetchDoctors = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         await getAllDoctors();
// // // //       } catch (err) {
// // // //         setError(err.message);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     fetchDoctors();
// // // //   }, []);

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="m-5 flex justify-center items-center h-[60vh]">
// // // //         <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="m-5 text-red-500">
// // // //         Error loading doctors: {error}
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="m-5 max-h-[90vh] overflow-y-scroll">
// // // //       <h1 className="font-medium">All Doctors</h1>
// // // //       {doctors.length === 0 ? (
// // // //         <p className="text-gray-500 mt-4">No doctors found</p>
// // // //       ) : (
// // // //         <div className="flex w-full flex-wrap gap-y-6 gap-4 pt-5">
// // // //           {doctors.map((doctor) => (
// // // //             <div
// // // //               key={doctor.id}
// // // //               className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
// // // //             >
// // // //               <img
// // // //                 className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 h-48 w-56 object-cover"
// // // //                 src={doctor.image}
// // // //                 alt={doctor.name}
// // // //               />
// // // //               <div className="p-4">
// // // //                 <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
// // // //                 <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
// // // //                 <div className="flex mt-4 gap-1 text-sm items-center">
// // // //                   <input
// // // //                     onChange={() => changeAvailability(doctor.id)}
// // // //                     type="checkbox"
// // // //                     checked={doctor.available}
// // // //                   />
// // // //                   <p>Available</p>
// // // //                 </div>
// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>
// // // //       )}
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DoctorsList;

// // // // import React, { useContext, useEffect } from "react";
// // // // import { AdminContext } from "../../context/AdminContext";

// // // // const DoctorsList = () => {
// // // //   const { adminToken, doctors, getAllDoctors, changeAvailability } = useContext(AdminContext);

// // // //   useEffect(() => {
// // // //     if (adminToken) {
// // // //       getAllDoctors();
// // // //     }
// // // //   }, [adminToken]);

// // // //   return (
// // // //     <div className="m-5 max-h-[90vh] overflow-y-scroll">
// // // //       <h1 className="font-medium">All Doctors</h1>
// // // //       <div className="flex w-full flex-wrap gap-y-6 gap-4 pt-5">
// // // //         {doctors.map((doctor, idx) => (
// // // //           <div className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group" key={idx}>
// // // //             <img className="bg-indigo-50 group-hover:bg-primary transition-all duration-500" src={doctor.image} />
// // // //             <div className="p-4">
// // // //               <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
// // // //               <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
// // // //               <div className="flex mt-4 gap-1 text-sm items-center">
// // // //                 <input onChange={() => changeAvailability(doctor._id)} type="checkbox" checked={doctor.available} />
// // // //                 <p>Available</p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         ))}
// // // //       </div>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default DoctorsList;

// // // import React, { useContext, useEffect, useState } from "react";
// // // import { AdminContext } from "../../context/AdminContext";

// // // const DoctorsList = () => {
// // //   const { doctors, getAllDoctors, changeAvailability } = useContext(AdminContext);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);

// // //   useEffect(() => {
// // //     const fetchDoctors = async () => {
// // //       try {
// // //         setLoading(true);
// // //         await getAllDoctors();
// // //       } catch (err) {
// // //         setError(err.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     fetchDoctors();
// // //   }, []);

// // //   if (loading) {
// // //     return (
// // //       <div className="m-5 flex justify-center items-center h-[60vh]">
// // //         <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="m-5 text-red-500">
// // //         Error loading doctors: {error}
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="m-5 max-h-[90vh] overflow-y-scroll">
// // //       <h1 className="font-medium">All Doctors</h1>
// // //       {doctors.length === 0 ? (
// // //         <p className="text-gray-500 mt-4">No doctors found</p>
// // //       ) : (
// // //         <div className="flex w-full flex-wrap gap-y-6 gap-4 pt-5">
// // //           {doctors.map((doctor) => (
// // //             <div
// // //               key={doctor.id}
// // //               className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
// // //             >
// // //               <img
// // //                 className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 h-48 w-56 object-cover"
// // //                 src={doctor.image}
// // //                 alt={doctor.name}
// // //               />
// // //               <div className="p-4">
// // //                 <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
// // //                 <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
// // //                 <div className="flex mt-4 gap-1 text-sm items-center">
// // //                   <input
// // //                     onChange={() => changeAvailability(doctor.id)}
// // //                     type="checkbox"
// // //                     checked={doctor.available}
// // //                   />
// // //                   <p>Available</p>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           ))}
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default DoctorsList;

// // import React, { useContext, useEffect, useState } from "react";
// // import { AdminContext } from "../../context/AdminContext";

// // const DoctorsList = () => {
// //   const { doctors = [], getAllDoctors, changeAvailability } = useContext(AdminContext);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchDoctors = async () => {
// //       try {
// //         setLoading(true);
// //         await getAllDoctors();
// //       } catch (err) {
// //         setError(err.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchDoctors();
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div className="m-5 flex justify-center items-center h-[60vh]">
// //         <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="m-5 text-red-500">
// //         Error loading doctors: {error}
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="m-5 max-h-[90vh] overflow-y-scroll">
// //       <h1 className="font-medium">All Doctors</h1>
// //       {doctors?.length === 0 ? (
// //         <p className="text-gray-500 mt-4">No doctors found</p>
// //       ) : (
// //         <div className="flex w-full flex-wrap gap-y-6 gap-4 pt-5">
// //           {doctors?.map((doctor) => (
// //             <div
// //               key={doctor.id}
// //               className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
// //             >
// //               <img
// //                 className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 h-48 w-56 object-cover"
// //                 src={doctor.image || "/default-image.png"} // Fallback if image is missing
// //                 alt={doctor.name}
// //               />
// //               <div className="p-4">
// //                 <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
// //                 <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
// //                 <div className="flex mt-4 gap-1 text-sm items-center">
// //                   <input
// //                     onChange={() => changeAvailability(doctor.id)}
// //                     type="checkbox"
// //                     checked={doctor.available ?? false} // Fallback for undefined `available`
// //                   />
// //                   <p>Available</p>
// //                 </div>
// //               </div>
// //             </div>
// //           ))}
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default DoctorsList;

// import React, { useContext, useEffect, useState } from "react";
// import { AdminContext } from "../../context/AdminContext";

// const DoctorsList = () => {
//   const { doctors, getAllDoctors, changeAvailability } = useContext(AdminContext);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         setLoading(true);
//         await getAllDoctors();
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDoctors();
//   }, [getAllDoctors]);

//   if (loading) {
//     return (
//       <div className="m-5 flex justify-center items-center h-[60vh]">
//         <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="m-5 text-red-500">
//         Error loading doctors: {error}
//       </div>
//     );
//   }

//   return (
//     <div className="m-5 max-h-[90vh] overflow-y-scroll">
//       <h1 className="font-medium">All Doctors</h1>
//       {!doctors || doctors.length === 0 ? (
//         <p className="text-gray-500 mt-4">No doctors found</p>
//       ) : (
//         <div className="flex w-full flex-wrap gap-y-6 gap-4 pt-5">
//           {doctors.map((doctor) => (
//             <div
//               key={doctor.id}
//               className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
//             >
//               <img
//                 className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 h-48 w-56 object-cover"
//                 src={doctor.image}
//                 alt={doctor.name}
//               />
//               <div className="p-4">
//                 <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
//                 <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
//                 <div className="flex mt-4 gap-1 text-sm items-center">
//                   <input
//                     onChange={() => changeAvailability(doctor.id)}
//                     type="checkbox"
//                     checked={doctor.available || false}
//                   />
//                   <p>Available</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default DoctorsList;

import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, getAllDoctors, changeAvailability } = useContext(AdminContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        await getAllDoctors();
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
    // Remove getAllDoctors from the dependency array
  }, []);

  if (loading) {
    return (
      <div className="m-5 flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="m-5 text-red-500">
        Error loading doctors: {error}
      </div>
    );
  }

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="font-medium">All Doctors</h1>
      {!doctors || doctors.length === 0 ? (
        <p className="text-gray-500 mt-4">No doctors found</p>
      ) : (
        <div className="flex w-full flex-wrap gap-y-6 gap-4 pt-5">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group"
            >
              <img
                className="bg-indigo-50 group-hover:bg-primary transition-all duration-500 h-48 w-56 object-cover"
                src={doctor.image}
                alt={doctor.name}
              />
              <div className="p-4">
                <p className="text-neutral-800 text-lg font-medium">{doctor.name}</p>
                <p className="text-zinc-600 text-sm">{doctor.speciality}</p>
                <div className="flex mt-4 gap-1 text-sm items-center">
                  <input
                    onChange={() => changeAvailability(doctor.id)}
                    type="checkbox"
                    checked={doctor.available || false}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DoctorsList;