// import { format } from 'date-fns';

export const formatDate = (timestamp) => {
  if (!timestamp) return "Unknown date"; // ✅ Prevents errors
  return new Date(timestamp).toLocaleDateString();
};
