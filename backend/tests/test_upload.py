from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_upload_endpoint_accepts_file() -> None:
    files = {'file': ('example.txt', b'hello from test', 'text/plain')}

    response = client.post('/api/upload/', files=files)

    assert response.status_code == 200
    payload = response.json()
    assert payload['success'] is True
    assert 'example.txt' in payload['message']


def test_upload_endpoint_requires_file() -> None:
    response = client.post('/api/upload/')

    assert response.status_code == 422
