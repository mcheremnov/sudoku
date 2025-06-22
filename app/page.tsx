'use client'

import { useEffect, useState } from 'react'

type ResponseJSON = {
  newboard: {
    grids: {
      value: number[][]
      solution: number[][]
      difficulty: 'Easy' | 'Medium' | 'Hard'
    }[]
    results: number
    message: string
  }
}


export default function Home() {
  const [puzzle, setPuzzle] = useState<number[][]>([])
  const [solution, setSolution] = useState<number[][]>([])
  const [showSolution, setShowSolution] = useState(false)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchBoard = async () => {
      const res = await fetch('https://sudoku-api.vercel.app/api/dosuku')
      if (!res.ok) {
        throw new Error('Failed to fetch board')
      }
      const board: ResponseJSON = await res.json()

      setPuzzle(board.newboard.grids[0].value)
      setSolution(board.newboard.grids[0].solution)
      setLoading(false)
    }
    fetchBoard()
  }, [])

  const handleValueChange = (row: number, col: number, val: string | null) => {
    const num = parseInt(val ?? '')
    setPuzzle(prev => {
      const updated = prev.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? (isNaN(num) ? 0 : num) : c))
      )
      return updated
    })
  }
  const checkSolution = (userBoard: number[][], solutionBoard: number[][]): boolean => {
    for (let i = 0; i < userBoard.length; i++) {
      for (let j = 0; j < userBoard[i].length; j++) {
        if (userBoard[i][j] !== solutionBoard[i][j]) {
          alert('Solution is incorrect. Please try again.')
          return false
        }
      }
    }
    alert('Congratulations! Your solution is correct.')
    return true
  }
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-gray-700 font-medium">Loading puzzle...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6 text-black">
      <div className="flex flex-col items-center">
        <div className="flex flex-col md:flex-row gap-8">
          {/* User Board */}
          <div>
            <h2 className="mb-2 text-lg font-semibold">Your Puzzle</h2>
            {puzzle.map((row, rowIndex) => (
              <div
                key={rowIndex}
                className={`flex ${rowIndex % 3 === 0 ? 'border-t-4 border-gray-800' : ''} ${rowIndex === 8 ? 'border-b-4 border-gray-800' : ''
                  }`}
              >
                {row.map((value, colIndex) => (
                  <input
                    key={colIndex}
                    type="text" 
                    maxLength={1}
                    value={value === 0 ? '' : value}
                    onChange={(e) => handleValueChange(rowIndex, colIndex, e.target.value)}
                    className={`w-8 h-8 text-center text-sm border ${colIndex % 3 === 0 ? 'border-l-4' : 'border-l'
                      } ${colIndex === 8 ? 'border-r-4' : ''} border-gray-800 bg-white`}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Solution Board */}
          {showSolution && (
            <div>
              <h2 className="mb-2 text-lg font-semibold">Solution</h2>
              {solution.map((row, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`flex ${rowIndex % 3 === 0 ? 'border-t-4 border-gray-800' : ''} ${rowIndex === 8 ? 'border-b-4 border-gray-800' : ''
                    }`}
                >
                  {row.map((value, colIndex) => (
                    <div
                      key={colIndex}
                      className={`w-8 h-8 flex items-center justify-center text-sm font-medium border border-gray-800 ${colIndex % 3 === 0 ? 'border-l-4' : ''
                        } ${colIndex === 8 ? 'border-r-4' : ''}`}
                    >
                      {value}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>


        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <button
            onClick={() => setShowSolution(prev => !prev)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded"
          >
            {showSolution ? 'Hide Solution' : 'Reveal Solution'}
          </button>
          <button
            onClick={() => checkSolution(puzzle, solution)}
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-4 rounded"
          >
            Check Your Answers
          </button>
        </div>
      </div>
    </div>
  )
}