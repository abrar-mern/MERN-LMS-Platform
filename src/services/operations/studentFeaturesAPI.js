import { studentEndpoints } from "../apis";
const {
  COURSE_PAYMENT_API,
  COURSE_VERIFY_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = studentEndpoints;
import { toast } from "react-hot-toast";
import rzpLogo from "../../assets/Logo/code.png";
import { resetCart } from "../../redux/slice/cartSlice";
import { setPaymentLoading } from "../../redux/slice/courseSlice";

function loadRazorpayScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function BuyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch,
) {
  const toastid = toast.loading("Loading..");
  try {
    // Load Razorpay Script
    const res = await loadRazorpayScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );
    if (!res) {
      toast.error("Failed to load Razorpay SDK. Are you online?", {
        toastId: toastid,
      });
      return;
    }
    // Get the order details from the backend
    const orderResponse = await apiConnector(
      "POST",
      COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      },
    );
    if (!orderResponse.data?.success) {
      toast.error("Failed to create order.Please try again.", {
        toastId: toastid,
      });
      return;
    }

    //options for Razorpay
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      currency: orderResponse.data?.data?.currency,
      amount: `${orderResponse.data?.data?.amount}`,
      order_id: orderResponse.data?.data?.id,
      name: "CodeGyaani",
      description: "Thankyou for purchasing the course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails?.firstName} ${userDetails?.lastName}`,
        email: userDetails?.email,
      },
      handler: function (response) {
        // Send successful email
        sendPaymentSuccessEmail(
          response,
          orderResponse.data?.data?.amount,
          token,
        );
        // Verfify the payment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
  } catch (err) {
    console.log(err);
    toast.error("Error in loading payment gateway", { toastId: toastid });
  }
  toast.dismiss(toastid);
}


async function sendPaymentSuccessEmail(response, amount, token) {
    try{
        await apiConnector(
            "POST",
            SEND_PAYMENT_SUCCESS_EMAIL_API,
            {
                orderId: response.razorpay_order_id,
                paymentId: response.razorpay.payment_id,
                signature : response.razorpay.signature,
                amount,
            }
            ,
            {
                Authorization: `Bearer ${token}`,

            }
        )
    }
    catch(err){
        console.log("Error in sending payment success email", err);
    }
}


async function verifyPayment(bodyData, token, navigate, dispatch){
    const toastId = toast.loading("Verifying Payment..");
    dispatch(setLoading(true));
    try{
        const response = await apiConnector(
            "POST",
            COURSE_VERIFY_API,
            bodyData,
            {
                Authorization: `Bearer ${token}`,
            }
        )
        if(!response.data?.success){
            throw new Error("Payment verification failed");

        }
        toast.success("Payment successful! Redirecting to your courses.", { toastId });
        setTimeout(() => {
            navigate("/dashboard/enrolled-courses");
        }, 3000);
        dispatch(resetCart());
    }
    catch(err){
        console.log("Error in verifying payment", err);
        toast.error("Payment verification failed. Please contact support.", { toastId });
    }
    toast.dismiss(toastId);
    dispatch(setPaymentLoading(false));
}