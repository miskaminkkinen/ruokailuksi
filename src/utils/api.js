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