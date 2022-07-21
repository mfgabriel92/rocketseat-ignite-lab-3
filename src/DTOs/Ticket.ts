import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

export interface Ticket {
  patrimony: string;
  description: string;
  status: "open" | "closed";
  solution?: string;
  openedAt: FirebaseFirestoreTypes.Timestamp;
  closedAt: FirebaseFirestoreTypes.Timestamp;
}
