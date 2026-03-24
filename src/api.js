const BASE = "https://big-t-app-ebcf4ddc.base44.app";

export async function checkEnrollment(email) {
  const res = await fetch(`${BASE}/functions/checkEnrollment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  return res.json();
}

export async function getCourseData() {
  const res = await fetch(`${BASE}/functions/getCourseData`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  return res.json();
}

export async function createCheckout(email, successUrl, cancelUrl) {
  const res = await fetch(`${BASE}/functions/createCheckout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, successUrl, cancelUrl }),
  });
  return res.json();
}
