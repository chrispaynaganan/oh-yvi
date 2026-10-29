import AuthCollage from "@/components/auth/AuthCollage";
import AuthForm, { type AuthFormProps } from "@/components/auth/AuthForm";

export default function AuthPage(props: AuthFormProps) {
  return (
    <main className="mx-auto max-w-site px-15 pt-0.75 max-xl:px-6.5">
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-8 max-xl:col-span-6">
          <AuthCollage />
        </div>
        <div className="col-span-4 col-start-9 mt-18.25 self-start max-xl:col-span-6 max-xl:col-start-7 max-xl:mt-15">
          <AuthForm {...props} />
        </div>
      </div>
    </main>
  );
}