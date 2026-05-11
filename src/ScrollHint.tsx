import { useLottie } from 'lottie-react'
import scrollDownHintAnimation from './scrollDownHint.json'

function ScrollHint() {
  const { View } = useLottie(
    {
      animationData: scrollDownHintAnimation,
      loop: true,
      autoplay: true,
    },
    {
      width: '100%',
      height: '100%',
    },
  )

  return View
}

export default ScrollHint
