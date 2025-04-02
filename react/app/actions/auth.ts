"use server";

import { createSession, deleteSession, updateSession } from "../lib/session";

export async function loginApp(accessToken: string) {
  try {
    await createSession(accessToken);
  } catch (err) {
    console.log("error:", err);
  }
}

export async function refreshTokenApp() {
  try {
    await updateSession();
  } catch (err) {
    console.log("error:", err);
  }
}

export async function logoutApp() {
  try {
    await deleteSession();
    localStorage.removeItem("video-on-demand");
  } catch (err) {
    console.log("error:", err);
  }
}
