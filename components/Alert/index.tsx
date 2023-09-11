import { Dialog, Alert, AlertTitle } from '@mui/material'
import { Text } from '../Text'

type AlertProps = {
  message: string
  isOpen: boolean
  onClose: () => void
  title?: string
  type?: string
}

export const AlertComponent: React.FC<AlertProps> = ({
  message,
  isOpen,
  onClose,
  title = 'Erro',
  type = 'warning',
}) => {
  if (!isOpen) {
    return null
  }

  return (
    <Dialog
      onClose={() => {
        onClose()
      }}
      open={isOpen}
    >
      <Alert
        variant="outlined"
        severity={type}
        onClose={() => {
          onClose()
        }}
      >
        {message}
      </Alert>
    </Dialog>
  )
}
