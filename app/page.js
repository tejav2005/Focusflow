"use client"
// import { Button } from "@/components/ui/button";
// import { api } from "@/convex/_generated/api"
// import { UserButton, useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import Image from "next/image";
// import { useEffect } from "react";

// export default function Home() {

//   const {user} = useUser();
//   const createUser=useMutation(api.user.createUser);
  
//   useEffect(()=>{
//      user&&CheckUser();
//   },[user])


//   const CheckUser=async()=>{
//      const result=await createUser({
//       email:user?.primaryEmailAddress?.emailAddress,
//       imageUrl:user?.imageUrl,
//       userName:user?.fullName
//      });

//      console.log(result);
//   }

//   return (
//    <div>
//     <h2> hello </h2>
//     <Button>subscribe</Button>

//     <UserButton/>
//     </div>
//   )
// }


// "use client"
// import { Button } from "@/components/ui/button";
// import { api } from "@/convex/_generated/api"
// import { UserButton, useUser } from "@clerk/nextjs";
// import { useMutation } from "convex/react";
// import Image from "next/image";
// import { useEffect } from "react";
// import { useRouter } from "next/navigation";

// export default function Home() {
//   const {user} = useUser();
//   const createUser=useMutation(api.user.createUser);
//   const router = useRouter();
  
//   useEffect(()=>{
//      user&&CheckUser();
//   },[user])

//   const CheckUser=async()=>{
//      const result=await createUser({
//       email:user?.primaryEmailAddress?.emailAddress,
//       imageUrl:user?.imageUrl,
//       userName:user?.fullName
//      });
//      console.log(result);
//   }

//   const handleGetStarted = () => {
//     if (user) {
//       // User is already signed in, redirect to dashboard
//       router.push('/dashboard');
//     } else {
//       // User is not signed in, redirect to sign-in page
//       router.push('/sign-in');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
//       {/* Enhanced Animated Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animate-bounce delay-2000"></div>
//         <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
//         <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-bounce delay-4000"></div>
//       </div>

//       {/* Massive Left Side Decorative Elements */}
//       <div className="absolute left-0 top-0 h-full w-48 pointer-events-none">
//         {/* More particles */}
//         <div className="absolute top-16 left-2 w-3 h-3 bg-indigo-400/40 rounded-full animate-pulse"></div>
//         <div className="absolute top-20 left-8 w-4 h-4 bg-purple-400/50 rounded-full animate-ping delay-500"></div>
//         <div className="absolute top-32 left-4 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce delay-1000"></div>
//         <div className="absolute top-40 left-12 w-5 h-5 bg-cyan-400/40 rounded-full animate-pulse delay-1500"></div>
//         <div className="absolute top-48 left-6 w-3 h-3 bg-pink-400/50 rounded-full animate-ping delay-2000"></div>
//         <div className="absolute top-56 left-10 w-4 h-4 bg-green-400/40 rounded-full animate-bounce delay-2500"></div>
//         <div className="absolute top-64 left-2 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse delay-3000"></div>
//         <div className="absolute top-72 left-14 w-6 h-6 bg-violet-400/30 rounded-full animate-ping delay-3500"></div>
//         <div className="absolute top-80 left-8 w-3 h-3 bg-rose-400/50 rounded-full animate-bounce delay-4000"></div>
//         <div className="absolute top-88 left-4 w-5 h-5 bg-sky-400/40 rounded-full animate-pulse delay-4500"></div>
//         <div className="absolute top-96 left-12 w-2 h-2 bg-lime-400/60 rounded-full animate-ping delay-5000"></div>
//         <div className="absolute top-104 left-6 w-4 h-4 bg-amber-400/50 rounded-full animate-bounce delay-5500"></div>
        
//         {/* Enhanced gradient bars */}
//         <div className="absolute top-24 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent animate-pulse"></div>
//         <div className="absolute top-36 left-0 w-28 h-1 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-pulse delay-1000"></div>
//         <div className="absolute top-44 left-0 w-36 h-1 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-pulse delay-2000"></div>
//         <div className="absolute top-52 left-0 w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse delay-3000"></div>
//         <div className="absolute top-60 left-0 w-40 h-1 bg-gradient-to-r from-transparent via-pink-400/40 to-transparent animate-pulse delay-4000"></div>
//         <div className="absolute top-68 left-0 w-20 h-1 bg-gradient-to-r from-transparent via-green-400/40 to-transparent animate-pulse delay-5000"></div>
//         <div className="absolute top-76 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent animate-pulse delay-6000"></div>
//         <div className="absolute top-84 left-0 w-28 h-1 bg-gradient-to-r from-transparent via-violet-400/40 to-transparent animate-pulse delay-7000"></div>
//         <div className="absolute top-92 left-0 w-36 h-1 bg-gradient-to-r from-transparent via-rose-400/40 to-transparent animate-pulse delay-8000"></div>
        
//         {/* Vertical gradient lines */}
//         <div className="absolute top-0 left-16 w-1 h-32 bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent animate-pulse delay-1000"></div>
//         <div className="absolute top-20 left-24 w-1 h-28 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-pulse delay-2000"></div>
//         <div className="absolute top-40 left-32 w-1 h-24 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse delay-3000"></div>
//       </div>

