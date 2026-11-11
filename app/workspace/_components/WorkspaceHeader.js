// import { UserButton } from '@clerk/nextjs'
// import React from 'react'
// import Image from 'next/image'
// import { Button } from '@/components/ui/button'

// function WorkspaceHeader({fileName}) {
//   return (
//     <div className='p-4 flex justify-between shadow-md'>
//         <Image src={'/logo.svg'} alt='logo' width={140} height={100}/>
//         <h2 className='font-bold'>{fileName}</h2>
//         <div className='flex gap-2 items-center'>
//           <Button>Save</Button>
//            <UserButton/>
//         </div>
//     </div>
//   )
// }

// export default WorkspaceHeader


// import { UserButton } from '@clerk/nextjs'
// import React from 'react'
// import { Button } from '@/components/ui/button'

// function WorkspaceHeader({fileName}) {
//   return (
//     <div className='p-4 flex justify-between shadow-md'>
//         <div className="text-2xl font-bold text-indigo-600 flex items-center gap-2">
//           <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center shadow-lg animate-pulse">
//             <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M9 4.804A7.968 7.968 0 005.5 4c-.979 0-1.907.197-2.75.553v14.6c.828-.403 1.745-.618 2.75-.618s1.922.215 2.75.618V4.804zM11 4.804A7.968 7.968 0 0114.5 4c.979 0 1.907.197 2.75.553v14.6c-.828-.403-1.745-.618-2.75-.618s-1.922.215-2.75.618V4.804z"/>
//             </svg>
//           </div>
//           PDF AI Notes
//         </div>
//         <h2 className='font-bold'>{fileName}</h2>
//         <div className='flex gap-2 items-center'>
//           <Button>Save</Button>
//            <UserButton/>
//         </div>
//     </div>
//   )
// }

// export default WorkspaceHeader

import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from '@/components/ui/button'
import { Save, FileText } from 'lucide-react'
import { useRouter } from 'next/navigation'

function WorkspaceHeader({ fileName }) {
  const router = useRouter()

  const handleSave = () => {
    // perform your save logic here...
    router.push('/dashboard')
  }

  return (
    <div className="p-6 flex justify-between items-center bg-white/95 backdrop-blur-sm border border-gray-200/50 rounded-3xl shadow-xl mb-8">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
          <svg
            className="w-8 h-8 text-white drop-shadow-lg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9 4.804A7.968 7.968 0 005.5 4c-.979 0-1.907.197-2.75.553v14.6c.828-.403 1.745-.618 2.75-.618s1.922.215 2.75.618V4.804zM11 4.804A7.968 7.968 0 0114.5 4c.979 0 1.907.197 2.75.553v14.6c-.828-.403-1.745-.618-2.75-.618s-1.922.215-2.75.618V4.804z" />
          </svg>
        </div>
        <div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            FocusFlow
          </h1>
          <p className="text-sm text-indigo-600 font-semibold">Document Workspace</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 bg-gradient-to-r from-gray-50 to-blue-50/50 px-6 py-3 rounded-2xl border border-gray-200/50">
        <FileText className="w-5 h-5 text-blue-600" />
        <h2 className="text-lg font-bold text-gray-800 tracking-wide">
          {fileName || "Untitled Document"}
        </h2>
      </div>
      
      <div className="flex gap-3 items-center">
        <Button
          onClick={handleSave}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold px-6 py-3 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Save Changes
        </Button>
        <div className="p-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl">
          <div className="bg-white rounded-xl p-1">
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkspaceHeader


