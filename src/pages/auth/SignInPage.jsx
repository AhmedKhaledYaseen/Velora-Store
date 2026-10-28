import { SignIn } from "@clerk/react";
import PageTransition from "../../components/PageTransition";
import "./authPages.css";

export default function SignInPage() {
  return (
    <PageTransition>
      <div className="clerk-auth-container">
        <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
      </div>
    </PageTransition>
  );
}