//       {/* Massive Right Side Decorative Elements */}
//       <div className="absolute right-0 top-0 h-full w-48 pointer-events-none">
//         {/* More particles */}
//         <div className="absolute top-18 right-2 w-4 h-4 bg-green-400/40 rounded-full animate-ping"></div>
//         <div className="absolute top-28 right-10 w-3 h-3 bg-yellow-400/50 rounded-full animate-bounce delay-500"></div>
//         <div className="absolute top-36 right-6 w-5 h-5 bg-red-400/40 rounded-full animate-pulse delay-1000"></div>
//         <div className="absolute top-44 right-14 w-2 h-2 bg-orange-400/60 rounded-full animate-ping delay-1500"></div>
//         <div className="absolute top-52 right-8 w-4 h-4 bg-violet-400/50 rounded-full animate-bounce delay-2000"></div>
//         <div className="absolute top-60 right-4 w-3 h-3 bg-teal-400/40 rounded-full animate-pulse delay-2500"></div>
//         <div className="absolute top-68 right-12 w-6 h-6 bg-emerald-400/30 rounded-full animate-ping delay-3000"></div>
//         <div className="absolute top-76 right-2 w-2 h-2 bg-slate-400/50 rounded-full animate-bounce delay-3500"></div>
//         <div className="absolute top-84 right-16 w-5 h-5 bg-stone-400/40 rounded-full animate-pulse delay-4000"></div>
//         <div className="absolute top-92 right-6 w-3 h-3 bg-neutral-400/60 rounded-full animate-ping delay-4500"></div>
//         <div className="absolute top-100 right-10 w-4 h-4 bg-zinc-400/50 rounded-full animate-bounce delay-5000"></div>
//         <div className="absolute top-108 right-14 w-2 h-2 bg-gray-400/40 rounded-full animate-pulse delay-5500"></div>
        
//         {/* Enhanced gradient bars */}
//         <div className="absolute top-22 right-0 w-32 h-1 bg-gradient-to-l from-transparent via-green-400/40 to-transparent animate-pulse delay-500"></div>
//         <div className="absolute top-30 right-0 w-28 h-1 bg-gradient-to-l from-transparent via-yellow-400/40 to-transparent animate-pulse delay-1500"></div>
//         <div className="absolute top-38 right-0 w-36 h-1 bg-gradient-to-l from-transparent via-red-400/40 to-transparent animate-pulse delay-2500"></div>
//         <div className="absolute top-46 right-0 w-24 h-1 bg-gradient-to-l from-transparent via-orange-400/40 to-transparent animate-pulse delay-3500"></div>
//         <div className="absolute top-54 right-0 w-40 h-1 bg-gradient-to-l from-transparent via-violet-400/40 to-transparent animate-pulse delay-4500"></div>
//         <div className="absolute top-62 right-0 w-20 h-1 bg-gradient-to-l from-transparent via-teal-400/40 to-transparent animate-pulse delay-5500"></div>
//         <div className="absolute top-70 right-0 w-32 h-1 bg-gradient-to-l from-transparent via-emerald-400/40 to-transparent animate-pulse delay-6500"></div>
//         <div className="absolute top-78 right-0 w-28 h-1 bg-gradient-to-l from-transparent via-slate-400/40 to-transparent animate-pulse delay-7500"></div>
//         <div className="absolute top-86 right-0 w-36 h-1 bg-gradient-to-l from-transparent via-stone-400/40 to-transparent animate-pulse delay-8500"></div>
        
//         {/* Vertical gradient lines */}
//         <div className="absolute top-0 right-16 w-1 h-32 bg-gradient-to-b from-transparent via-green-400/30 to-transparent animate-pulse delay-1500"></div>
//         <div className="absolute top-20 right-24 w-1 h-28 bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent animate-pulse delay-2500"></div>
//         <div className="absolute top-40 right-32 w-1 h-24 bg-gradient-to-b from-transparent via-red-400/30 to-transparent animate-pulse delay-3500"></div>
//       </div>

//       {/* Enhanced Floating particles everywhere */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-300"></div>
//         <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-700"></div>
//         <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
//         <div className="absolute bottom-20 right-40 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-1500"></div>
//         <div className="absolute top-60 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-2000"></div>
//         <div className="absolute top-80 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-ping delay-2500"></div>
//         <div className="absolute bottom-60 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-3000"></div>
//         <div className="absolute bottom-80 right-1/4 w-3 h-3 bg-red-400 rounded-full animate-bounce delay-3500"></div>
//         <div className="absolute top-100 left-2/3 w-1 h-1 bg-violet-400 rounded-full animate-ping delay-4000"></div>
//         <div className="absolute bottom-100 right-2/3 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-4500"></div>
        
//         {/* More scattered particles */}
//         <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-emerald-400/60 rounded-full animate-ping delay-1000"></div>
//         <div className="absolute top-2/4 right-1/5 w-2 h-2 bg-teal-400/50 rounded-full animate-bounce delay-2000"></div>
//         <div className="absolute top-3/4 left-2/5 w-1 h-1 bg-lime-400/60 rounded-full animate-pulse delay-3000"></div>
//         <div className="absolute bottom-1/4 right-2/5 w-3 h-3 bg-amber-400/40 rounded-full animate-ping delay-4000"></div>
//         <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-sky-400/50 rounded-full animate-bounce delay-5000"></div>
//         <div className="absolute bottom-1/3 right-3/4 w-1 h-1 bg-rose-400/60 rounded-full animate-pulse delay-6000"></div>
//       </div>

//       {/* Enhanced Left Side Floating Icons */}
//       <div className="absolute left-8 top-1/4 pointer-events-none">
//         <div className="flex flex-col space-y-6">
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-indigo-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
//             </svg>
//           </div>
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-800 hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-purple-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
//             </svg>
//           </div>
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-1600 hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-blue-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
//             </svg>
//           </div>
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-2400 hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-cyan-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//             </svg>
//           </div>
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-3200 hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-pink-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced Right Side Floating Icons */}
//       <div className="absolute right-8 top-1/4 pointer-events-none">
//         <div className="flex flex-col space-y-6">
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-400 hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-green-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//             </svg>
//           </div>
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-1200 hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-yellow-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
//             </svg>
//           </div>
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-2000 hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-red-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
//             </svg>
//           </div>
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-2800 hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-orange-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//             </svg>
//           </div>
//           <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-3600 hover:bg-white/40 transition-all">
//             <svg className="w-6 h-6 text-violet-600/80" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
//             </svg>
//           </div>
//         </div>
//       </div>

