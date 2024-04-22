import User from "../models/User";

abstract class UserMethods {

    public static async register(user: User): Promise<void | Error> {
        return await fetch('http://localhost:5432/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user.toJSON())
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

    public static async login(login: string, password: string): Promise<void | Error> {
        return await fetch('http://localhost:5432/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, password: password})
        })
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                this.addToken(data.token)
            })
            .catch((error) => {
                return error
            });
    }

    public static async update(user: User): Promise<void | Error> {
        return await fetch('http://localhost:5432/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user: user.toJSON(), token: this.getToken()})
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

    public static async getDetails(login: string, token: string): Promise<User | Error> {
        return await fetch('http://localhost:5432/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({login: login, token: token})
        })
            .then(response => {
                let data: any = response.json()
                if (!response.ok) {
                    throw new Error(data.message)
                }
                return User.fromJSON(data.user)
            })
            .catch((error) => {
                return error
            })
    }

    public static getToken(): string | null {
        return localStorage.getItem("token")
    }

    public static addToken(token: string): void {
        localStorage.setItem("token", token)
    }

    public static removeToken(token: string): void {
        localStorage.removeItem("token")
    }
}

export default UserMethods