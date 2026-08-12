import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Loader2 } from 'lucide-react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error: authError } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (authError) {
      setError('Credenciales inválidas. Verifica tu correo y contraseña.');
      return;
    }
    navigate('/admin');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-mist px-4">
      <form onSubmit={onSubmit} className="w-full max-w-sm rounded-3xl bg-white p-8 shadow-md space-y-5">
        <div className="text-center">
          <h1 className="font-display font-extrabold text-2xl text-morado">Ser &amp; Saber</h1>
          <p className="text-sm text-ink/60 mt-1">Panel administrativo</p>
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink/80 mb-1.5">Correo</label>
          <input
            required type="email" value={email} onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus:border-morado outline-none"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-ink/80 mb-1.5">Contraseña</label>
          <input
            required type="password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-xl border border-ink/15 px-4 py-2.5 text-sm focus:border-morado outline-none"
          />
        </div>
        {error && <p className="text-sm font-semibold text-red-600">{error}</p>}
        <button
          type="submit" disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-morado px-6 py-3 text-sm font-bold text-white disabled:opacity-60"
        >
          {loading && <Loader2 className="animate-spin" size={16} />}
          Ingresar
        </button>
        <p className="text-xs text-ink/40 text-center">
          El acceso se administra desde Supabase Auth (usuarios creados por el equipo de la Fundación).
        </p>
      </form>
    </div>
  );
}
