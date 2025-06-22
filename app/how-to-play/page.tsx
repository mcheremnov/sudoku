export default function HowToPlay() {
  return (
    <div className="min-h-screen bg-white px-6 py-10 text-gray-800">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">How to Play Sudoku</h1>

        <p className="mb-4">
          Sudoku is a classic logic-based puzzle played on a 9×9 grid. The objective is simple:
          fill the grid so that every row, column, and each of the nine 3×3 boxes contains the
          numbers <strong>1 through 9</strong> exactly once.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">🧠 Rules</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Each number must appear once in every row.</li>
          <li>Each number must appear once in every column.</li>
          <li>Each number must appear once in each 3×3 box (called a subgrid or region).</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">🎯 Objective</h2>
        <p className="mb-4">
          Use logical reasoning—not guesswork—to fill the entire board. Start by identifying
          rows, columns, or boxes that are almost complete and work from there.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2">💡 Tips for Beginners</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Start with the easiest spots—the most filled rows or boxes.</li>
          <li>Look for numbers that can only fit in one place.</li>
          <li>Use pencil marks (if supported) to track possibilities.</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2">🚩 Game Features</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Play puzzles of varying difficulty levels</li>
          <li>Check your answers for mistakes</li>
          <li>Reveal the full solution if you get stuck</li>
        </ul>

        <p className="mt-6 text-center text-sm text-gray-600">
          Practice daily, and you&apos;ll be solving like a Sudoku master in no time!
        </p>
      </div>
    </div>
  );
}
