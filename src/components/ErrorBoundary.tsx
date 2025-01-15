/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback: (msg: string) => ReactNode
}

class ErrorBoundary extends Component<Props> {
  state = {
    hasError: false,
    message: '',
  }

  constructor(props: any) {
    super(props)
  }

  static getDerivedStateFromError = (error: any) => ({
    hasError: true,
    message: error.message,
  })

  // componentDidCatch(error: any, errorInfo: any) {
  //   console.log(error, errorInfo)
  // }

  render = () => {
    if (this.state.hasError) return this.props.fallback(this.state.message)

    // eslint-disable-next-line
    // @ts-ignore
    return this.props.children
  }
}

export default ErrorBoundary
