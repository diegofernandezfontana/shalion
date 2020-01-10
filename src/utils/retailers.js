const retailers = [
  { name: 'Amazon', value: 'avg_price_amazon', color: 'orange' },
  { name: 'Carethy', value: 'avg_price_carethy', color: '#aaffc3' },
  { name: 'Carrefour', value: 'avg_price_carrefour', color: '#000075' },
  { name: 'Douglas', value: 'avg_price_douglas', color: '#42d4f4' },
  { name: 'Druni', value: 'avg_price_druni', color: '#dc677c' },
  { name: 'El corte ingles', value: 'avg_price_elcorteingles', color: 'pink' },
  { name: 'Fundgrube', value: 'avg_price_fundgrube', color: 'green' },
  { name: 'Maquillalia', value: 'avg_price_maquillalia', color: '#3951a5' },
  { name: 'Notino', value: 'avg_price_notino', color: '#3a8c80' },
  { name: 'Nutritienda', value: 'avg_price_nutritienda', color: 'red' },
  { name: 'Perfumes club', value: 'avg_price_perfumesclub', color: '#46a1ca' },
  { name: 'Prior', value: 'avg_price_primor', color: '#c77eb4' },
  { name: 'Sephora', value: 'avg_price_sephora', color: 'yellow' },
  { name: 'Ulabox', value: 'avg_price_ulabox', color: 'green' },
];

const getRetailerColors = retailerValue => {
  const retailerIdx = retailers.findIndex(retailer => retailer.value === retailerValue);

  return retailers[retailerIdx].color;
};

export { retailers, getRetailerColors };
