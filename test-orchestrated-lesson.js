import React, { useState } from 'react';
import MyNextLessonPlatform from '../src/components/MyNextLessonPlatform';

export default function TestOrchestratedLesson() {
  const [settings, setSettings] = useState({ age: 12, tone: 'fun', language: 'english' });
  const [showCalendar, setShowCalendar] = useState(false);
  const [showVariants, setShowVariants] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const renderCalendar = () => showCalendar && (
    <div className="fixed top-16 right-8 z-50 bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-96 max-w-full animate-fadeIn border border-white/20 pointer-events-auto">
      <div className="text-xl font-bold mb-4 text-gray-900/80">Lesson Calendar (Test Page)</div>
      <div className="text-gray-700/80 text-sm mb-4">(Calendar UI here)</div>
      <button onClick={() => setShowCalendar(false)} className="mt-6 w-full py-2 rounded-lg bg-blue-600/80 text-white font-semibold hover:bg-blue-700/90 transition-all">Close</button>
    </div>
  );
  const renderVariants = () => showVariants && (
    <div className="fixed top-16 right-8 z-50 bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-80 max-w-full animate-fadeIn border border-white/20 pointer-events-auto">
      <div className="text-lg font-bold mb-4 text-gray-900/80">Lesson Variants (Test Page)</div>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-700/80 mb-1">Age</label>
          <select className="w-full rounded-lg p-2 bg-white/60" value={settings.age} onChange={e => setSettings(s => ({ ...s, age: Number(e.target.value) }))}>
            {[6, 12, 18, 30, 50, 80].map(a => <option key={a}>{a}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-gray-700/80 mb-1">Tone</label>
          <select className="w-full rounded-lg p-2 bg-white/60" value={settings.tone} onChange={e => setSettings(s => ({ ...s, tone: e.target.value }))}>
            {['neutral', 'fun', 'grandmother'].map(t => <option key={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-gray-700/80 mb-1">Language</label>
          <select className="w-full rounded-lg p-2 bg-white/60" value={settings.language} onChange={e => setSettings(s => ({ ...s, language: e.target.value }))}>
            {['english', 'spanish', 'french'].map(l => <option key={l}>{l}</option>)}
          </select>
        </div>
      </div>
      <button onClick={() => setShowVariants(false)} className="mt-6 w-full py-2 rounded-lg bg-blue-600/80 text-white font-semibold hover:bg-blue-700/90 transition-all">Close</button>
    </div>
  );
  const renderAbout = () => showAbout && (
    <div className="fixed top-16 right-8 z-50 bg-white/30 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 w-96 max-w-full animate-fadeIn border border-white/20 pointer-events-auto">
      <div className="text-xl font-bold mb-4 text-gray-900/80">About MyNextLesson (Test Page)</div>
      <div className="text-gray-800/90 whitespace-pre-line mb-6">
        This is a test page for the orchestrated, Netflix-level lesson experience.<br />
        - Ken/Kelly avatar orchestration<br />
        - Real-time TTS and emotion mapping<br />
        - Glass-morphism overlays and controls<br />
        - 3x2x1 lesson flow and daily fortune crescendo
      </div>
      <button onClick={() => setShowAbout(false)} className="w-full py-2 rounded-lg bg-blue-600/80 text-white font-semibold hover:bg-blue-700/90 transition-all">Close</button>
    </div>
  );
  const renderMenu = () => (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      <button onClick={() => setShowCalendar(true)} className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center text-2xl hover:bg-white/50 transition-all">📅</button>
      <button onClick={() => setShowVariants(true)} className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center text-2xl hover:bg-white/50 transition-all">🎛️</button>
      <button onClick={() => setShowAbout(true)} className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-md shadow-lg flex items-center justify-center text-2xl hover:bg-white/50 transition-all">ℹ️</button>
    </div>
  );

  return (
    <div className="relative w-screen h-screen min-h-screen overflow-hidden bg-black">
      <MyNextLessonPlatform settings={settings} />
      {renderMenu()}
      {renderCalendar()}
      {renderVariants()}
      {renderAbout()}
    </div>
  );
} 