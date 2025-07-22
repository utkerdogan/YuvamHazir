export const mapCartFromBackend = (data) => {
  // Eğer data null/undefined veya data.items yoksa boş dizi döner
  if (!data || !Array.isArray(data.items)) return [];

  return data.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    productName: item.productName,
    imageUrl: item.imageUrl,
    unitPrice: item.unitPrice,
    quantity: item.quantity,
  }));
};
