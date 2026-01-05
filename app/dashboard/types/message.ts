export interface Message {
  id: string;
  sender: "user" | "admin";
  text: string;
  time: string;
}
