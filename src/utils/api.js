export async function fetchProduct(barcode){
    const url = `https://world.openfoodfacts.org/api/v2/product/${barcode}.json?fields=product_name,nutriments`

    const response = await fetch(url);
    if(!response.ok){
        throw new Error("Tuotteen haku epäonnistui")
    }

    const data = await response.json();
    if(!data.product){
        throw new Error("Tuotetta ei löydy")
    }

    const n = data.product.nutriments ?? {};

    return {
        barcode: barcode,
        name: data.product.product_name,
        kcal: n["energy-kcal_100g"],
        protein: n.proteins_100g,
        carbs: n.carbohydrates_100g,
        fats: n.fat_100g,
    }
}

export async function searchProducts(query){
    const url = `https://world.openfoodfacts.org/cgi/search.pl?search_terms=${encodeURIComponent(query)}&search_simple=1&action=process&json=1&page_size=10&fields=code,product_name,brands,nutriments`;

    const response = await fetch(url);
    if(!response.ok) {
        throw new Error("Haku epäonnistui")
    }

    const data = await response.json();

    const products = data.products.map((p) => {
        const n = p.nutriments ?? {};
        return {
            barcode: p.code,
            name: p.product_name,
            kcal: n["energy-kcal_100g"],
            protein: n.proteins_100g,
            carbs: n.carbohydrates_100g,
            fats: n.fat_100g
        }
    })

    return products.filter((product) => product.kcal !== undefined && product.protein !== undefined && product.fats !== undefined && product.carbs !== undefined)

}