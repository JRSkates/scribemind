from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_question_endpoint_returns_success() -> None:
    response = client.post('/api/chat/question', json={'message': 'What is SSE?'})

    assert response.status_code == 200
    assert response.json() == {
        'success': True,
        'message': 'Question received successfully.',
    }


def test_sse_response_endpoint_returns_stream() -> None:
    with client.stream('GET', '/api/chat/response?max_events=1') as response:
        assert response.status_code == 200
        assert response.headers['content-type'].startswith('text/event-stream')

        first_data_line = next((line for line in response.iter_lines() if line), '')
        assert first_data_line.startswith('data: New chat message at ')
