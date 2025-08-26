'use client';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import Link from 'next/link';
import { useState } from 'react';

// ✅ REGISTRO DAS ESCALAS E ELEMENTOS (precisa estar fora do componente!)
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);


const metrics = [
  { title: 'Vendas Totais', value: '1.240', icon: '📈' },
  { title: 'Faturamento (Mês)', value: 'R$ 28.500', icon: '💰' },
  { title: 'Novos Clientes', value: '320', icon: '👥' },
  { title: 'Produtos Ativos', value: '558', icon: '📦' },
];

const chartData = {
  labels: ['01', '05', '10', '15', '20', '25', '30'],
  datasets: [{
    label: 'Vendas por dia',
    data: [12, 19, 7, 15, 23, 18, 30],
    borderColor: '#3B82F6',
    backgroundColor: 'rgba(59, 130, 246, 0.2)',
    tension: 0.4,
  }],
};

const testimonials = [
  { name: 'Ana Silva', role: 'Loja Acessórios XYZ', quote: 'Com o dashboard do DevCommerce, aumentamos nosso faturamento em 35% em 2 meses!' },
  { name: 'Lucas Pereira', role: 'TechStore', quote: 'Muito fácil de usar — controle total das vendas e estoque em um só lugar.' },
  { name: 'Mariana Costa', role: 'Fashion Hub', quote: 'Visual limpo, intuitivo e com dados certeiros para tomar decisão rápida.' },
];

export default function Home() {
  const [current, setCurrent] = useState(0);
  return (
    <div className="font-sans text-gray-800 bg-gray-50 flex flex-col min-h-screen">
      <header className="sticky top-0 bg-white shadow-md z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-extrabold text-indigo-600">DevCommerce</h1>
          <nav className="flex space-x-4 items-center">
            <Link
              href="/login"
              className="px-4 py-2 rounded text-indigo-600 border border-indigo-600 hover:bg-indigo-50 transition flex items-center justify-center"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition flex items-center justify-center"
            >
              Cadastro
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero + Métricas */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-bold leading-tight text-gray-900">
                Seu controle total de vendas e estoque num só painel
              </h2>
              <p className="text-lg text-gray-600">
                Cadastre seus produtos, acompanhe métricas-chave, visualize gráficos de desempenho, gerencie clientes e maximize seu faturamento com clareza.
              </p>
              <div className="flex gap-4 mt-6">
                <Link href="/dashboard" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition">Acessar Dashboard</Link>
                <Link href="/register" className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg font-medium hover:bg-indigo-50 transition">Criar Conta</Link>
              </div>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Pessoa comemorando sucesso profissional"
                className="rounded-lg shadow-lg object-cover w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* Métricas Cards */}
        <section className="py-10 bg-white">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((m) => (
              <div key={m.title} className="bg-gray-100 p-6 rounded-lg shadow-sm flex flex-col items-start space-y-2">
                <div className="text-3xl">{m.icon}</div>
                <p className="text-gray-500">{m.title}</p>
                <h3 className="text-2xl font-bold">{m.value}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Gráfico de vendas */}
        <section className="py-10">
          <div className="max-w-4xl mx-auto px-6 bg-white p-6 rounded-lg shadow">
            <Line data={chartData} />
          </div>
        </section>

        {/* Depoimentos */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-3xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">O que nossos usuários dizem</h2>
            <div className="space-y-4">
              <blockquote className="text-lg italic text-gray-700">
                “{testimonials[current].quote}”
              </blockquote>
              <p className="font-semibold">{testimonials[current].name}, <span className="text-gray-500">{testimonials[current].role}</span></p>
            </div>
            <div className="flex justify-center space-x-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`w-3 h-3 rounded-full ${idx === current ? 'bg-indigo-600' : 'bg-gray-400'}`}
                />
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center text-sm text-gray-500">
          <span>&copy; 2025 DevCommerce</span>
          <div className="space-x-4">
            <Link href="/sobre" className="hover:underline">Sobre</Link>
            <Link href="/contato" className="hover:underline">Contato</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
