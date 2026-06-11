const NEWSLETTER_NOTIFY_EMAIL = "belrender000@gmail.com";

export function isValidSubscriberEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function sendNewsletterNotification(subscriberEmail: string) {
  const response = await fetch(
    `https://formsubmit.co/ajax/${NEWSLETTER_NOTIFY_EMAIL}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        _subject: "New BOLEXMAN Newsletter Subscriber",
        _template: "table",
        _captcha: "false",
        "Subscriber email": subscriberEmail,
        "Subscribed at": new Date().toLocaleString("en-US", {
          dateStyle: "full",
          timeStyle: "short",
        }),
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Unable to deliver subscription notification.");
  }

  const data = (await response.json()) as { success?: string; message?: string };

  if (data.success !== "true") {
    throw new Error(data.message ?? "Unable to deliver subscription notification.");
  }
}
