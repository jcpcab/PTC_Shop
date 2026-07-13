import { useState } from 'react'
import styles from './Order.module.css'
import useFadeIn from '../hooks/useFadeIn.js'
import { signature, byRequest } from './Menu.jsx'
import { sizes } from './Sizes.jsx'

const steps = [
  {
    number: '1',
    title: 'Pick your cake',
    text: 'Choose a flavor and size. Signature flavors are always available, by request flavors just need extra notice.',
  },
  {
    number: '2',
    title: 'Send us a message',
    text: 'DM us on Instagram with your order and the date you need it by. We recommend at least 3 days ahead.',
  },
  {
    number: '3',
    title: 'Pass the cake',
    text: 'We bake it fresh, box it up, and get it to you. All that is left is deciding who gets the first slice.',
  },
]

const contactMethods = [
  { value: 'Instagram', label: 'Instagram', placeholder: '@yourhandle' },
  { value: 'Email', label: 'Email', placeholder: 'you@example.com' },
  { value: 'Phone', label: 'Phone', placeholder: '(555) 555-5555' },
]

// Submissions also post here as a backup in case the customer never sends
// the Instagram DM. Formspree sends a one-time confirmation email to the
// account owner on the very first real submission through this endpoint —
// that confirmation must be clicked before notification emails will start
// arriving for later orders.
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xpqvzzbw'

const MIN_LEAD_DAYS = 3

// Shown as a flavor choice for custom requests; when picked, the special
// instructions field becomes required so we know what to bake.
const OTHER_FLAVOR = 'Other / Special request'

