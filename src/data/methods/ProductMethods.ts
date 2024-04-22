import Product from "../models/Product";
import UserMethods from "./UserMethods";

abstract class ProductMethods {
    public static async getAll(): Promise<Product[] | Error> {
        return await fetch('http://localhost:5432/api/products')
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return data
            })
            .then(data => {
                return data.map((productData: any) => {
                    return new Product(
                        productData.id, productData.name, productData.description, productData.price, productData.photo)
                })
            })
            .catch((error) => {
                return error
            })
    }

    public static async get(id: number): Promise<Product | Error> {
        return await fetch(`http://localhost:5432/api/products/${id}`)
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return data;
            })
            .then(data => {
                return new Product(data.id, data.name, data.description, data.price, data.photo)
            })
            .catch((error) => {
                return error
            });
    }

    public static async create(product: Product): Promise<void | Error> {
        return await fetch('http://localhost:5432/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({product: product.toJSON(), token: UserMethods.getToken()})
        })
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
            })
            .catch((error) => {
                return error
            });
    }

    public static async update(product: Product): Promise<void> {
        await fetch(`http://localhost:5432/api/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({product: product.toJSON(), token: UserMethods.getToken()})
            }
        )
    }

    public static async delete(product: Product): Promise<void> {
        await fetch(`http://localhost:5432/api/products/${product.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
            body: JSON.stringify({token: UserMethods.getToken()})
            }
        )
    }
}

export default ProductMethods
