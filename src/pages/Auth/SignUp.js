import { useSignup } from "../../hooks/auth/useSignup";
import { useState } from "react";
import { useLogin } from "../../hooks/auth/useLogin";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const { login } = useLogin();
  const { connectGoogle, signup, isPending, error } = useSignup();

  const handleClick = (e) => {
    e.preventDefault();
    connectGoogle();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signup(email, password, displayName);
  };

  const demoLogin = (e) => {
    e.preventDefault();
    login("demo@demo.de", "DemoDemo");
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="w-5/6 md:w-[350px]">
        <h2 className="mb-8 text-center text-5xl font-bold">Sign Up</h2>
        <button
          onClick={demoLogin}
          disabled={isPending}
          className="border-light focus:bg-gray mt-3  w-full rounded border py-1.5 font-semibold"
        >
          Login with Demo Account
        </button>
        {/*Google Auth*/}
        <div className="border-line flex justify-center border-b">
          <button
            onClick={handleClick}
            disabled={isPending}
            className=" text-text-head border-light focus:bg-gray my-5 flex w-full items-center justify-center rounded border bg-white p-1.5
                            font-semibold"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              className="mr-2 h-4 w-4"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Continue with Google
          </button>
        </div>
        {/*Email Auth*/}
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="mt-5 flex flex-col justify-center">
            <span className="text-text-light text-sm">Email</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"Enter your email..."}
              className="bg-gray border-light my-1 w-full rounded border py-1.5 px-3"
            />
          </label>
          <label className="mt-2 flex flex-col">
            <span className="text-text-light text-sm">Password</span>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"Enter Password..."}
              className="bg-gray border-light my-1 w-full rounded border py-1.5 px-3"
            />
          </label>
          <label className="mt-2 flex flex-col">
            <span className="text-text-light text-sm">Name</span>
            <input
              required
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder={"Enter Name..."}
              className="bg-gray border-light my-1 w-full rounded border py-1.5 px-3"
            />
          </label>
          <button
            type="submit"
            disabled={isPending}
            className="border-light focus:bg-gray mt-3  w-full rounded border py-1.5
                            font-semibold"
          >
            Sign Up with email
          </button>
        </form>
        {error && <p className="text-sm text-red-500">{error}</p>}
        {/*Some small Text to make it look professional*/}
      </div>
      <p className="mt-28 w-5/6 text-center text-xs text-neutral-500 md:w-[500px]">
        By clicking “Continue with Google” or “Sign Up with email” above, you
        acknowledge that you have read and understood, and agree to nothing.
      </p>
    </div>
  );
}
