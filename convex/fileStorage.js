// import { handler } from "next/dist/build/templates/app-page";
// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";


// export const generateUploadUrl = mutation({
//   handler: async (ctx) => {
//     return await ctx.storage.generateUploadUrl();
//   },
// });

// export const AddFileEntryToDb=mutation({
//     args:v.object({
//         fileId:v.string(),
//         storageId:v.string(),
//         fileName:v.string(),
//         createdBy:v.string(),
//         fileUrl:v.string()
//     }),
//     handler:async(ctx,args)=>{
//         const result=await ctx.db.insert('pdfFiles',{
//             fileId:args.fileId,
//             fileName:args.fileName,
//             storageId:args.storageId,
//             fileUrl:args.fileUrl,
//             createdBy:args.createdBy
//         })
//         return 'Inserted'
//     }
// })

// export const getFileUrl=mutation({
//     args:{
//         storageId:v.string()
//     },
//     handler:async(ctx,args)=>{
//         const url=await ctx.storage.getUrl(args.storageId);
//         return url;
//     }
// })

// export const GetFileRecord=query({
//     args:{
//         fileId:v.string()
//     },
//     handler:async(ctx,args)=>{
//         const result=await ctx.db.query('pdfFiles')
//         .filter((q)=>q.eq(q.field('fileId'),args.fileId))
//         .collect();
//         console.log(result);

//         return result[0];

//     }
// })

// export const GetUserFiles=query({
//     args:{
//         userEmail:v.optional(v.string())
//     },
//     handler:async(ctx,args)=>{

//         if(!args?.userEmail){
//             return;
//         }

//         const result=await ctx.db.query('pdfFiles')
//         .filter((q)=>q.eq(q.field('createdBy'),args.userEmail)).collect();

//         return (result);
//     }
// })


// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// export const generateUploadUrl = mutation({
//   handler: async (ctx) => {
//     return await ctx.storage.generateUploadUrl();
//   },
// });

// export const AddFileEntryToDb = mutation({
//   args: v.object({
//     fileId: v.string(),
//     storageId: v.string(),
//     fileName: v.string(),
//     createdBy: v.string(),
//     fileUrl: v.string(),
//   }),
//   handler: async (ctx, args) => {
//     await ctx.db.insert("pdfFiles", {
//       fileId: args.fileId,
//       fileName: args.fileName,
//       storageId: args.storageId,
//       fileUrl: args.fileUrl,
//       createdBy: args.createdBy,
//     });
//     return "Inserted";
//   },
// });

// export const getFileUrl = mutation({
//   args: {
//     storageId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const url = await ctx.storage.getUrl(args.storageId);
//     return url;
//   },
// });

// export const GetFileRecord = query({
//   args: {
//     fileId: v.string(),
//   },
//   handler: async (ctx, args) => {
//     const result = await ctx.db
//       .query("pdfFiles")
//       .filter((q) => q.eq(q.field("fileId"), args.fileId))
//       .collect();
//     return result[0];
//   },
// });

// export const GetUserFiles = query({
//   args: {
//     userEmail: v.optional(v.string()),
//   },
//   handler: async (ctx, args) => {
//     if (!args?.userEmail) {
//       return;
//     }
//     return await ctx.db
//       .query("pdfFiles")
//       .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
//       .collect();
//   },
// });

// // Delete mutation to remove file for paid users only
// export const deleteFile = mutation({
//   args: v.object({
//     storageId: v.string(),
//     fileId: v.string(),
//     userEmail: v.string(),
//   }),
//   handler: async (ctx, args) => {
//     // Check if the user is a paid subscriber
//     const user = await ctx.db
//       .query("users")  // FIX: should be "users" not "user"
//       .filter((q) => q.eq(q.field("email"), args.userEmail))
//       .unique();

//     if (!user?.upgrade) {
//       throw new Error("Only paid users can delete files.");
//     }

//     // Delete from storage
//     await ctx.storage.delete(args.storageId);

//     // Delete from database
//     await ctx.db.delete(args.fileId);

//     return { success: true };
//   },
// });



import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const AddFileEntryToDb = mutation({
  args: v.object({
    fileId: v.string(),
    storageId: v.string(),
    fileName: v.string(),
    createdBy: v.string(),
    fileUrl: v.string(),
  }),
  handler: async (ctx, args) => {
    await ctx.db.insert("pdfFiles", {
      fileId: args.fileId,
      fileName: args.fileName,
      storageId: args.storageId,
      fileUrl: args.fileUrl,
      createdBy: args.createdBy,
    });
    return "Inserted";
  },
});

export const getFileUrl = mutation({
  args: {
    storageId: v.string(),
  },
  handler: async (ctx, args) => {
    const url = await ctx.storage.getUrl(args.storageId);
    return url;
  },
});

export const GetFileRecord = query({
  args: {
    fileId: v.string(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .collect();
    return result[0];
  },
});

export const GetUserFiles = query({
  args: {
    userEmail: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (!args?.userEmail) {
      return [];
    }
    return await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("createdBy"), args.userEmail))
      .collect();
  },
});

// Delete mutation to remove file for paid users only
export const deleteFile = mutation({
  args: v.object({
    storageId: v.string(),
    fileId: v.string(),
    userEmail: v.string(),
  }),
  handler: async (ctx, args) => {
    // Check if the user is a paid subscriber
    const user = await ctx.db
      .query("users")  // FIXED: correct table name
      .filter((q) => q.eq(q.field("email"), args.userEmail))
      .unique();

    if (!user?.upgrade) {
      throw new Error("Only paid users can delete files.");
    }

    // FIXED: Find the database record first using your custom fileId
    const fileRecord = await ctx.db
      .query("pdfFiles")
      .filter((q) => q.eq(q.field("fileId"), args.fileId))
      .unique();

    if (!fileRecord) {
      throw new Error("File not found");
    }

    // Delete from storage
    await ctx.storage.delete(args.storageId);

    // FIXED: Delete from database using the document _id, not your custom fileId
    await ctx.db.delete(fileRecord._id);

    return { success: true };
  },
});