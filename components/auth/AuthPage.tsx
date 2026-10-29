import AuthCollage from "@/components/auth/AuthCollage";
import AuthForm, { type AuthFormProps } from "@/components/auth/AuthForm";

export default function AuthPage(props: AuthFormProps) {
  return (
    <main className="mx-auto max-w-site px-15 pt-0.75">
      <div className="grid grid-cols-12 gap-x-5">
        <div className="col-span-8">
          <AuthCollage />
        </div>
        <div className="col-span-4 col-start-9 mt-18.25 self-start">
          <AuthForm {...props} />
        </div>
      </div>
    </main>
  );
}