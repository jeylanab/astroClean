// src/pricingConfig.js

export const pricingConfig = {
  // Base prices based on Property Type and Bedroom Count
  basePrices: {
    detached: {
      '1-2': 28,
      '3': 32,
      '4': 38,
      '5': 45,
      '6+': 55,
    },
    'semi-detached': {
      '1-2': 20,
      '3': 24,
      '4': 28,
      '5': 34,
      '6+': 40,
    },
    terraced: {
      '1-2': 16,
      '3': 20,
      '4': 24,
      '5': 30,
      '6+': 36,
    },
    'town-house': {
      '1-2': 22,
      '3': 26,
      '4': 32,
      '5': 38,
      '6+': 44,
    },
    bungalow: {
      '1-2': 18,
      '3': 22,
      '4': 26,
      '5': 32,
      '6+': 38,
    },
    flat: {
      'studio': 12,
      '1-bed': 15,
      '2-bed': 18,
      '3-bed+': 22,
    }
  },

  // Add-on prices (Fixed rates)
  extras: {
    extension: 5,        // Flat fee if they have an extension
    skylantern: 4,       // Price per skylantern
    velux: 2,            // Price per velux window
    conservatoryPanel: 1.50, // Price per glass panel
  },

  // Frequency Logic
  frequency: {
    monthlyDiscount: 4,  // Monthly price = 2-Monthly price MINUS £4
  }
};

/**
 * Helper function to calculate the final price
 * @param {Object} data - The formData from your component state
 */
export const calculateTotal = (data) => {
  if (!data.propertyType || !data.bedrooms) return 0;

  // 1. Get Base Price
  let total = pricingConfig.basePrices[data.propertyType][data.bedrooms] || 0;

  // 2. Add Extension fee
  if (data.hasExtension) {
    total += pricingConfig.extras.extension;
  }

  // 3. Add Skylanterns
  if (data.hasSkylantern && data.skylanternCount) {
    const count = parseInt(data.skylanternCount) || 0;
    total += (count * pricingConfig.extras.skylantern);
  }

  // 4. Add Velux Windows
  if (data.hasVelux && data.veluxCount) {
    const count = parseInt(data.veluxCount) || 0;
    total += (count * pricingConfig.extras.velux);
  }

  // 5. Add Conservatory Panels
  if (data.hasConservatory && data.conservatoryPanels) {
    const count = parseInt(data.conservatoryPanels) || 0;
    total += (count * pricingConfig.extras.conservatoryPanel);
  }

  return total;
};