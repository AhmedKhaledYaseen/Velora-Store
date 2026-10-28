import { SignUp } from "@clerk/react";
import PageTransition from "../../components/PageTransition";
import "./authPages.css";

export default function SignUpPage() {
  return (
    <PageTransition>
      <div className="clerk-auth-container">
        <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
      </div>
    </PageTransition>
  );
}

