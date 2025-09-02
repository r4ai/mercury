"use client"

import { useState } from "react"
import { Button } from "./ui/button"

export const Counter = () => {
  const [count, setCount] = useState(0)

  const handleIncrement = () => setCount((c) => c + 1)

  return (
    <section className="border-blue-400 -mx-4 mt-4 rounded-sm border border-dashed p-4 space-y-4">
      <div>Count: {count}</div>
      <Button variant="outline" onClick={handleIncrement}>
        Increment
      </Button>
    </section>
  )
}
