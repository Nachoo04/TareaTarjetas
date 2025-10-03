
const BASE_URL = "http://192.168.1.6:3000";

export type ProductDTO = {
  id: string;
  title: string;
  image: string;   
  price: number;
};

export async function getProducts(): Promise<ProductDTO[]> {
  const r = await fetch(`${BASE_URL}/products`);
  if (!r.ok) throw new Error(`GET /products ${r.status}`);
  return r.json();
}

export async function createProduct(body: Omit<ProductDTO, "id">): Promise<ProductDTO> {
  const r = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`POST /products ${r.status}`);
  return r.json();
}
