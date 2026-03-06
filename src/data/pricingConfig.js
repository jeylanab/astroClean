// src/pricingConfig.js

export const pricingConfig = {
  // Base prices based on Property Type and Bedroom Count
  basePrices: {
    detached: {
      '1-2': 28,
      '3': 24,
      '4': 38,
      '5': 46,
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
      '1-2': 28,
      '3': 32,
      '4': 38,
      '5': 45,
      '6+': 55,
    }
  },

  // Add-on prices (Fixed rates)
  extras: {
    extension: 5,
    skylantern: 4,
    velux: 2,
    conservatoryPanel: 1.50,
    bifold: 1,
    noRearAccess: 5,      // Surcharge when cleaner must go through property
  },

  // Frequency Logic
  frequency: {
    monthlyDiscount: 4,
  }
};

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

  // 6. Add Bifold Doors
  if (data.hasBifold && data.bifoldCount) {
    const count = parseInt(data.bifoldCount) || 0;
    total += (count * pricingConfig.extras.bifold);
  }

  // 7. No rear access surcharge
  if (data.rearAccess === false) {
    total += pricingConfig.extras.noRearAccess;
  }

  return total;
};
