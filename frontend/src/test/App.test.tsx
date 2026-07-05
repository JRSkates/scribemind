import { render, screen, waitFor } from '@testing-library/react'
import App from '../App'

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('shows healthy backend status when the API responds', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValueOnce({
      ok: true,
      json: async () => ({ status: 'healthy' }),
    } as Response)

    render(<App />)

    expect(screen.getByRole('heading', { name: /document chat workspace/i })).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('healthy')).toBeInTheDocument()
    })

    expect(fetchSpy).toHaveBeenCalledWith('http://localhost:8000/api/health')
  })

  it('shows unavailable backend status when health check fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValueOnce(new Error('network error'))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('API unavailable')).toBeInTheDocument()
    })
  })
})
