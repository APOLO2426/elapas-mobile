import { Auth } from "@/models/auth";

// http://localhost:3000/api/auth/sign-in/email
export async function AuthService(user_data: Auth) {
    const response = await fetch('http://10.116.219.225:3000/api/auth/sign-in/email', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(user_data)
    })

    const request = await response.json()
    console.log(request)


} 