//       {/* Top edge decorations */}
//       <div className="absolute top-0 left-1/4 right-1/4 h-16 pointer-events-none">
//         <div className="absolute top-4 left-8 w-2 h-2 bg-indigo-400/50 rounded-full animate-ping delay-1000"></div>
//         <div className="absolute top-8 left-16 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce delay-2000"></div>
//         <div className="absolute top-6 right-8 w-3 h-3 bg-blue-400/40 rounded-full animate-pulse delay-3000"></div>
//         <div className="absolute top-10 right-16 w-2 h-2 bg-cyan-400/50 rounded-full animate-ping delay-4000"></div>
//         <div className="absolute top-2 left-1/2 w-1 h-1 bg-pink-400/60 rounded-full animate-bounce delay-5000"></div>
//       </div>

//       {/* Bottom edge decorations */}
//       <div className="absolute bottom-0 left-1/4 right-1/4 h-16 pointer-events-none">
//         <div className="absolute bottom-4 left-8 w-3 h-3 bg-green-400/40 rounded-full animate-pulse delay-1500"></div>
//         <div className="absolute bottom-8 left-16 w-2 h-2 bg-yellow-400/50 rounded-full animate-ping delay-2500"></div>
//         <div className="absolute bottom-6 right-8 w-1 h-1 bg-red-400/60 rounded-full animate-bounce delay-3500"></div>
//         <div className="absolute bottom-10 right-16 w-4 h-4 bg-orange-400/30 rounded-full animate-pulse delay-4500"></div>
//         <div className="absolute bottom-2 left-1/2 w-2 h-2 bg-violet-400/50 rounded-full animate-ping delay-5500"></div>
//       </div>

//       {/* Header */}
//       <div className="relative z-10 flex justify-between items-center p-6 bg-white/90 backdrop-blur-md shadow-lg">
//         <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
//           <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
//             <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M9 4.804A7.968 7.968 0 005.5 4c-.979 0-1.907.197-2.75.553v14.6c.828-.403 1.745-.618 2.75-.618s1.922.215 2.75.618V4.804zM11 4.804A7.968 7.968 0 0114.5 4c.979 0 1.907.197 2.75.553v14.6c-.828-.403-1.745-.618-2.75-.618s-1.922.215-2.75.618V4.804z"/>
//             </svg>
//           </div>
//           PDF AI Notes
//         </div>
//         <UserButton/>
//       </div>

//       {/* Hero Section */}
//       <div className="relative z-10 text-center py-20 px-4">
//         {/* Main Heading with lighter colors and enhanced glow effect */}
//         <h1 className="text-5xl md:text-6xl font-bold text-gray-700 mb-6 px-4 leading-tight relative">
//           <span className="relative">
//             Simplify PDF
//             <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl -z-10 animate-pulse"></div>
//             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 blur-lg -z-10 animate-pulse delay-500"></div>
//           </span>
//           <br/>
//           <span className="text-indigo-500 relative">
//             Note-Taking
//             <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400/25 to-blue-400/25 blur-xl -z-10 animate-pulse delay-700"></div>
//             <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 blur-md -z-10 animate-pulse delay-1200"></div>
//           </span><br/>
//           with <span className="text-blue-500 relative">
//             AI-Powered
//             <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/25 to-cyan-400/25 blur-xl -z-10 animate-pulse delay-1400"></div>
//             <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-md -z-10 animate-pulse delay-1900"></div>
//           </span>
//         </h1>
        
//         {/* Enhanced Professional Icons with maximum cool animations */}
//         <div className="relative mx-auto max-w-4xl mb-12">
//           <div className="flex justify-center items-center">
//             {/* Enhanced Professional PDF and Document Icons */}
//             <div className="absolute -top-8 -left-16 animate-float">
//               <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer border border-indigo-200">
//                 <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M4 3a2 2 0 00-2 2v1.07a7.001 7.001 0 000 13.86V20a2 2 0 002 2h12a2 2 0 002-2v-.07a7.001 7.001 0 000-13.86V5a2 2 0 00-2-2H4zM9 15a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/>
//                 </svg>
//               </div>
//             </div>
            
//             <div className="absolute -top-8 -right-16 animate-float delay-1000">
//               <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer border border-blue-200">
//                 <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
//                   <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
//                 </svg>
//               </div>
//             </div>
            
//             <div className="absolute -bottom-4 -left-20 animate-float delay-2000">
//               <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer border border-purple-200">
//                 <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
//                 </svg>
//               </div>
//             </div>
            
//             <div className="absolute -bottom-4 -right-20 animate-float delay-3000">
//               <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer border border-green-200">
//                 <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                   <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
//                 </svg>
//               </div>
//             </div>
            
//             {/* Central AI Brain Icon with maximum rotating animation and glow */}
//             <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl shadow-2xl flex items-center justify-center relative animate-spin-slow">
//               <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/60 to-purple-600/60 rounded-xl blur-xl animate-pulse"></div>
//               <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-xl blur-2xl animate-pulse delay-1000"></div>
//               <svg className="w-10 h-10 text-white relative z-10 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
//               </svg>
//             </div>
//           </div>
//         </div>

//         {/* Fixed tagline - removed nested div inside p */}
//         <div className="text-xl md:text-2xl text-gray-600 mb-12 font-medium max-w-3xl mx-auto animate-fade-in relative">
//           <span className="relative">
//             Transform your PDF documents into intelligent, searchable notes with the power of artificial intelligence
//           </span>
//           <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-indigo-400/10 blur-lg -z-10 animate-pulse delay-2000"></div>
//         </div>

