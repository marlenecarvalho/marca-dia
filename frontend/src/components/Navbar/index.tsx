export default function Navbar() {
    return(
        <nav className="bg-gray-800 w-full shadow">
            <div className="max-w-7xl mx-auto px-8 py-4 sm:px-6 lg:px-8">
                <ul className="flex text-pink-400 font-semibold gap-12">
                    <li>
                        <a href="/">Home</a>
                    </li>
                    <li>
                        <a href="/auth">Entrar</a>
                    </li>
                    <li>
                        <a href="/marcacoes">Marcações</a>
                    </li>

                </ul>
            </div>

        </nav>
    )
}