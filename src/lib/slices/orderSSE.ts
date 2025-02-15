// ordersSSE.js
import { orderReceived } from "./orderSlice";
const baseUrl = process.env.NEXT_PUBLIC_BASE_API_URL;

export const startOrderSSE = () => (dispatch) => {
  // Replace with your SSE endpoint
  const eventSource = new EventSource(`${baseUrl}/orders/sse`);

  eventSource.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      // Dispatch the action with the new order data
      dispatch(orderReceived(data));
    } catch (error) {
      console.error("Error parsing SSE data", error);
    }
  };

  eventSource.onerror = (error) => {
    console.error("SSE error:", error);
    // Optionally, you can try to reconnect or simply close the connection
    // eventSource.close();
  };

  // Return the event source instance for potential cleanup
  return eventSource;
};
