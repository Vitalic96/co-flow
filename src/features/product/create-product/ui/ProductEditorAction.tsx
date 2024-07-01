import { Button } from 'shared/ui'
import { useFormContext } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

type Props = {
  productId?: string
}

export const ProductEditorAction = (props: Props) => {
  const { productId } = props

  const methods = useFormContext()
  const navigate = useNavigate()

  const { isDirty } = methods.formState

  const onReset = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    methods.reset()
  }

  const onBack = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    navigate(-1)
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
      {isDirty ? (
        <Button onClick={onReset} border width300>
          Cancel
        </Button>
      ) : (
        <Button onClick={onBack} border width300>
          Back
        </Button>
      )}
      <Button width300>{productId ? 'Save' : 'Create'}</Button>
    </div>
  )
}