//         {/* Enhanced Action Buttons with authentication routing */}
//         <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
//           <Button 
//             onClick={handleGetStarted}
//             className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden group cursor-pointer"
//           >
//             <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
//             <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></span>
//             <span className="relative">{user ? 'Go to Dashboard' : 'Get Started Free'}</span>
//           </Button>
//           <Button variant="outline" className="border-2 border-indigo-600 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-110 transition-all duration-300 hover:shadow-xl hover:border-purple-600">
//             View Demo
//           </Button>
//         </div>

//         {/* Enhanced Feature Cards with maximum visual effects */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
//           {/* Cost Effective */}
//           <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 group relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-emerald-100/20 to-teal-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <div className="w-16 h-16 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500 shadow-lg">
//               <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
//                 <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Cost Effective</h3>
//             <p className="text-gray-600 relative z-10">Save time and money with automated note extraction and intelligent summarization</p>
//           </div>
          
//           {/* Lightning Fast */}
//           <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 group relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-orange-100/20 to-amber-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500 shadow-lg">
//               <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Lightning Fast</h3>
//             <p className="text-gray-600 relative z-10">Process multiple PDFs in seconds with our advanced AI processing technology</p>
//           </div>
          
//           {/* User Loved */}
//           <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 group relative overflow-hidden">
//             <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 via-pink-100/20 to-rose-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//             <div className="w-16 h-16 bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500 shadow-lg">
//               <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
//               </svg>
//             </div>
//             <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">User Loved</h3>
//             <p className="text-gray-600 relative z-10">Join thousands of satisfied users who trust our platform for their note-taking needs</p>
//           </div>
//         </div>
//       </div>

//       {/* Enhanced custom CSS animations */}
//       <style jsx>{`
//         @keyframes float {
//           0%, 100% { transform: translateY(0px) rotate(0deg); }
//           33% { transform: translateY(-8px) rotate(1deg); }
//           66% { transform: translateY(-4px) rotate(-1deg); }
//         }
//         @keyframes spin-slow {
//           from { transform: rotate(0deg); }
//           to { transform: rotate(360deg); }
//         }
//         @keyframes fade-in {
//           from { opacity: 0; transform: translateY(30px); }
//           to { opacity: 1; transform: translateY(0); }
//         }
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }
//         .animate-spin-slow {
//           animation: spin-slow 15s linear infinite;
//         }
//         .animate-fade-in {
//           animation: fade-in 1.5s ease-out 0.8s both;
//         }
//         .shadow-3xl {
//           box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
//         }
//       `}</style>
//     </div>
//   )
// }


