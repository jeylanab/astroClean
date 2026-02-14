export const pricingData = {
  properties: [
    { id: 'detached', title: 'Detached', price: 30, img: '/assets/detached.png' },
    { id: 'semi', title: 'Semi-Detached', price: 24, img: '/assets/semi.png' },
    { id: 'terrace', title: 'Terraced', price: 18, img: '/assets/terrace.png' },
    { id: 'flat', title: 'Flat', price: 15, img: '/assets/flat.png' }
  ],
  bedrooms: [
    { id: '1-2', title: '1-2', extra: 0 },
    { id: '3', title: '3', extra: 5 },
    { id: '4', title: '4', extra: 10 },
    { id: '5', title: '5', extra: 15 }
  ],
  frequencies: [
    { id: '2-monthly', title: '2 Monthly', mod: 0 },
    { id: 'monthly', title: 'Monthly', mod: -4 }
  ]
};