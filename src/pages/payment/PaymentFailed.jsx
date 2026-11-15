import { Link, useSearchParams } from 'react-router-dom';
import PageTransition from '../../components/PageTransition';
import { FaTimesCircle, FaInfoCircle } from 'react-icons/fa';
import './paymentResult.css';

/**
 * PaymentFailed
 *
 * Displayed when Paymob redirects back after a failed or
 * declined transaction. The user can retry or return home.
 */
function PaymentFailed() {
  const [searchParams] = useSearchParams();

  const orderId = searchParams.get('order') || searchParams.get('merchant_order_id');
  const txnId = searchParams.get('id') || searchParams.get('transaction_id');

  return (
    <PageTransition>
      <div className="payment_result_page">
        <div className="payment_result_card">
          <div className="result_icon failed" aria-hidden="true">
            <FaTimesCircle />
          </div>

          <h2>Payment Failed</h2>
          <p className="result_subtitle">
            Unfortunately your payment could not be processed.
            Please check your payment details and try again, or use a
            different payment method.
          </p>

          {(orderId || txnId) && (
            <div className="result_order_info">
              {orderId && (
                <div className="result_order_row">
                  <p>Order ID</p>
                  <span>{orderId}</span>
                </div>
              )}
              {txnId && (
                <div className="result_order_row">
                  <p>Transaction ID</p>
                  <span>{txnId}</span>
                </div>
              )}
            </div>
          )}

          <div className="result_actions">
            <Link to="/checkout" className="btn">
              Try Again
            </Link>
            <Link to="/" className="btn btn_secondary">
              Back to Home
            </Link>
          </div>

          <div className="verification_notice">
            <FaInfoCircle />
            <span>
              If you believe this is an error, please contact our support team
              with the transaction details above.
            </span>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default PaymentFailed;
