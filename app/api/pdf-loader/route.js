import { NextResponse } from "next/server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

//const pdfUrl="https://flippant-camel-737.convex.cloud/api/storage/9c386ce4-0d9b-4608-9acd-16985376b161"
export async function GET(req) {
    
    const reqUrl=req.url;
    const {searchParams}=new URL(reqUrl);
    const pdfUrl=searchParams.get('pdfUrl');
    console.log(pdfUrl);
    //1. Load the PDF File
    const response=await fetch(pdfUrl);
    const data=await response.blob();
    const loader=new WebPDFLoader(data); 
    const docs=await loader.load();

    let pdfTextContent='';
    docs.forEach(doc=>{
        pdfTextContent=pdfTextContent+doc.pageContent+" ";
    })

    //2. Split the Text into Small Chunks
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize: 100,
        chunkOverlap: 20,
       });
       const output = await splitter.createDocuments([pdfTextContent]);

       let splitterList=[];
       output.forEach(doc=>{
        splitterList.push(doc.pageContent);
       })

    return NextResponse.json({result:splitterList})
    
}