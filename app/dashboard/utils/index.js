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