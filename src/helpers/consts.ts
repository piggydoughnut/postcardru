export const PostcardStates = {
  new: "new",
  preview: "preview",
  sending: "sending",
  sent: "sent",
  error: "error",
  complete: "complete",
} as const;

export const Titles: Record<string, string> = {
  [PostcardStates.new]: "Compose the card",
  [PostcardStates.preview]: "Preview the card",
  [PostcardStates.sending]: "Sending",
  [PostcardStates.sent]: "Your card has been sent",
};
