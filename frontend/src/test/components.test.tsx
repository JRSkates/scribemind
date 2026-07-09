import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { ChatSseCard } from '../components/ChatSseCard'
import { SendQuestionCard } from '../components/SendQuestionCard'

describe('SendQuestionCard', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('submits a question to the chat question endpoint', async () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({ success: true }),
    } as Response)
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<SendQuestionCard />)

    const input = screen.getByPlaceholderText(/enter your question/i)
    fireEvent.change(input, { target: { value: 'What is SSE?' } })
    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(fetchSpy).toHaveBeenCalledTimes(1)
    })

    const [url, options] = fetchSpy.mock.calls[0]
    expect(url).toBe('http://localhost:8000/api/chat/question')
    expect(options?.method).toBe('POST')
    expect(options?.body).toBeInstanceOf(FormData)
    expect(alertSpy).toHaveBeenCalledWith('Question sent successfully!')
  })

  it('shows a failure alert when question submit fails', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: false,
      json: async () => ({}),
    } as Response)
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})

    render(<SendQuestionCard />)

    const input = screen.getByPlaceholderText(/enter your question/i)
    fireEvent.change(input, { target: { value: 'Will this fail?' } })
    fireEvent.click(screen.getByRole('button', { name: /send/i }))

    await waitFor(() => {
      expect(alertSpy).toHaveBeenCalledWith('Failed to send question.')
    })
  })
})

describe('ChatSseCard', () => {
  const originalEventSource = globalThis.EventSource

  class MockEventSource {
    static instances: MockEventSource[] = []

    onmessage: ((event: MessageEvent) => void) | null = null
    onerror: ((event: Event) => void) | null = null
    url: string
    close = vi.fn()

    constructor(url: string) {
      this.url = url
      MockEventSource.instances.push(this)
    }
  }

  beforeEach(() => {
    MockEventSource.instances = []
    Object.defineProperty(globalThis, 'EventSource', {
      writable: true,
      configurable: true,
      value: MockEventSource,
    })
  })

  afterEach(() => {
    Object.defineProperty(globalThis, 'EventSource', {
      writable: true,
      configurable: true,
      value: originalEventSource,
    })
    vi.restoreAllMocks()
  })

  it('connects and disconnects from SSE', () => {
    render(<ChatSseCard />)

    const connectButton = screen.getByRole('button', { name: /connect to chat sse/i })
    fireEvent.click(connectButton)

    expect(MockEventSource.instances).toHaveLength(1)
    expect(MockEventSource.instances[0].url).toBe('http://localhost:8000/api/chat/response')
    expect(screen.getByText('SSE status: Connected')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /disconnect chat sse/i })).toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: /disconnect chat sse/i }))

    expect(MockEventSource.instances[0].close).toHaveBeenCalledTimes(1)
    expect(screen.getByText('SSE status: Disconnected')).toBeInTheDocument()
  })
})
