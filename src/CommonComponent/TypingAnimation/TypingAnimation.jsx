import React, { useEffect, useRef, useState } from 'react'
import './TypingAnimation.css'

const phrases = [
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium maxime deserunt cum accusamus eaque obcaecati expedita minus veritatis, recusandae eum accusantium provident aperiam vero incidunt enim. Soluta enim deleniti suscipit nobis reprehenderit nam voluptatum. Ad nisi vel inventore commodi, laudantium hic? Neque consectetur corrupti sapiente nihil magni enim, accusamus, ex minus quaerat ducimus harum atque earum labore inventore ea quo assumenda autem aut ad quisquam nisi qui ab. Nihil accusamus quibusdam sint animi delectus ipsum quas quia ratione quos repellat. Culpa fugit eum eos consequuntur accusantium recusandae voluptas nulla fuga, tenetur cum officiis, temporibus, odit nam veritatis modi praesentium? Provident."
]

const TypingAnimation = () => {
  const [displayText, setDisplayText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [phraseIndex, setPhraseIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const timeoutRef = useRef(null)

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex]

    if (!isDeleting) {
      // Typing forward
      if (charIndex < currentPhrase.length) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex + 1))
          setCharIndex((prev) => prev + 1)
        }, 90)
      } else {
        // Pause at end before deleting
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true)
        }, 1400)
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        timeoutRef.current = setTimeout(() => {
          setDisplayText(currentPhrase.slice(0, charIndex - 1))
          setCharIndex((prev) => prev - 1)
        }, 45)
      } else {
        // Move to next phrase
        setIsDeleting(false)
        setPhraseIndex((prev) => (prev + 1) % phrases.length)
      }
    }

    return () => clearTimeout(timeoutRef.current)
  }, [charIndex, isDeleting, phraseIndex])

  return (
    <div className="typing-wrapper">
      <div className="typing-container">
        <span className="typed-text">{displayText}</span>
        <span className="cursor" />
      </div>
    </div>
  )
}

export default TypingAnimation