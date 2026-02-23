import React, { useState, useEffect, useRef } from 'react';

interface CommandLineProps {
  onCommand: (command: string) => void;
}

const CommandLine: React.FC<CommandLineProps> = ({ onCommand }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input);
      setHistory(prev => [...prev, input]);
      setInput('');
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        if (newIndex === history.length - 1) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  // Calculate cursor position based on input length
  const getCursorPosition = () => {
    // Approximate width per character (monospace is consistent)
    // 0.6em is the width of the cursor, so each character is roughly 0.6em
    return `${input.length * 0.6}em`;
  };

  useEffect(() => {
    // Focus the input when component mounts
    inputRef.current?.focus();
  }, []);

  return (
    <form onSubmit={handleSubmit} className="flex items-center mt-4 font-mono">
      <span className="text-gruvbox-green mr-2 font-bold">$</span>
      <div className="relative flex-1">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="terminal-input"
          placeholder="Type 'help' for available commands..."
          spellCheck={false}
          aria-label="Terminal input"
        />
        {/* Custom cursor appears at the end of text when focused */}
        {isFocused && (
          <span 
            ref={cursorRef}
            className="terminal-cursor absolute" 
            style={{ 
              left: getCursorPosition(),
              top: '0.15em',
              pointerEvents: 'none'
            }}
          />
        )}
      </div>
    </form>
  );
};

export default CommandLine;