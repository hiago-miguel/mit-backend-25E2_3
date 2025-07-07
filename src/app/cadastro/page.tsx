'use client';

import Link from "next/link";
import { useState } from "react";
import { CreateUser } from "@/lib/methods";
import { useRouter } from "next/navigation";

export default function Page() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    nascimento: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Converter data do formato YYYY-MM-DD para DD/MM/YYYY
      const [year, month, day] = formData.nascimento.split('-');
      const nascimento = `${day}/${month}/${year}`;

      const result = await CreateUser({
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        nascimento
      });

      if (result.error || result.status === 400 || result.status === 500) {
        setError(result.mensagem || result.error || 'Erro ao cadastrar usuário');
        // NÃO redireciona em caso de erro - fica na página de cadastro
      } else {
        // Redirecionar para login APENAS após cadastro bem-sucedido
        router.push('/login');
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
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="page-title">Cadastro</h2>
        <p>Eu já tenho cadastro, quero <Link href="/login">fazer login.</Link></p>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}
        
        <div className="max-w-96 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="nome">Nome</label>
            <input 
              type="text" 
              required 
              name="nome" 
              id="nome" 
              value={formData.nome}
              onChange={handleChange}
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" 
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="nascimento">Data de nascimento</label>
            <input 
              type="date" 
              required 
              name="nascimento" 
              id="nascimento" 
              value={formData.nascimento}
              onChange={handleChange}
              className="border h-10 rounded-xl focus:outline-none focus:border-indigo-300 px-4 py-2" 
            />
          </div>
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
        </div>
        <div className="flex flex-row justify-between items-end">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-indigo-500 hover:bg-indigo-600 disabled:bg-indigo-300 text-white px-6 py-3 rounded-lg"
          >
            {loading ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </div>
      </form>
    </main>
  );
}
