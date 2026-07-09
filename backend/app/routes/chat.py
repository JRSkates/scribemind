import asyncio
from datetime import datetime

from fastapi import APIRouter, Query, Request
from fastapi.responses import StreamingResponse

router = APIRouter(prefix="/api/chat", tags=["Chat"])

@router.get("/response")
async def sse_chat(request: Request, max_events: int | None = Query(default=None, ge=1)):
    async def event_generator():
        sent_events = 0
        while True:
            # Check if the client has disconnected
            if await request.is_disconnected():
                break
            
            # Here you would typically fetch new chat messages from a database or message queue
            # For demonstration, we will just send a static message every 5 seconds
            
            yield f"data: New chat message at {datetime.now()}\n\n"
            sent_events += 1

            # Optional cap so tests can consume a finite stream and exit.
            if max_events is not None and sent_events >= max_events:
                break

            await asyncio.sleep(5)

    return StreamingResponse(event_generator(), media_type="text/event-stream")

@router.post("/question")
async def send_question(request: Request):
    # Here you would typically process the incoming question
    # For demonstration, we will just return a success response
    return {"success": True, "message": "Question received successfully."}

