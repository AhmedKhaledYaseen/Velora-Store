/**
 * Payment Service — isolated API layer for Paymob integration.
 *
 * All payment-related HTTP requests live here so the rest of the app
 * never touches fetch URLs or response shapes directly.
 *
 * The backend base URL comes from the VITE_API_BASE_URL env variable.
 * ------------------------------------------------------------------
 * Expected backend contract (placeholder — adjust when the real API
 * contract is provided):
 *
 *   POST  /api/payments/create
 *   Body: { items, customer, totalAmount }
 *   Response: { checkoutUrl: string }
 *
 * ------------------------------------------------------------------
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

/**
 * Create a Paymob payment session via the backend.
 *
 * @param {Object}   orderData
 * @param {Array}    orderData.items      — cart items (id, title, price, quantity, image)
 * @param {Object}   orderData.customer   — { name, email, phone, address }
 * @param {number}   orderData.totalAmount — total in the store's base currency
 * @returns {Promise<{ checkoutUrl: string }>}
 */
export async function createPayment(orderData) {
  const url = `${API_BASE_URL}/api/payments/create`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    const message =
      errorBody?.message ||
      errorBody?.error ||
      `Payment request failed (${response.status})`;
    throw new Error(message);
  }

  const data = await response.json();

  // Adapt here when the real backend response shape differs.
  const checkoutUrl = data.checkoutUrl || data.checkout_url || data.url;

  if (!checkoutUrl) {
    throw new Error('The server did not return a checkout URL.');
  }

  return { checkoutUrl };
}
