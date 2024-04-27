import { ReactNode } from 'react'

const ErrorMessage = ({children}: {children: ReactNode}) => {
  return (
    <>
      {children}
    </>
  )
}

export default ErrorMessage
