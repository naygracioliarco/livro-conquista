import { useState } from 'react';
import { Lock, Unlock, Download } from 'lucide-react';
import { UserAnswers } from '../types/questions';
import { generatePDF } from '../utils/pdf';

interface TeacherPanelProps {
  userAnswers: UserAnswers;
  onToggleTeacherMode: (show: boolean) => void;
  showTeacherView: boolean;
}

function TeacherPanel({ userAnswers, onToggleTeacherMode, showTeacherView }: TeacherPanelProps) {
  const [password, setPassword] = useState('');
  const [isLocked, setIsLocked] = useState(true);
  const [error, setError] = useState('');
  const TEACHER_PASSWORD = 'professor123';

  const handleUnlock = () => {
    if (password === TEACHER_PASSWORD) {
      setIsLocked(false);
      onToggleTeacherMode(true);
      setError('');
      setPassword('');
    } else {
      setError('Senha incorreta');
      setPassword('');
    }
  };

  const handleLock = () => {
    setIsLocked(true);
    onToggleTeacherMode(false);
    setPassword('');
    setError('');
  };

  const handleDownloadPDF = async () => {
    try {
      await generatePDF(userAnswers);
    } catch (err) {
      console.error('Erro ao gerar PDF:', err);
    }
  };

  if (isLocked) {
    return (
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => {
            const modal = document.getElementById('teacher-modal');
            if (modal) modal.classList.toggle('hidden');
          }}
          className="bg-gradient-to-r from-red-600 to-red-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
          title="Acesso do Professor"
        >
          <Lock size={24} />
        </button>

        <div id="teacher-modal" className="hidden fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-slate-800 mb-4">Acesso do Professor</h3>
            <p className="text-slate-600 mb-4">Digite a senha para acessar o gabarito e as respostas dos alunos.</p>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUnlock()}
              placeholder="Senha"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

            <div className="flex gap-3">
              <button
                onClick={handleUnlock}
                className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
              >
                Desbloquear
              </button>
              <button
                onClick={() => {
                  document.getElementById('teacher-modal')?.classList.add('hidden');
                  setPassword('');
                  setError('');
                }}
                className="flex-1 bg-slate-300 text-slate-800 py-2 rounded-lg hover:bg-slate-400 transition-colors font-semibold"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
      <button
        onClick={handleDownloadPDF}
        className="bg-gradient-to-r from-green-600 to-green-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        title="Baixar PDF com respostas"
      >
        <Download size={24} />
      </button>

      <button
        onClick={handleLock}
        className="bg-gradient-to-r from-yellow-600 to-yellow-700 text-white p-3 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all"
        title="Bloquear acesso do professor"
      >
        <Unlock size={24} />
      </button>
    </div>
  );
}

export default TeacherPanel;
