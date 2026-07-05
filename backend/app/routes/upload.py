from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from app.models import UploadDocumentResponse, UploadDocumentRequest

router = APIRouter(prefix="/api/upload", tags=["Upload"])

@router.post("/", response_model=UploadDocumentResponse)
async def upload_document(file: UploadFile = File(...)):
    try:
        # Read the file content
        file_content = await file.read()
        
        # Here you would typically save the file to a database or storage
        # For demonstration, we will just return a success response
        
        response = UploadDocumentResponse(
            success=True,
            message=f"File '{file.filename}' uploaded successfully."
        )
        return JSONResponse(status_code=200, content=response.model_dump())
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))