"use client"
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api"
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function Home() {
  const {user} = useUser();
  const createUser=useMutation(api.user.createUser);
  const router = useRouter();
  const [showGuidelines, setShowGuidelines] = useState(false);
  
  useEffect(()=>{
     user&&CheckUser();
  },[user])

  const CheckUser=async()=>{
     const result=await createUser({
      email:user?.primaryEmailAddress?.emailAddress,
      imageUrl:user?.imageUrl,
      userName:user?.fullName
     });
     console.log(result);
  }

  const handleGetStarted = () => {
    if (user) {
      // User is already signed in, redirect to dashboard
      router.push('/dashboard');
    } else {
      // User is not signed in, redirect to sign-in page
      router.push('/sign-in');
    }
  };

  const handleGuidelinesClick = () => {
    setShowGuidelines(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-br from-blue-400/30 to-cyan-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-2xl animate-bounce delay-2000"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-emerald-400/20 to-teal-400/20 rounded-full blur-2xl animate-pulse delay-3000"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-2xl animate-bounce delay-4000"></div>
      </div>

      {/* Massive Left Side Decorative Elements */}
      <div className="absolute left-0 top-0 h-full w-48 pointer-events-none">
        {/* More particles */}
        <div className="absolute top-16 left-2 w-3 h-3 bg-indigo-400/40 rounded-full animate-pulse"></div>
        <div className="absolute top-20 left-8 w-4 h-4 bg-purple-400/50 rounded-full animate-ping delay-500"></div>
        <div className="absolute top-32 left-4 w-2 h-2 bg-blue-400/60 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-40 left-12 w-5 h-5 bg-cyan-400/40 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute top-48 left-6 w-3 h-3 bg-pink-400/50 rounded-full animate-ping delay-2000"></div>
        <div className="absolute top-56 left-10 w-4 h-4 bg-green-400/40 rounded-full animate-bounce delay-2500"></div>
        <div className="absolute top-64 left-2 w-2 h-2 bg-yellow-400/60 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute top-72 left-14 w-6 h-6 bg-violet-400/30 rounded-full animate-ping delay-3500"></div>
        <div className="absolute top-80 left-8 w-3 h-3 bg-rose-400/50 rounded-full animate-bounce delay-4000"></div>
        <div className="absolute top-88 left-4 w-5 h-5 bg-sky-400/40 rounded-full animate-pulse delay-4500"></div>
        <div className="absolute top-96 left-12 w-2 h-2 bg-lime-400/60 rounded-full animate-ping delay-5000"></div>
        <div className="absolute top-104 left-6 w-4 h-4 bg-amber-400/50 rounded-full animate-bounce delay-5500"></div>
        
        {/* Enhanced gradient bars */}
        <div className="absolute top-24 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent animate-pulse"></div>
        <div className="absolute top-36 left-0 w-28 h-1 bg-gradient-to-r from-transparent via-purple-400/40 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-44 left-0 w-36 h-1 bg-gradient-to-r from-transparent via-blue-400/40 to-transparent animate-pulse delay-2000"></div>
        <div className="absolute top-52 left-0 w-24 h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent animate-pulse delay-3000"></div>
        <div className="absolute top-60 left-0 w-40 h-1 bg-gradient-to-r from-transparent via-pink-400/40 to-transparent animate-pulse delay-4000"></div>
        <div className="absolute top-68 left-0 w-20 h-1 bg-gradient-to-r from-transparent via-green-400/40 to-transparent animate-pulse delay-5000"></div>
        <div className="absolute top-76 left-0 w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400/40 to-transparent animate-pulse delay-6000"></div>
        <div className="absolute top-84 left-0 w-28 h-1 bg-gradient-to-r from-transparent via-violet-400/40 to-transparent animate-pulse delay-7000"></div>
        <div className="absolute top-92 left-0 w-36 h-1 bg-gradient-to-r from-transparent via-rose-400/40 to-transparent animate-pulse delay-8000"></div>
        
        {/* Vertical gradient lines */}
        <div className="absolute top-0 left-16 w-1 h-32 bg-gradient-to-b from-transparent via-indigo-400/30 to-transparent animate-pulse delay-1000"></div>
        <div className="absolute top-20 left-24 w-1 h-28 bg-gradient-to-b from-transparent via-purple-400/30 to-transparent animate-pulse delay-2000"></div>
        <div className="absolute top-40 left-32 w-1 h-24 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent animate-pulse delay-3000"></div>
      </div>

      {/* Massive Right Side Decorative Elements */}
      <div className="absolute right-0 top-0 h-full w-48 pointer-events-none">
        {/* More particles */}
        <div className="absolute top-18 right-2 w-4 h-4 bg-green-400/40 rounded-full animate-ping"></div>
        <div className="absolute top-28 right-10 w-3 h-3 bg-yellow-400/50 rounded-full animate-bounce delay-500"></div>
        <div className="absolute top-36 right-6 w-5 h-5 bg-red-400/40 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-44 right-14 w-2 h-2 bg-orange-400/60 rounded-full animate-ping delay-1500"></div>
        <div className="absolute top-52 right-8 w-4 h-4 bg-violet-400/50 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-60 right-4 w-3 h-3 bg-teal-400/40 rounded-full animate-pulse delay-2500"></div>
        <div className="absolute top-68 right-12 w-6 h-6 bg-emerald-400/30 rounded-full animate-ping delay-3000"></div>
        <div className="absolute top-76 right-2 w-2 h-2 bg-slate-400/50 rounded-full animate-bounce delay-3500"></div>
        <div className="absolute top-84 right-16 w-5 h-5 bg-stone-400/40 rounded-full animate-pulse delay-4000"></div>
        <div className="absolute top-92 right-6 w-3 h-3 bg-neutral-400/60 rounded-full animate-ping delay-4500"></div>
        <div className="absolute top-100 right-10 w-4 h-4 bg-zinc-400/50 rounded-full animate-bounce delay-5000"></div>
        <div className="absolute top-108 right-14 w-2 h-2 bg-gray-400/40 rounded-full animate-pulse delay-5500"></div>
        
        {/* Enhanced gradient bars */}
        <div className="absolute top-22 right-0 w-32 h-1 bg-gradient-to-l from-transparent via-green-400/40 to-transparent animate-pulse delay-500"></div>
        <div className="absolute top-30 right-0 w-28 h-1 bg-gradient-to-l from-transparent via-yellow-400/40 to-transparent animate-pulse delay-1500"></div>
        <div className="absolute top-38 right-0 w-36 h-1 bg-gradient-to-l from-transparent via-red-400/40 to-transparent animate-pulse delay-2500"></div>
        <div className="absolute top-46 right-0 w-24 h-1 bg-gradient-to-l from-transparent via-orange-400/40 to-transparent animate-pulse delay-3500"></div>
        <div className="absolute top-54 right-0 w-40 h-1 bg-gradient-to-l from-transparent via-violet-400/40 to-transparent animate-pulse delay-4500"></div>
        <div className="absolute top-62 right-0 w-20 h-1 bg-gradient-to-l from-transparent via-teal-400/40 to-transparent animate-pulse delay-5500"></div>
        <div className="absolute top-70 right-0 w-32 h-1 bg-gradient-to-l from-transparent via-emerald-400/40 to-transparent animate-pulse delay-6500"></div>
        <div className="absolute top-78 right-0 w-28 h-1 bg-gradient-to-l from-transparent via-slate-400/40 to-transparent animate-pulse delay-7500"></div>
        <div className="absolute top-86 right-0 w-36 h-1 bg-gradient-to-l from-transparent via-stone-400/40 to-transparent animate-pulse delay-8500"></div>
        
        {/* Vertical gradient lines */}
        <div className="absolute top-0 right-16 w-1 h-32 bg-gradient-to-b from-transparent via-green-400/30 to-transparent animate-pulse delay-1500"></div>
        <div className="absolute top-20 right-24 w-1 h-28 bg-gradient-to-b from-transparent via-yellow-400/30 to-transparent animate-pulse delay-2500"></div>
        <div className="absolute top-40 right-32 w-1 h-24 bg-gradient-to-b from-transparent via-red-400/30 to-transparent animate-pulse delay-3500"></div>
      </div>

      {/* Enhanced Floating particles everywhere */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-300"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-700"></div>
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-40 w-1 h-1 bg-pink-400 rounded-full animate-ping delay-1500"></div>
        <div className="absolute top-60 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-2000"></div>
        <div className="absolute top-80 right-1/3 w-1 h-1 bg-green-400 rounded-full animate-ping delay-2500"></div>
        <div className="absolute bottom-60 left-1/4 w-2 h-2 bg-yellow-400 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute bottom-80 right-1/4 w-3 h-3 bg-red-400 rounded-full animate-bounce delay-3500"></div>
        <div className="absolute top-100 left-2/3 w-1 h-1 bg-violet-400 rounded-full animate-ping delay-4000"></div>
        <div className="absolute bottom-100 right-2/3 w-2 h-2 bg-orange-400 rounded-full animate-pulse delay-4500"></div>
        
        {/* More scattered particles */}
        <div className="absolute top-1/4 left-1/5 w-1 h-1 bg-emerald-400/60 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-2/4 right-1/5 w-2 h-2 bg-teal-400/50 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-3/4 left-2/5 w-1 h-1 bg-lime-400/60 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute bottom-1/4 right-2/5 w-3 h-3 bg-amber-400/40 rounded-full animate-ping delay-4000"></div>
        <div className="absolute top-1/3 left-3/4 w-2 h-2 bg-sky-400/50 rounded-full animate-bounce delay-5000"></div>
        <div className="absolute bottom-1/3 right-3/4 w-1 h-1 bg-rose-400/60 rounded-full animate-pulse delay-6000"></div>
      </div>

      {/* Enhanced Left Side Floating Icons */}
      <div className="absolute left-8 top-1/4 pointer-events-none">
        <div className="flex flex-col space-y-6">
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-indigo-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"/>
            </svg>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-800 hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-purple-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-1600 hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-blue-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-2400 hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-cyan-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-3200 hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-pink-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Enhanced Right Side Floating Icons */}
      <div className="absolute right-8 top-1/4 pointer-events-none">
        <div className="flex flex-col space-y-6">
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-400 hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-green-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-1200 hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-yellow-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-2000 hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-red-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-2800 hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-orange-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
          </div>
          <div className="bg-white/30 backdrop-blur-sm p-3 rounded-xl shadow-lg animate-float delay-3600 hover:bg-white/40 transition-all">
            <svg className="w-6 h-6 text-violet-600/80" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Top edge decorations */}
      <div className="absolute top-0 left-1/4 right-1/4 h-16 pointer-events-none">
        <div className="absolute top-4 left-8 w-2 h-2 bg-indigo-400/50 rounded-full animate-ping delay-1000"></div>
        <div className="absolute top-8 left-16 w-1 h-1 bg-purple-400/60 rounded-full animate-bounce delay-2000"></div>
        <div className="absolute top-6 right-8 w-3 h-3 bg-blue-400/40 rounded-full animate-pulse delay-3000"></div>
        <div className="absolute top-10 right-16 w-2 h-2 bg-cyan-400/50 rounded-full animate-ping delay-4000"></div>
        <div className="absolute top-2 left-1/2 w-1 h-1 bg-pink-400/60 rounded-full animate-bounce delay-5000"></div>
      </div>

      {/* Bottom edge decorations */}
      <div className="absolute bottom-0 left-1/4 right-1/4 h-16 pointer-events-none">
        <div className="absolute bottom-4 left-8 w-3 h-3 bg-green-400/40 rounded-full animate-pulse delay-1500"></div>
        <div className="absolute bottom-8 left-16 w-2 h-2 bg-yellow-400/50 rounded-full animate-ping delay-2500"></div>
        <div className="absolute bottom-6 right-8 w-1 h-1 bg-red-400/60 rounded-full animate-bounce delay-3500"></div>
        <div className="absolute bottom-10 right-16 w-4 h-4 bg-orange-400/30 rounded-full animate-pulse delay-4500"></div>
        <div className="absolute bottom-2 left-1/2 w-2 h-2 bg-violet-400/50 rounded-full animate-ping delay-5500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-6 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-.979 0-1.907.197-2.75.553v14.6c.828-.403 1.745-.618 2.75-.618s1.922.215 2.75.618V4.804zM11 4.804A7.968 7.968 0 0114.5 4c.979 0 1.907.197 2.75.553v14.6c-.828-.403-1.745-.618-2.75-.618s-1.922.215-2.75.618V4.804z"/>
            </svg>
          </div>
          PDF AI Notes
        </div>
        <UserButton/>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 text-center py-20 px-4">
        {/* Main Heading with lighter colors and enhanced glow effect */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-700 mb-6 px-4 leading-tight relative">
          <span className="relative">
            Simplify PDF
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 blur-xl -z-10 animate-pulse"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/15 to-purple-400/15 blur-lg -z-10 animate-pulse delay-500"></div>
          </span>
          <br/>
          <span className="text-indigo-500 relative">
            Note-Taking
            <div className="absolute -inset-2 bg-gradient-to-r from-indigo-400/25 to-blue-400/25 blur-xl -z-10 animate-pulse delay-700"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400/20 to-blue-400/20 blur-md -z-10 animate-pulse delay-1200"></div>
          </span><br/>
          with <span className="text-blue-500 relative">
            AI-Powered
            <div className="absolute -inset-2 bg-gradient-to-r from-blue-400/25 to-cyan-400/25 blur-xl -z-10 animate-pulse delay-1400"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 blur-md -z-10 animate-pulse delay-1900"></div>
          </span>
        </h1>
        
        {/* Enhanced Professional Icons with maximum cool animations */}
        <div className="relative mx-auto max-w-4xl mb-12">
          <div className="flex justify-center items-center">
            {/* Enhanced Professional PDF and Document Icons */}
            <div className="absolute -top-8 -left-16 animate-float">
              <div className="bg-gradient-to-br from-indigo-100 to-indigo-200 p-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer border border-indigo-200">
                <svg className="w-8 h-8 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 3a2 2 0 00-2 2v1.07a7.001 7.001 0 000 13.86V20a2 2 0 002 2h12a2 2 0 002-2v-.07a7.001 7.001 0 000-13.86V5a2 2 0 00-2-2H4zM9 15a1 1 0 11-2 0 1 1 0 012 0zm4 0a1 1 0 11-2 0 1 1 0 012 0z"/>
                </svg>
              </div>
            </div>
            
            <div className="absolute -top-8 -right-16 animate-float delay-1000">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 p-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer border border-blue-200">
                <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"/>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2v1a2 2 0 002 2h6a2 2 0 002-2V3a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -left-20 animate-float delay-2000">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 p-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer border border-purple-200">
                <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-20 animate-float delay-3000">
              <div className="bg-gradient-to-br from-green-100 to-green-200 p-3 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-125 hover:rotate-12 transition-all duration-300 cursor-pointer border border-green-200">
                <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"/>
                </svg>
              </div>
            </div>
            
            {/* Central AI Brain Icon with maximum rotating animation and glow */}
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 rounded-xl shadow-2xl flex items-center justify-center relative animate-spin-slow">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/60 to-purple-600/60 rounded-xl blur-xl animate-pulse"></div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/40 to-pink-600/40 rounded-xl blur-2xl animate-pulse delay-1000"></div>
              <svg className="w-10 h-10 text-white relative z-10 drop-shadow-lg" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd"/>
              </svg>
            </div>
          </div>
        </div>

        {/* Fixed tagline - removed nested div inside p */}
        <div className="text-xl md:text-2xl text-gray-600 mb-12 font-medium max-w-3xl mx-auto animate-fade-in relative">
          <span className="relative">
            Transform your PDF documents into intelligent, searchable notes with the power of artificial intelligence
          </span>
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400/10 via-purple-400/10 to-indigo-400/10 blur-lg -z-10 animate-pulse delay-2000"></div>
        </div>

        {/* Enhanced Action Buttons with authentication routing */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
          <Button 
            onClick={handleGetStarted}
            className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-2xl transform hover:scale-110 transition-all duration-300 relative overflow-hidden group cursor-pointer"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></span>
            <span className="relative">{user ? 'Go to Dashboard' : 'Get Started Free'}</span>
          </Button>
          <Button 
            onClick={handleGuidelinesClick}
            variant="outline" 
            className="border-2 border-indigo-600 text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 px-8 py-4 rounded-lg text-lg font-semibold transform hover:scale-110 transition-all duration-300 hover:shadow-xl hover:border-purple-600"
          >
            Guidelines
          </Button>
        </div>

        {/* Enhanced Feature Cards with maximum visual effects */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
          {/* Cost Effective */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-green-100/20 via-emerald-100/20 to-teal-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500 shadow-lg">
              <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z"/>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Cost Effective</h3>
            <p className="text-gray-600 relative z-10">Save time and money with automated note extraction and intelligent summarization</p>
          </div>
          
          {/* Lightning Fast */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:rotate-2 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-100/20 via-orange-100/20 to-amber-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500 shadow-lg">
              <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">Lightning Fast</h3>
            <p className="text-gray-600 relative z-10">Process multiple PDFs in seconds with our advanced AI processing technology</p>
          </div>
          
          {/* User Loved */}
          <div className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-all duration-500 transform hover:scale-110 hover:-rotate-2 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-red-100/20 via-pink-100/20 to-rose-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-16 h-16 bg-gradient-to-br from-red-100 via-pink-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:rotate-180 group-hover:scale-125 transition-all duration-500 shadow-lg">
              <svg className="w-8 h-8 text-red-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">User Loved</h3>
            <p className="text-gray-600 relative z-10">Join thousands of satisfied users who trust our platform for their note-taking needs</p>
          </div>
        </div>
      </div>

      {/* Professional Guidelines Modal */}
      <Dialog open={showGuidelines} onOpenChange={setShowGuidelines}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
    

          <DialogHeader className="border-b border-gray-200 pb-6">
            <DialogTitle className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 4.804A7.968 7.968 0 005.5 4c-.979 0-1.907.197-2.75.553v14.6c.828-.403 1.745-.618 2.75-.618s1.922.215 2.75.618V4.804zM11 4.804A7.968 7.968 0 0114.5 4c.979 0 1.907.197 2.75.553v14.6c-.828-.403-1.745-.618-2.75-.618s-1.922.215-2.75.618V4.804z"/>
                </svg>
              </div>
              PDF AI Notes - Professional User Guide
            </DialogTitle>
            <DialogDescription className="text-lg text-gray-600 mt-2">
              Comprehensive documentation for maximizing productivity with our AI-powered platform
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-8">
            {/* Table of Contents */}
            <div className="bg-gray-50 rounded-xl p-6 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Table of Contents</h3>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">Getting Started</p>
                  <ul className="space-y-1 text-gray-600 ml-4">
                    <li>• Account Setup</li>
                    <li>• Initial Configuration</li>
                    <li>• Dashboard Overview</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">Document Management</p>
                  <ul className="space-y-1 text-gray-600 ml-4">
                    <li>• Upload Requirements</li>
                    <li>• Processing Pipeline</li>
                    <li>• Quality Guidelines</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-700">AI Features</p>
                  <ul className="space-y-1 text-gray-600 ml-4">
                    <li>• Smart Analysis</li>
                    <li>• Interactive Q&A</li>
                    <li>• Best Practices</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-y-12">
              {/* Section 1: Getting Started */}
              <section className="border-l-4 border-indigo-500 pl-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <span className="text-indigo-600 font-bold text-lg">1</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Getting Started</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Setup & Onboarding</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Create your account using email or social login</p>
                          <p className="text-sm text-gray-600 mt-1">Free tier includes 5 documents with full AI features</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Complete profile setup for personalized experience</p>
                          <p className="text-sm text-gray-600 mt-1">Configure preferences for better AI recommendations</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                          <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">Explore the dashboard and familiarize yourself with the interface</p>
                          <p className="text-sm text-gray-600 mt-1">Take the interactive tour for optimal user experience</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">System Requirements</h3>
                    <div className="bg-white rounded-lg border border-gray-200 p-4">
                      <table className="w-full text-sm">
                        <tbody className="space-y-2">
                          <tr>
                            <td className="font-medium text-gray-700 py-2">Browser Support</td>
                            <td className="text-gray-600 py-2">Chrome 90+, Firefox 88+, Safari 14+</td>
                          </tr>
                          <tr>
                            <td className="font-medium text-gray-700 py-2">Internet Connection</td>
                            <td className="text-gray-600 py-2">Stable broadband (5 Mbps recommended)</td>
                          </tr>
                          <tr>
                            <td className="font-medium text-gray-700 py-2">File Size Limit</td>
                            <td className="text-gray-600 py-2">10MB per document (Free), 50MB (Premium)</td>
                          </tr>
                          <tr>
                            <td className="font-medium text-gray-700 py-2">Processing Time</td>
                            <td className="text-gray-600 py-2">10-30 seconds per document</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 2: Document Management */}
              <section className="border-l-4 border-blue-500 pl-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-lg">2</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Document Management</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Requirements</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">PDF format only</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">Text-based content preferred</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">High-resolution scans acceptable</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-700">No password protection</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Quality Guidelines</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-700">Optimal Quality</p>
                          <p className="text-sm text-gray-600">300+ DPI, clear text, minimal noise</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-700">Acceptable Quality</p>
                          <p className="text-sm text-gray-600">200+ DPI, readable text, some artifacts</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-red-500 rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium text-gray-700">Poor Quality</p>
                          <p className="text-sm text-gray-600">Below 150 DPI, blurry, heavily distorted</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Processing Pipeline</h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-bold">1</span>
                        </div>
                        <span className="text-sm text-gray-700">Upload & Validation</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-bold">2</span>
                        </div>
                        <span className="text-sm text-gray-700">Text Extraction</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-bold">3</span>
                        </div>
                        <span className="text-sm text-gray-700">AI Analysis & Indexing</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-blue-600 text-xs font-bold">4</span>
                        </div>
                        <span className="text-sm text-gray-700">Ready for Use</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 3: AI Features */}
              <section className="border-l-4 border-purple-500 pl-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-lg">3</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">AI-Powered Features</h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Smart Analysis Capabilities</h3>
                    <div className="space-y-4">
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-800">Content Summarization</h4>
                        </div>
                        <p className="text-sm text-gray-600">Automatic generation of key points and executive summaries from complex documents.</p>
                      </div>
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-800">Semantic Search</h4>
                        </div>
                        <p className="text-sm text-gray-600">Find information using natural language queries, not just keyword matching.</p>
                      </div>
                      <div className="bg-white rounded-lg border border-gray-200 p-4">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                            <svg className="w-4 h-4 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd"/>
                            </svg>
                          </div>
                          <h4 className="font-semibold text-gray-800">Context-Aware Q&A</h4>
                        </div>
                        <p className="text-sm text-gray-600">Ask specific questions about document content and receive detailed, contextual answers.</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Best Practices for AI Interaction</h3>
                    <div className="space-y-6">
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Effective Query Formulation</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span className="text-gray-700">"What are the key findings in section 3 about market trends?"</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span className="text-gray-700">"Summarize the methodology used in this research"</span>
                          </div>
                          <div className="flex items-start gap-2">
                            <span className="text-red-600 font-bold">✗</span>
                            <span className="text-gray-700">"Tell me about this document"</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-800 mb-3">Optimizing Results</h4>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>• Be specific with your questions</li>
                          <li>• Reference particular sections or topics</li>
                          <li>• Ask follow-up questions for clarity</li>
                          <li>• Use the text selection feature for targeted analysis</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Section 4: Advanced Features & Pricing */}
              <section className="border-l-4 border-green-500 pl-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-green-600 font-bold text-lg">4</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">Plans & Advanced Features</h2>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Free Plan */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Free Plan</h3>
                      <div className="text-3xl font-bold text-gray-600 mb-1">$0</div>
                      <p className="text-sm text-gray-500">Perfect for getting started</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">5 PDF documents</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Basic AI analysis</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Email support</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Web-based access</span>
                      </li>
                    </ul>
                  </div>

                  {/* Premium Plan */}
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-200 p-6 relative">
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Premium Plan</h3>
                      <div className="text-3xl font-bold text-indigo-600 mb-1">$9.99</div>
                      <p className="text-sm text-gray-500">One-time payment</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700"><strong>Unlimited</strong> PDF documents</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Advanced AI features</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Priority support</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Export options</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Batch processing</span>
                      </li>
                    </ul>
                  </div>

                  {/* Enterprise Plan */}
                  <div className="bg-white rounded-xl border-2 border-gray-200 p-6">
                    <div className="text-center mb-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">Enterprise</h3>
                      <div className="text-3xl font-bold text-gray-900 mb-1">Custom</div>
                      <p className="text-sm text-gray-500">For large organizations</p>
                    </div>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Everything in Premium</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Team management</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">API access</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Custom integrations</span>
                      </li>
                      <li className="flex items-center gap-3">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm text-gray-700">Dedicated support</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* Support & Contact Information */}
              <section className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8">
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Professional Support</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Our dedicated support team is here to ensure your success with PDF AI Notes. 
                    Get help when you need it, from onboarding to advanced feature implementation.
                  </p>
                </div>
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Email Support</h3>
                    <p className="text-sm text-gray-600">support@pdfainotes.com</p>
                    <p className="text-xs text-gray-500 mt-1">24-48 hour response</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Live Chat</h3>
                    <p className="text-sm text-gray-600">Available in-app</p>
                    <p className="text-xs text-gray-500 mt-1">Business hours only</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Knowledge Base</h3>
                    <p className="text-sm text-gray-600">Comprehensive guides</p>
                    <p className="text-xs text-gray-500 mt-1">Available 24/7</p>
                  </div>
                  <div>
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <svg className="w-6 h-6 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">Premium Support</h3>
                    <p className="text-sm text-gray-600">Priority assistance</p>
                    <p className="text-xs text-gray-500 mt-1">For premium users</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Enhanced custom CSS animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-8px) rotate(1deg); }
          66% { transform: translateY(-4px) rotate(-1deg); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out 0.8s both;
        }
        .shadow-3xl {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
      `}</style>
    </div>
  )
}


