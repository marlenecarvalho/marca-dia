'use client'

import { useState } from "react"
import { auth } from "../../lib/firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth"
import { useRouter } from "next/navigation"



export function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    // função para criar login
    async function handleSubmit (e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)
        setError('')

    try {
        if (isLogin) {
            await signInWithEmailAndPassword(auth, email, password)
        } else {
            await createUserWithEmailAndPassword(auth, email, password)
        } 
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    // função para logar pelo google
    async function handlerGoogleLogin() {
        const provider = new GoogleAuthProvider
        try {
            await signInWithPopup(auth, provider)
            router.push ('/');
        } catch (err: any) {
            setError(err.message)
        }
    }
    
    // função para resetar senha 
    async function handlerResetPassword() {
      if (!email) return ("Digite seu email")
        try {
            await sendPasswordResetEmail(auth, email)
            router.push('/')
            alert("Link de redefinição de senha enviado para seu email!")
        } catch (err: any) {
            setError(err.message)
        }
        }

    return (
        <div className="max-w-md max-auto mt-10 bg-white shadow-lg rounded-xl p-15 gap-4 ">
            <h2 className="text-2xl font-bold text-center font-sans">{isLogin ? 'Login' : 'Criar conta'}</h2>
            {error && <p className="text-red-500">{error}</p>}


        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input 
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            className="mt-4 border py-2 px-4 rounded"
            required/>

            <input 
            type="text"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
            className="mt-4 border py-2 px-4 rounded"
            required/>

            <button type="submit"  
            disabled={loading}
            className="w-full border py-2 rounded  bg-blue-600 text-white hover:bg-blue-700">
                {loading ? 'Carregando...' : isLogin ? 'Entrar' : 'Criar conta'}

            </button>
        </form>
        <div className="mt-4 flex flex-col gap-4">
            <button onClick={handlerGoogleLogin}
            className="w-full border py-2 rounded bg-red-400 text-white hover:bg-red-500"
            >Entrar com google</button>

            <button onClick={() => setIsLogin(!isLogin)}
            className="text-grey-600 text-sm hover:underline"
            >
                {isLogin ? 'Criar conta' : 'Já tenho uma conta'}
            </button>

            {isLogin && (
                <button onClick={handlerResetPassword}
                className="text-grey-600 text-sm hover:underline"
                >
                    Esqueceu a senha?
                </button>
            )}
        </div>
    </div>
)
};