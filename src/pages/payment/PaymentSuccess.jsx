import { Link, useSearchParams } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { FaCheckCircle, FaInfoCircle } from 'react-icons/fa';
import './paymentResult.css';

/**
 * PaymentSuccess
 *
 * Displayed after Paymob redirects back on success.
 * IMPORTANT — visiting this URL does NOT confirm payment.
 * The backend must verify the transaction via Paymob webhooks
 * or server-side status checks before fulfilling the order.
 */
function PaymentSuccess() {
  const [searchParams] = useSearchParams();

  // The backend or Paymob redirect may include query params.
  // Read whatever is available — the real source of truth is the backend.
  const orderId = searchParams.get('order') || searchParams.get('merchant_order_id');
  const amountCents = searchParams.get('amount_cents');
  const amount = amountCents ? (Number(amountCents) / 100).toFixed(2) : null;

  return (
    <PageTransition>
      <div className="payment_result_page">
        <div className="payment_result_card">
          <div className="result_icon success" aria-hidden="true">
            <FaCheckCircle />
          </div>

          <h2>Payment Submitted</h2>
          <p className="result_subtitle">
            Thank you! Your payment has been submitted and is being verified.
            You will receive a confirmation once the payment is confirmed.
          </p>

          {(orderId || amount) && (
            <div className="result_order_info">
              {orderId && (
                <div className="result_order_row">
                  <p>Order ID</p>
                  <span>{orderId}</span>
                </div>
              )}
              {amount && (
                <div className="result_order_row">
                  <p>Amount</p>
                  <span>${amount}</span>
                </div>
              )}
            </div>
          )}

          <div className="result_actions">
            <Link to="/" className="btn">
              Back to Home
            </Link>
            <Link to="/cart" className="btn btn_secondary">
              View Cart
            </Link>
          </div>

          <div className="verification_notice">
            <FaInfoCircle />
            <span>
              Your payment status is being verified by the server. 
              The order will only be confirmed once the backend validates 
              the transaction with Paymob.
            </span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default PaymentSuccess;
