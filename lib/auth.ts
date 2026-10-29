export type AuthProvider = "apple" | "google" | "facebook";

export type SignUpInput = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignInInput = { email: string; password: string };

export type AuthResult = { ok: true } | { ok: false; error: string };

const NOT_CONNECTED: AuthResult = {
  ok: false,
  error: "Accounts aren’t switched on yet. This will work once the store’s backend is connected.",
};

// TODO(backend): replace each body with Supabase Auth calls.
// The pages only depend on these three functions and their result shape.

export async function signUp(input: SignUpInput): Promise<AuthResult> {
  void input;
  return NOT_CONNECTED;
}

export async function signIn(input: SignInInput): Promise<AuthResult> {
  void input;
  return NOT_CONNECTED;
}

export async function signInWithProvider(provider: AuthProvider): Promise<AuthResult> {
  void provider;
  return NOT_CONNECTED;
}