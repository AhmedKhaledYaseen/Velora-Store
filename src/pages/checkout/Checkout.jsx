import { useContext, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { CartContext } from '../../components/cartContext/CartContext';
import { createPayment } from '../../services/paymentService';
import PageTransition from '../../components/PageTransition';
import toast from 'react-hot-toast';
import { TiShoppingCart } from 'react-icons/ti';
import { MdPayment, MdLock } from 'react-icons/md';
import './checkout.css';
import '../../pages/category/categoryProducts.css';

const SHIPPING_FEE = 0; // free shipping — change when backend provides rates

const initialForm = {
  name: '',
  email: '',
  phone: '',
  address: '',
};

function validate(form) {
  const errors = {};
  if (!form.name.trim()) errors.name = 'Name is required.';
  if (!form.email.trim()) {
    errors.email = 'Email is required.';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Enter a valid email address.';
  }
  if (!form.phone.trim()) {
    errors.phone = 'Phone number is required.';
  } else if (!/^[+\d][\d\s\-()]{6,}$/.test(form.phone)) {
    errors.phone = 'Enter a valid phone number.';
  }
  if (!form.address.trim()) errors.address = 'Shipping address is required.';
  return errors;
}

function Checkout() {
  const { cartItems } = useContext(CartContext);
  const { user } = useUser();

  const [form, setForm] = useState(() => ({
    ...initialForm,
    name: user?.fullName || '',
    email: user?.primaryEmailAddress?.emailAddress || '',
  }));
  const [errors, setErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState('paymob');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const total = subtotal + SHIPPING_FEE;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fill in all required fields correctly.');
      return;
    }

    if (isProcessing) return; // guard against double submission
    setIsProcessing(true);

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.images?.[0] || '',
        })),
        customer: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
        },
        totalAmount: total,
      };

      const { checkoutUrl } = await createPayment(orderData);

      // Redirect to Paymob checkout page returned by the backend
      window.location.href = checkoutUrl;
    } catch (err) {
      toast.error(err.message || 'Something went wrong. Please try again.');
      setIsProcessing(false);
    }
  };

  /* ---------- empty cart ---------- */
  if (cartItems.length === 0) {
    return (
      <PageTransition>
        <div className="checkout_page">
          <div className="container">
            <div className="checkout_empty">
              <div className="checkout_empty_icon">
                <TiShoppingCart />
              </div>
              <h2>Your cart is empty</h2>
              <p>Add some products before proceeding to checkout.</p>
              <Link to="/" className="btn">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="checkout_page">
        <div className="container">
          <div className="top_slide">
            <h2>Checkout</h2>
            <p>Complete your order details and payment</p>
          </div>

          <form
            className="checkout_layout"
            onSubmit={handleSubmit}
            noValidate
          >
            {/* ---- Left: Customer + Payment ---- */}
            <div>
              {/* Customer Information */}
              <div className="checkout_form_box">
                <h3>Customer Information</h3>

                <div className="checkout_form">
                  <div className="form_row">
                    <div className="form_group">
                      <label htmlFor="ck-name">Full Name *</label>
                      <input
                        id="ck-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="e.g. John Doe"
                        className={errors.name ? 'input_error' : ''}
                        autoComplete="name"
                      />
                      {errors.name && (
                        <span className="error_text">{errors.name}</span>
                      )}
                    </div>

                    <div className="form_group">
                      <label htmlFor="ck-email">Email *</label>
                      <input
                        id="ck-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="e.g. john@example.com"
                        className={errors.email ? 'input_error' : ''}
                        autoComplete="email"
                      />
                      {errors.email && (
                        <span className="error_text">{errors.email}</span>
                      )}
                    </div>
                  </div>

                  <div className="form_group">
                    <label htmlFor="ck-phone">Phone Number *</label>
                    <input
                      id="ck-phone"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="e.g. +20 123 456 7890"
                      className={errors.phone ? 'input_error' : ''}
                      autoComplete="tel"
                    />
                    {errors.phone && (
                      <span className="error_text">{errors.phone}</span>
                    )}
                  </div>

                  <div className="form_group">
                    <label htmlFor="ck-address">Shipping Address *</label>
                    <input
                      id="ck-address"
                      type="text"
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      placeholder="e.g. 123 Main St, Cairo, Egypt"
                      className={errors.address ? 'input_error' : ''}
                      autoComplete="street-address"
                    />
                    {errors.address && (
                      <span className="error_text">{errors.address}</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="checkout_form_box payment_method_section">
                <h3>Payment Method</h3>

                <button
                  type="button"
                  className={`payment_option${paymentMethod === 'paymob' ? ' selected' : ''}`}
                  onClick={() => setPaymentMethod('paymob')}
                  aria-pressed={paymentMethod === 'paymob'}
                >
                  <div className="payment_radio" aria-hidden="true">
                    <div className="payment_radio_inner" />
                  </div>
                  <div className="payment_label">
                    <strong>Paymob</strong>
                    <span>Credit / Debit Card · Mobile Wallet</span>
                  </div>
                </button>
              </div>
            </div>

            {/* ---- Right: Order Summary ---- */}
            <div className="checkout_summary_box">
              <h3>Order Summary</h3>

              <div className="summary_items">
                {cartItems.map((item) => (
                  <div className="summary_item" key={item.id}>
                    <div className="summary_item_img">
                      <img src={item.images?.[0]} alt={item.title} />
                    </div>
                    <div className="summary_item_info">
                      <h5>{item.title}</h5>
                      <p>Qty: {item.quantity}</p>
                    </div>
                    <div className="summary_item_price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="summary_totals">
                <div className="summary_row">
                  <p>Subtotal</p>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="summary_row">
                  <p>Shipping</p>
                  <span>{SHIPPING_FEE === 0 ? 'Free' : `$${SHIPPING_FEE.toFixed(2)}`}</span>
                </div>

                <div className="summary_row total_row">
                  <p>Total</p>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                className="pay_btn"
                disabled={isProcessing}
                aria-busy={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <span className="spinner" aria-hidden="true" />
                    Processing…
                  </>
                ) : (
                  <>
                    <MdLock />
                    Pay Now — ${total.toFixed(2)}
                  </>
                )}
              </button>

              <p
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'var(--p-color)',
                  marginTop: 12,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 4,
                }}
              >
                <MdPayment style={{ fontSize: 14 }} />
                Secured by Paymob
              </p>
            </div>
          </form>
        </div>
      </div>
    </PageTransition>
  );
}

export default Checkout;
