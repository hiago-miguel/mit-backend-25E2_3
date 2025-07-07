'use client';

import type { Curso as CursoType } from "@/lib/mockup"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Inscricao, Cancelar, getSession } from "@/lib/methods"

function parseDataInicio(inicio: string | Date): Date {
  if (inicio instanceof Date) return inicio;
  if (typeof inicio === 'string') {
    const [dia, mes, ano] = inicio.split('/');
    if (dia && mes && ano) return new Date(`${ano}-${mes}-${dia}`);
    return new Date(inicio);
  }
  return new Date();
}

export default function CursoView({ data } : { data : CursoType }){
    const [inscrito, setInscrito] = useState(data.inscrito || false)
    const [inscricaoCancelada, setInscricaoCancelada] = useState(data.inscricao_cancelada || false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [session, setSession] = useState<any>(null)

    useEffect(() => {
        getSession().then(setSession)
    }, [])

    const handleInscrever = async () => {
        setLoading(true)
        setError('')
        try {
            const result = await Inscricao({ idCurso: data.id })
            if (result.error) {
                setError(result.error)
            } else {
                setInscrito(true)
                setInscricaoCancelada(false)
            }
        } catch (e) {
            setError('Erro ao se inscrever no curso')
        } finally {
            setLoading(false)
        }
    }

    const handleCancelar = async () => {
        setLoading(true)
        setError('')
        try {
            const result = await Cancelar({ idCurso: data.id })
            if (result.error) {
                setError(result.error)
            } else {
                setInscricaoCancelada(true)
            }
        } catch (e) {
            setError('Erro ao cancelar inscrição')
        } finally {
            setLoading(false)
        }
    }

    return <div className="border flex-1 flex flex-col">
        <figure className="relative aspect-video">
            <Image 
                src={ data.capa } 
                alt={ data.nome } 
                fill 
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                style={{ objectFit: 'cover' }}
                unoptimized
            />
            { session && inscrito && !inscricaoCancelada && <figcaption className="text-sm p-4 bg-slate-200 absolute m-4 shadow-xl border-slate-400 border rounded-xl">Você já se inscreveu nesse curso</figcaption> }
        </figure>
        <div className="p-6 flex flex-col gap-2 flex-1">
            <h3 className="text-2xl">{ data.nome }</h3>
            <p>{ data.descricao }</p>
            <div className="flex flex-row flex-wrap gap-1">
                <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">{ data.inscricoes } inscritos</span>
                <span className="text-xs py-1 px-2 leading-tight bg-slate-200 rounded-2xl">Inicia em { parseDataInicio(data.inicio).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long', day: "numeric" }) }</span>
            </div>
        </div>
        { error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-center">
                { error }
            </div>
        ) }
        { session && (
            inscrito ? (
                inscricaoCancelada ? (
                    <p className="bg-red-500 p-4 text-center text-white">Inscrição cancelada</p>
                ) : (
                    <button
                        className="text-center p-4 bg-slate-300 hover:bg-slate-400"
                        onClick={ handleCancelar }
                        disabled={ loading }
                    >
                        { loading ? 'Cancelando...' : 'Cancelar inscrição' }
                    </button>
                )
            ) : (
                <button
                    className="text-center p-4 bg-indigo-500 hover:bg-indigo-600 text-white"
                    onClick={ handleInscrever }
                    disabled={ loading }
                >
                    { loading ? 'Inscrevendo...' : 'Fazer inscrição' }
                </button>
            )
        ) }
    </div>
}