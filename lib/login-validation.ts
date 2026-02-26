export type LoginValidationResult =
  | { ok: true; email: string; password: string }
  | { ok: false; error: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLoginInput(email: string, password: string): LoginValidationResult {
  const trimmedEmail = email.trim();
  const trimmedPassword = password.trim();

  if (!trimmedEmail || !trimmedPassword) {
    return { ok: false, error: "メールアドレスとパスワードを入力してください" };
  }

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { ok: false, error: "有効なメールアドレスを入力してください" };
  }

  return { ok: true, email: trimmedEmail, password: trimmedPassword };
}

export function getAuthErrorMessage(message: string): string {
  if (message.includes("Invalid login credentials")) {
    return "メールアドレスまたはパスワードが正しくありません";
  }
  if (message.includes("Email not confirmed")) {
    return "メールアドレスの確認が完了していません";
  }
  if (message.includes("Invalid email or password")) {
    return "メールアドレスまたはパスワードが正しくありません";
  }
  return message;
}
