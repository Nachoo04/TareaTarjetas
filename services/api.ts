import { BASE_URL } from "../config/ip_config";

export type ProductoExportado = {
  id: string;
  title: string;
  image: string;   
  price: number;
};

export async function getProducts(): Promise<ProductoExportado[]> {
  const r = await fetch(`${BASE_URL}/products`);
  if (!r.ok) throw new Error(`GET /products ${r.status}`);
  return r.json();
}

export async function createProduct(body: Omit<ProductoExportado, "id">): Promise<ProductoExportado> {
  const r = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!r.ok) throw new Error(`POST /products ${r.status}`);
  return r.json();
}
