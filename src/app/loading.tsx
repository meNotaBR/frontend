"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

export default function TypingLogoAnimation() {
  const [text, setText] = useState("")
  const fullText = "meNota"
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => clearInterval(blinkInterval)
  }, [])

  useEffect(() => {
    if (isPaused) return

    let timeout

    if (isTyping) {
      if (text.length < fullText.length) {
        timeout = setTimeout(() => {
          setText((prev) => fullText.substring(0, prev.length + 1))
        }, 200)
      } else {
        setIsPaused(true)
        timeout = setTimeout(() => {
          setIsPaused(false)
          setIsTyping(false)
        }, 1000)
      }
    } else {
      if (text.length > 0) {
        timeout = setTimeout(() => {
          setText((prev) => prev.substring(0, prev.length - 1))
        }, 100)
      } else {
        setIsPaused(true)
        timeout = setTimeout(() => {
          setIsPaused(false)
          setIsTyping(true)
        }, 1000)
      }
    }

    return () => clearTimeout(timeout)
  }, [text, isTyping, isPaused, fullText])

  return (
    <div className="flex items-center justify-center w-full h-screen bg-black">
      <svg width="600" height="200" viewBox="0 0 600 200">
        <defs>
          <style>
            {`
              .logo-text {
                font-family: serif;
                fill: rgb(255, 255, 255);
              }
              .me {
                font-size: 120px;
              }
              .nota {
                font-size: 120px;
              }
              .cursor {
                fill: white;
                font-size: 120px;
              }
            `}
          </style>
        </defs>
        <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle">
          <motion.tspan className="logo-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {text.substring(0, 2).length > 0 ? <tspan className="logo-text me">{text.substring(0, 2)}</tspan> : null}
            {text.substring(2).length > 0 ? <tspan className="logo-text nota">{text.substring(2)}</tspan> : null}
            <tspan
          className={`absolute top-1/2 left-1/2 transform -translate-y-1/2 ${showCursor ? "opacity-100" : "opacity-0"}`}
          style={{
            marginLeft: `${text.length * 30}px`, // Adjust based on your font size
            color: "white",
            fontSize: "120px",
            fontFamily: "serif",
            lineHeight: "0.8",
            transition: "opacity 0.3s",
          }}
        >
          _
        </tspan>
          </motion.tspan>
        </text>
      </svg>
    </div>
  )
}