function getMinDate() {
  // Build the date string from local time — toISOString() is UTC and can be
  // a day off near midnight for users west of Greenwich.
  const d = new Date()
  d.setDate(d.getDate() + MIN_LEAD_DAYS)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

const initialForm = {
  name: '',
  contactMethod: 'Instagram',
  contactHandle: '',
  flavor: '',
  size: '',
  quantity: 1,
  dateNeeded: '',
  instructions: '',
  // Honeypot — humans never see or fill this field. Formspree ignores
  // submissions where `_gotcha` is empty and rejects ones where it's filled,
  // and we also skip the whole submit locally if a bot filled it.
  _gotcha: '',
}

export default function Order() {
  const [ref, visible] = useFadeIn()
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sent | sending
  // After submit: { text, copied } — shown so the customer can re-copy it.
  const [sentOrder, setSentOrder] = useState(null)
  const [copyAgainLabel, setCopyAgainLabel] = useState('Copy again')

  const activeMethod = contactMethods.find((m) => m.value === form.contactMethod)

  function updateField(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function validate() {
    const next = {}

    if (!form.name.trim()) next.name = 'Please enter your name.'
    if (!form.contactHandle.trim()) {
      next.contactHandle = `Please enter your ${activeMethod.label.toLowerCase()}.`
    }
    if (!form.flavor) next.flavor = 'Please choose a flavor.'
    if (!form.size) next.size = 'Please choose a size.'
    if (!form.quantity || Number(form.quantity) < 1) {
      next.quantity = 'Quantity must be at least 1.'
    }
    if (!form.dateNeeded) {
      next.dateNeeded = 'Please choose a date.'
    } else if (form.dateNeeded < getMinDate()) {
      next.dateNeeded = `Please choose a date at least ${MIN_LEAD_DAYS} days out.`
    }
    if (form.flavor === OTHER_FLAVOR && !form.instructions.trim()) {
      next.instructions = 'Tell us about the flavor you have in mind.'
    }

    setErrors(next)
    return Object.keys(next).length === 0
  }

  function buildOrderText() {
    return [
      'New Pass The Cake order',
      '------------------------',
      `Name: ${form.name}`,
      `Contact (${form.contactMethod}): ${form.contactHandle}`,
      `Flavor: ${form.flavor}`,
      `Size: ${form.size}`,
      `Quantity: ${form.quantity}`,
      `Date needed: ${form.dateNeeded}`,
      form.instructions.trim() ? `Special instructions: ${form.instructions.trim()}` : null,
    ]
      .filter(Boolean)
      .join('\n')
  }

  async function handleSubmit() {
    if (!validate()) return

    const orderText = buildOrderText()

    // Honeypot tripped: a bot filled the hidden field. Pretend success and
    // do nothing — no clipboard, no Instagram tab, no Formspree POST.
    if (form._gotcha) {
      setSentOrder({ text: orderText, copied: true })
      setStatus('sent')
      setForm(initialForm)
      return
    }

    setStatus('sending')

    // A — clipboard + Instagram handoff. ig.me opens a blank DM thread and
    // does not reliably support pre-filled message text, so copying the
    // order to the clipboard is how we actually get it into the DM.
    let copied = false
    try {
      await navigator.clipboard.writeText(orderText)
      copied = true
    } catch (err) {
      console.error('Could not copy order to clipboard', err)
    }
    window.open('https://ig.me/m/passthecakeshop', '_blank', 'noopener,noreferrer')

    // Confirm right away — the Formspree backup below must never delay or
    // block the confirmation (slow networks and ad blockers both stall it).
    setSentOrder({ text: orderText, copied })
    setStatus('sent')
    setForm(initialForm)

    // B — Formspree backup, fire-and-forget.
    fetch(FORMSPREE_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        _subject: 'New Pass The Cake order',
        name: form.name,
        contactMethod: form.contactMethod,
        contactHandle: form.contactHandle,
        flavor: form.flavor,
        size: form.size,
        quantity: form.quantity,
        dateNeeded: form.dateNeeded,
        instructions: form.instructions,
        _gotcha: form._gotcha,
      }),
    }).catch((err) => console.error('Formspree backup submission failed', err))
  }

  async function handleCopyAgain() {
    if (!sentOrder) return
    try {
      await navigator.clipboard.writeText(sentOrder.text)
      setCopyAgainLabel('Copied!')
    } catch {
      setCopyAgainLabel('Copy failed — select the text above')
    }
    setTimeout(() => setCopyAgainLabel('Copy again'), 2500)
  }

  return (
    <section id="order" className={styles.order}>
      <div ref={ref} className={`container fadeIn ${visible ? 'visible' : ''}`}>
        <span className={styles.label}>Order</span>
        <h2 className={styles.title}>Ready when you are</h2>
        <div className={styles.steps}>
          {steps.map((step) => (
            <div key={step.number} className={styles.step}>
              <span className={styles.number}>{step.number}</span>
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepText}>{step.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.formCard}>
          <div className={styles.field}>
            <label htmlFor="order-name">Name</label>
            <input
              id="order-name"
              type="text"
              value={form.name}
              onChange={(e) => updateField('name', e.target.value)}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'order-name-error' : undefined}
            />
            {errors.name && (
              <p id="order-name-error" className={styles.error}>
                {errors.name}
              </p>
            )}
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="order-contact-method">Contact method</label>
              <select
                id="order-contact-method"
                value={form.contactMethod}
                onChange={(e) => updateField('contactMethod', e.target.value)}
              >
                {contactMethods.map((m) => (
                  <option key={m.value} value={m.value}>
                    {m.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label htmlFor="order-contact-handle">
                {activeMethod.label} {activeMethod.value === 'Instagram' ? 'handle' : ''}
              </label>
              <input
                id="order-contact-handle"
                type={activeMethod.value === 'Email' ? 'email' : 'text'}
                placeholder={activeMethod.placeholder}
                value={form.contactHandle}
                onChange={(e) => updateField('contactHandle', e.target.value)}
                aria-invalid={Boolean(errors.contactHandle)}
                aria-describedby={errors.contactHandle ? 'order-contact-handle-error' : undefined}
              />
              {errors.contactHandle && (
                <p id="order-contact-handle-error" className={styles.error}>
                  {errors.contactHandle}
                </p>
              )}
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="order-flavor">Flavor</label>
              <select
                id="order-flavor"
                value={form.flavor}
                onChange={(e) => updateField('flavor', e.target.value)}
                aria-invalid={Boolean(errors.flavor)}
                aria-describedby={errors.flavor ? 'order-flavor-error' : undefined}
              >
                <option value="">Select a flavor</option>
                <optgroup label="Signature Flavors">
                  {signature.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </optgroup>
                <optgroup label="Available By Request">
                  {byRequest.map((f) => (
                    <option key={f.name} value={f.name}>
                      {f.name}
                    </option>
                  ))}
                </optgroup>
                <option value={OTHER_FLAVOR}>{OTHER_FLAVOR}</option>
              </select>
              {errors.flavor && (
                <p id="order-flavor-error" className={styles.error}>
                  {errors.flavor}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="order-size">Size</label>
              <select
                id="order-size"
                value={form.size}
                onChange={(e) => updateField('size', e.target.value)}
                aria-invalid={Boolean(errors.size)}
                aria-describedby={errors.size ? 'order-size-error' : undefined}
              >
                <option value="">Select a size</option>
                {sizes.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name} — {s.diameter} ({s.serves})
                  </option>
                ))}
              </select>
              {errors.size && (
                <p id="order-size-error" className={styles.error}>
                  {errors.size}
                </p>
              )}
            </div>
          </div>

          <div className={styles.fieldRow}>
            <div className={styles.field}>
              <label htmlFor="order-quantity">Quantity</label>
              <input
                id="order-quantity"
                type="number"
                min="1"
                value={form.quantity}
                onChange={(e) => updateField('quantity', e.target.value)}
                aria-invalid={Boolean(errors.quantity)}
                aria-describedby={errors.quantity ? 'order-quantity-error' : undefined}
              />
              {errors.quantity && (
                <p id="order-quantity-error" className={styles.error}>
                  {errors.quantity}
                </p>
              )}
            </div>

            <div className={styles.field}>
              <label htmlFor="order-date">Date needed</label>
              <input
                id="order-date"
                type="date"
                min={getMinDate()}
                value={form.dateNeeded}
                onChange={(e) => updateField('dateNeeded', e.target.value)}
                aria-invalid={Boolean(errors.dateNeeded)}
                aria-describedby={errors.dateNeeded ? 'order-date-error' : undefined}
              />
              {errors.dateNeeded && (
                <p id="order-date-error" className={styles.error}>
                  {errors.dateNeeded}
                </p>
              )}
            </div>
          </div>

          <div className={styles.field}>
            <label htmlFor="order-instructions">Special instructions</label>
            <textarea
              id="order-instructions"
              rows="4"
              placeholder="Allergies, message on the box, anything else we should know"
              value={form.instructions}
              onChange={(e) => updateField('instructions', e.target.value)}
              aria-invalid={Boolean(errors.instructions)}
              aria-describedby={errors.instructions ? 'order-instructions-error' : undefined}
            />
            {errors.instructions && (
              <p id="order-instructions-error" className={styles.error}>
                {errors.instructions}
              </p>
            )}
          </div>

          {/* Honeypot field — visually hidden and skipped by keyboard/screen
              readers; only bots that blindly fill every input will touch it. */}
          <div className={styles.honeypot} aria-hidden="true">
            <label htmlFor="order-website">Leave this field empty</label>
            <input
              id="order-website"
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              value={form._gotcha}
              onChange={(e) => updateField('_gotcha', e.target.value)}
            />
          </div>

          <div className={styles.ctaWrap}>
            <button
              type="button"
              className={styles.cta}
              onClick={handleSubmit}
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Copy order & open Instagram'}
            </button>
            {status === 'sent' && sentOrder && (
              <div className={styles.sentPanel} role="status">
                <p className={styles.confirmation}>
                  {sentOrder.copied
                    ? 'Copied to your clipboard! Paste it into the Instagram DM and hit send.'
                    : 'We couldn\u2019t auto-copy on this browser \u2014 use the button below, then paste it into the Instagram DM.'}
                </p>
                <pre className={styles.orderText}>{sentOrder.text}</pre>
                <button type="button" className={styles.copyAgain} onClick={handleCopyAgain}>
                  {copyAgainLabel}
                </button>
              </div>
            )}
            <p className={styles.ctaNote}>@passthecakeshop</p>
          </div>
        </div>
      </div>
    </section>
  )
}
