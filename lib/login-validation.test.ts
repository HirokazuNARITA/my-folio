import { describe, it, expect } from "vitest";
import {
  validateLoginInput,
  getAuthErrorMessage,
} from "./login-validation";

describe("validateLoginInput", () => {
  it("空のメールとパスワードでエラーを返す", () => {
    const result = validateLoginInput("", "");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("メールアドレスとパスワードを入力してください");
    }
  });

  it("メールのみ空でエラーを返す", () => {
    const result = validateLoginInput("", "password123");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("メールアドレスとパスワードを入力してください");
    }
  });

  it("パスワードのみ空でエラーを返す", () => {
    const result = validateLoginInput("user@example.com", "");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("メールアドレスとパスワードを入力してください");
    }
  });

  it("空白のみでエラーを返す", () => {
    const result = validateLoginInput("   ", "   ");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("メールアドレスとパスワードを入力してください");
    }
  });

  it("不正なメール形式でエラーを返す", () => {
    const result = validateLoginInput("invalid-email", "password123");
    expect(result.ok).toBe(false);
    if (!result.ok) {
      expect(result.error).toBe("有効なメールアドレスを入力してください");
    }
  });

  it("@がないメールでエラーを返す", () => {
    const result = validateLoginInput("userexample.com", "password123");
    expect(result.ok).toBe(false);
  });

  it("ドメインがないメールでエラーを返す", () => {
    const result = validateLoginInput("user@", "password123");
    expect(result.ok).toBe(false);
  });

  it("有効なメールとパスワードでOKを返す", () => {
    const result = validateLoginInput("user@example.com", "password123");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.email).toBe("user@example.com");
      expect(result.password).toBe("password123");
    }
  });

  it("前後に空白がある入力をトリムしてOKを返す", () => {
    const result = validateLoginInput("  user@example.com  ", "  pass  ");
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.email).toBe("user@example.com");
      expect(result.password).toBe("pass");
    }
  });
});

describe("getAuthErrorMessage", () => {
  it("Invalid login credentials を日本語に変換", () => {
    expect(getAuthErrorMessage("Invalid login credentials")).toBe(
      "メールアドレスまたはパスワードが正しくありません"
    );
  });

  it("Email not confirmed を日本語に変換", () => {
    expect(getAuthErrorMessage("Email not confirmed")).toBe(
      "メールアドレスの確認が完了していません"
    );
  });

  it("Invalid email or password を日本語に変換", () => {
    expect(getAuthErrorMessage("Invalid email or password")).toBe(
      "メールアドレスまたはパスワードが正しくありません"
    );
  });

  it("未知のエラーはそのまま返す", () => {
    expect(getAuthErrorMessage("Unknown error")).toBe("Unknown error");
  });
});
