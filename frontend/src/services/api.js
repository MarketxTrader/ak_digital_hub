const API_URL = "https://ak-digital-hub.onrender.com";

export const getQRCode = async (amount) => {
  try {
    const response = await fetch(`${API_URL}/api/generate-qr?amount=${amount}`);
    if (!response.ok) throw new Error("Network response was not ok");
    const data = await response.json();
    return data; // ទទួលបាន { qr_string, md5 }
  } catch (error) {
    console.error("Error fetching QR:", error);
    throw error;
  }
};

export const checkPaymentStatus = async (md5) => {
  try {
    const response = await fetch(`${API_URL}/api/check-status/${md5}`);
    return await response.json();
  } catch (error) {
    console.error("Error checking status:", error);
    throw error;
  }
};