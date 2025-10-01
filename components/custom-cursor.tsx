"use client"

import { useEffect, useState } from "react"

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [trail, setTrail] = useState<Array<{ x: number; y: number; id: number }>>([])
  const trailIdRef = { current: 0 }

  useEffect(() => {
    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })

      setTrail((prevTrail) => {
        const newTrail = [{ x: e.clientX, y: e.clientY, id: trailIdRef.current++ }, ...prevTrail].slice(0, 5)
        return newTrail
      })

      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") !== null ||
        target.closest("a") !== null

      setIsPointer(isInteractive)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    window.addEventListener("mousemove", updateCursor)
    document.body.addEventListener("mouseenter", handleMouseEnter)
    document.body.addEventListener("mouseleave", handleMouseLeave)

    return () => {
      window.removeEventListener("mousemove", updateCursor)
      document.body.removeEventListener("mouseenter", handleMouseEnter)
      document.body.removeEventListener("mouseleave", handleMouseLeave)
    }
  }, [])

  return (
    <>
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="custom-cursor-trail-dot"
          style={{
            left: `${point.x}px`,
            top: `${point.y}px`,
            opacity: isVisible ? (1 - index / 5) * 0.6 : 0,
            transform: `translate(-50%, -50%) scale(${1 - index / 5})`,
          }}
        />
      ))}

      <div
        className="custom-cursor-dot"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.5 : 1})`,
          opacity: isVisible ? 1 : 0,
        }}
      />

      <div
        className="custom-cursor-ring"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isPointer ? 1.8 : 1})`,
          opacity: isVisible ? 0.5 : 0,
        }}
      />
    </>
  )
}
