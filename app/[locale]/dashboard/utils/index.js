export const fetchConversation = async () => {
  const token = localStorage.getItem("access_token");

  const res = await fetch("/api/conversation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      conversation_id: conversationId,
    }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch conversation");
  }

  return res.json();
};


export function extractDateTime(isoString) {
  const date = new Date(isoString);

  const formattedDate = date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  return {
    date: formattedDate, // 15 Jan 2026
    time: formattedTime, // 06:14 AM
  };
}
