'use client';

import Link from "next/link";
import { useState } from "react";
import { Login } from "@/lib/methods";
import { useRouter } from "next/navigation";

export default function Page() {
  const [formData, setFormData] = useState({
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const result = await Login({
        email: formData.email,
        senha: formData.senha
      });

      if (result.error || result.status === 400 || result.status === 500) {
        setError(result.mensagem || result.error || 'Erro ao fazer login');
        // NÃO redireciona em caso de erro - fica na página de login
      } else {
        // Redirecionar para a página principal APENAS após login bem-sucedido, forçando reload
        window.location.href = '/';
      }
    } catch (error) {
      setError('Erro interno do sistema');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <main>      
      <form onSubmit={handleSubmit} className="p-6 bg-indigo-50 max-w-96 rounded-3xl flex flex-col gap-4">
        <h2 className="page-title">Login</h2>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <div className="flex flex-col gap-2">
          <label htmlFor="email">E-mail</label>
          <input 
            type="email" 
            required 
            name="email" 
            id="email" 
            value={formData.email}
            onChange={handleChange}
            className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" 
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="senha">Senha</label>
          <input 
            type="password" 
            required 
            name="senha" 
            id="senha" 
            value={formData.senha}
            onChange={handleChange}
            className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" 
          />
        </div>
        <div className="flex flex-row justify-between items-end">
          <Link href="/cadastro" className="my-3">Fazer cadastro</Link>
          <button 
            type="submit" 
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white px-6 py-3 rounded-lg"
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </div>
      </form>
    </main>
  );
}
