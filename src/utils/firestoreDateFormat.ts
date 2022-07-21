import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

function formatDate(timestamp: FirebaseFirestoreTypes.Timestamp) {
  if (!timestamp) {
    return;
  }

  const date = new Date(timestamp.toDate());
  const day = date.toLocaleDateString("en-US");
  const hour = date.getHours();
  const min = date.getMinutes();

  return `${day}, ${hour}:${min}`;
}

export { formatDate };
