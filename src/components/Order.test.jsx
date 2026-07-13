import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Order from './Order.jsx'

function fillValidForm({ dateOffsetDays = 5 } = {}) {
  const d = new Date()
  d.setDate(d.getDate() + dateOffsetDays)
  const pad = (n) => String(n).padStart(2, '0')
  const date = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`

  fireEvent.change(screen.getByLabelText(/^name$/i), { target: { value: 'Jordan' } })
  fireEvent.change(screen.getByLabelText(/instagram handle/i), { target: { value: '@jordan' } })
  fireEvent.change(screen.getByLabelText(/^flavor$/i), { target: { value: 'Ube' } })
  const sizeSelect = screen.getByLabelText(/^size$/i)
  // pick the first real size option, whatever the data says
  fireEvent.change(sizeSelect, { target: { value: sizeSelect.options[1].value } })
  fireEvent.change(screen.getByLabelText(/date needed/i), { target: { value: date } })
  return date
}

describe('Order form validation', () => {
  beforeEach(() => {
    vi.stubGlobal('open', vi.fn())
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true }))
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue() } })
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('shows errors for every required field and submits nothing when empty', () => {
    render(<Order />)
    fireEvent.click(screen.getByRole('button', { name: /copy order/i }))

    expect(screen.getByText(/enter your name/i)).toBeInTheDocument()
    expect(screen.getByText(/enter your instagram/i)).toBeInTheDocument()
    expect(screen.getByText("Please choose a flavor.")).toBeInTheDocument()
    expect(screen.getByText(/choose a size/i)).toBeInTheDocument()
    expect(screen.getByText(/choose a date/i)).toBeInTheDocument()
    expect(window.open).not.toHaveBeenCalled()
    expect(fetch).not.toHaveBeenCalled()
  })

  it('rejects a date less than 3 days out', () => {
    render(<Order />)
    fillValidForm({ dateOffsetDays: 1 })
    fireEvent.click(screen.getByRole('button', { name: /copy order/i }))

    expect(screen.getByText(/at least 3 days out/i)).toBeInTheDocument()
    expect(window.open).not.toHaveBeenCalled()
  })

  it('accepts a date exactly 3 days out and submits', async () => {
    render(<Order />)
    fillValidForm({ dateOffsetDays: 3 })
    fireEvent.click(screen.getByRole('button', { name: /copy order/i }))

    expect(await screen.findByRole('status')).toHaveTextContent(/copied/i)
    expect(window.open).toHaveBeenCalledWith(
      'https://ig.me/m/passthecakeshop',
      '_blank',
      'noopener,noreferrer',
    )
    expect(navigator.clipboard.writeText).toHaveBeenCalledOnce()
  })

  it('silently drops the submission when the honeypot is filled', async () => {
    render(<Order />)
    fillValidForm()
    fireEvent.change(screen.getByLabelText(/leave this field empty/i), {
      target: { value: 'spam-bot' },
    })
    fireEvent.click(screen.getByRole('button', { name: /copy order/i }))

    expect(await screen.findByRole('status')).toBeInTheDocument()
    expect(window.open).not.toHaveBeenCalled()
    expect(fetch).not.toHaveBeenCalled()
    expect(navigator.clipboard.writeText).not.toHaveBeenCalled()
  })
})
