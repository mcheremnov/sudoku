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
  useEffect(() => {
    const fetchBoard = async () => {
      const board = {
        "newboard": {
          "grids": [
            {
              "value": [
                [2, 5, 0, 0, 7, 3, 0, 0, 0],
                [0, 1, 9, 0, 0, 0, 0, 0, 0],
                [7, 0, 0, 0, 0, 0, 2, 0, 0],
                [0, 6, 5, 2, 0, 0, 0, 0, 8],
                [3, 9, 0, 0, 5, 0, 1, 0, 0],
                [4, 2, 0, 0, 0, 0, 0, 0, 0],
                [9, 0, 1, 0, 0, 5, 0, 0, 2],
                [0, 7, 0, 0, 1, 0, 0, 0, 6],
                [6, 0, 4, 0, 0, 0, 0, 8, 0]
              ],
              "solution": [
                [2, 5, 6, 1, 7, 3, 8, 4, 9],
                [8, 1, 9, 5, 2, 4, 7, 6, 3],
                [7, 4, 3, 6, 8, 9, 2, 1, 5],
                [1, 6, 5, 2, 4, 7, 3, 9, 8],
                [3, 9, 7, 8, 5, 6, 1, 2, 4],
                [4, 2, 8, 9, 3, 1, 6, 5, 7],
                [9, 8, 1, 3, 6, 5, 4, 7, 2],
                [5, 7, 2, 4, 1, 8, 9, 3, 6],
                [6, 3, 4, 7, 9, 2, 5, 8, 1]
              ],
              "difficulty": "Medium"
            }
          ],
          "results": 1,
          "message": "All Ok"
        }
      } as ResponseJSON
      setPuzzle(board.newboard.grids[0].value)
      setSolution(board.newboard.grids[0].solution)
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
          return false
        }
      }
    }
    return true
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
            onClick={() => setShowSolution(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-4 rounded"
          >
            Reveal Solution
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