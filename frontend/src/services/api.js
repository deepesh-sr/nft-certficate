// API service for communicating with the backend NFT creation service
const API_BASE_URL = 'http://localhost:3001'; // Backend server URL

export const createNFTCertificate = async (certificateData, imageFile = null) => {
  try {
    const formData = new FormData();
    
    // Append text data
    Object.keys(certificateData).forEach(key => {
      if (certificateData[key] !== '' && certificateData[key] !== null && certificateData[key] !== undefined) {
        formData.append(key, certificateData[key]);
      }
    });
    
    // Append image file if provided
    if (imageFile) {
      formData.append('certificateImage', imageFile);
    }

    const response = await fetch(`${API_BASE_URL}/api/create-nft`, {
      method: 'POST',
      body: formData, // Don't set Content-Type header - let browser set it with boundary
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error creating NFT certificate:', error);
    throw error;
  }
};

// Check the status of an NFT transaction
export const checkNFTStatus = async (signature) => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/nft-status/${signature}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error checking NFT status:', error);
    throw error;
  }
};

// Get list of certificates (placeholder for future implementation)
export const getCertificates = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/certificates`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching certificates:', error);
    throw error;
  }
};
