"use client"
import CRUD from "components/components/CRUD"
import { useAuth } from "components/hooks/useAuth"
import { useRouter } from "next/navigation"
import Calendar from "react-calendar"

export default function Home() {
    const { user, loading } = useAuth()
    const router = useRouter()

    if (loading) {
        return <p className="text-center text-2xl font-medium mt-10">Carregando...</p>
    }

    if (!user) {
        router.push('/auth')
        return null
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div>
                <h1 className="text-2xl font-medium">Bem vindo(a)! {user.displayName}</h1>
            
            <div className="bg-pink-500 h-60 w-110 border rounded-3xl shadow-2xl mt-10">
                <h3 className="items-center text-center font-extralight text-white text-xl mt-2">Agende seu horário</h3>
                <Calendar 
                onChange={(value) => console.log(value)}
                value={new Date()}
                className="text-white font-extralight mt-2 items-center text-center"
                />
            <CRUD />
            </div>
            </div>
        </main>

    )
}