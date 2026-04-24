import { UNAUTHORIZED, UNKWON } from "@/constants/APIErrors";
import { Auth, ResponseAuth } from "@/models/auth";

// http://localhost:3000/api/auth/sign-in/email
export async function service_login(user_data: Auth) {
    const response = await fetch('http://192.168.0.12:3000/api/auth/sign-in/email', {
        headers: {
            'Content-Type': 'application/json',
            'Origin': 'http://localhost:3000'
        },
        method: 'POST',
        body: JSON.stringify(user_data)
    })

    const request = await response.json()
    if (response.status == 401) {
        throw new Error(UNAUTHORIZED)
    }

    if (!response.ok) {
        throw new Error(UNKWON)
    }

    return request as ResponseAuth
} 