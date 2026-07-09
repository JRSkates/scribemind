from pydantic import BaseModel, Field

class UploadDocumentRequest(BaseModel):
    file_name: str = Field(..., description="The name of the file to be uploaded")
    file_content: bytes = Field(..., description="The content of the file in bytes")

class UploadDocumentResponse(BaseModel):
    success: bool = Field(..., description="Indicates if the upload was successful")
    message: str = Field(..., description="A message providing additional information about the upload result")

class ChatRequest(BaseModel):
    message: str = Field(..., description="The chat message or question to be sent to the server")