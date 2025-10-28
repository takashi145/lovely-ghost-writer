'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [bloodType, setBloodType] = useState('A');
  const [isLoading, setIsLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setDisplayedText('');
    setIsAnimating(false);

    try {
      const response = await fetch('/api/fortune', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, birthDate, bloodType }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.content) {
          setIsAnimating(true);
          animateText(data.content);
        }
      } else {
        alert(data.error || '占いの生成に失敗しました');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('占いの生成に失敗しました');
    } finally {
      setIsLoading(false);
    }
  };

  const animateText = (text: string) => {
    if (!text) {
      setIsAnimating(false);
      return;
    }

    let index = 0;
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < text.length) {
        const char = text[index];
        setDisplayedText((prev) => prev + char);
        index++;
      } else {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 100);
  };

  const handleCopy = async () => {
    if (!displayedText) return;

    try {
      await navigator.clipboard.writeText(displayedText);
      alert('占い結果をコピーしました');
    } catch (error) {
      alert('コピーに失敗しました');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl md:text-4xl text-stone-300 mb-2 tracking-[0.3em] font-serif">
						自動占い師
          </h1>
          <div className="w-32 h-px bg-stone-500 mx-auto mt-4"></div>
        </div>

				<div className="mb-12 flex justify-center">
					<p className="text-xs text-stone-400 font-serif">
						※ 占い結果はAIによって生成されたものであり、科学的根拠はありません。
						<br />
						娯楽目的としてお楽しみください。
					</p>
				</div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-16">
          <div className="h-fit w-full mx-auto lg:mx-0">
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label className="block text-stone-400 text-xs tracking-[0.2em] mb-1.5 font-serif">
                  名前 (ニックネーム可)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
									disabled={isLoading || isAnimating}
                  required
                  className="w-full px-1 py-1.5 border-b border-stone-700 text-stone-100 focus:outline-none focus:border-stone-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-stone-400 text-xs tracking-[0.2em] mb-1.5 font-serif">
                  生年月日
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
									disabled={isLoading || isAnimating}
                  required
                  className="w-full px-1 py-1.5 border-b border-stone-700 text-stone-100 focus:outline-none focus:border-stone-500 text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-stone-400 text-xs tracking-[0.2em] mb-1.5 font-serif">
                  血液型
                </label>
                <select
                  value={bloodType}
                  onChange={(e) => setBloodType(e.target.value)}
									disabled={isLoading || isAnimating}
                  required
                  className="w-full px-1 py-1.5 border-b border-stone-700 text-stone-100 focus:outline-none focus:border-stone-500 text-sm sm:text-base cursor-pointer"
                >
                  <option value="A" className="bg-neutral-800">A型</option>
                  <option value="B" className="bg-neutral-800">B型</option>
                  <option value="O" className="bg-neutral-800">O型</option>
                  <option value="AB" className="bg-neutral-800">AB型</option>
                </select>
              </div>

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isLoading || isAnimating}
                  className="font-serif cursor-pointer w-full py-3 bg-stone-800/30 hover:bg-stone-800/40 disabled:bg-transparent disabled:cursor-not-allowed disabled:pointer-events-none text-stone-300 hover:text-stone-200 transition-all border-t border-b border-stone-700 hover:border-stone-600 tracking-[0.3em] text-xs disabled:opacity-50 relative"
                >
                  {isLoading || isAnimating ? '占い中' : '占う'}
                </button>
              </div>
            </form>
          </div>

          {/* 占い結果 */}
          <div className="relative min-h-[400px] md:col-span-2 w-full mx-auto lg:mx-0">
            <div className="relative h-full">
              <div
								className="relative p-10 min-h-[600px] flex flex-col overflow-hidden opacity-90"
								style={{
									clipPath: 'polygon(2% 0.5%, 5% 1%, 10% 0.3%, 15% 1.2%, 20% 0.8%, 30% 0.5%, 40% 1%, 50% 0.3%, 60% 0.8%, 70% 0.5%, 80% 1.2%, 90% 0.7%, 95% 0.3%, 98.5% 1%, 99% 5%, 99.5% 10%, 99.8% 20%, 99.3% 30%, 99.7% 40%, 99.5% 50%, 99.2% 60%, 99.6% 70%, 99.4% 80%, 99.8% 90%, 99.3% 95%, 98.5% 98%, 95% 99%, 90% 99.5%, 80% 99.2%, 70% 99.6%, 60% 99.3%, 50% 99.7%, 40% 99.4%, 30% 99.8%, 20% 99.2%, 10% 99.5%, 5% 99.3%, 1% 98.5%, 0.5% 95%, 0.8% 90%, 0.3% 80%, 0.6% 70%, 0.5% 60%, 0.8% 50%, 0.4% 40%, 0.7% 30%, 0.3% 20%, 0.6% 10%, 1% 5%)',
								}}>
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url('/vintage_paper_texture.png')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                ></div>

                <div className="relative z-10 flex-1">
									{isLoading && !isAnimating ? (
										<div className="absolute inset-0 flex items-center justify-center animate-pulse font-serif text-stone-800" aria-label="読み込み中">
											占いを生成中...
										</div>
									) : (
										<pre className="whitespace-pre-wrap text-base md:text-lg leading-relaxed font-semibold font-serif text-stone-800">
											{displayedText}
										</pre>
									)}
                </div>
              </div>
							{displayedText && !isLoading && !isAnimating && (
								<div className="mt-4 flex justify-center">
									<button
										onClick={handleCopy}
										className="font-serif px-6 py-2 bg-stone-800/30 hover:bg-stone-800/40 text-stone-300 border border-stone-700 text-xs rounded cursor-pointer"
									>
										コピー
									</button>
								</div>
							)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
