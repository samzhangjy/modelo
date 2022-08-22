import {
  Button,
  Code,
  Modal,
  Spacer,
  Text,
  useModal,
  useToasts,
} from '@geist-ui/core'
import { Edit3, Trash } from '@geist-ui/icons'
import { useRouter } from 'next/router'
import useSnippts from '../hooks/useSnippts'
import { GetSnipptResponse } from '../pages/api/snippts/[id]'

const SnipptActions = ({ snippt }: { snippt?: GetSnipptResponse }) => {
  const snippts = useSnippts()
  const toasts = useToasts()
  const router = useRouter()
  const {
    visible: confirmModalVisible,
    setVisible: setConfirmModalVisible,
    bindings: confirmModalBindings,
  } = useModal()

  const handleDelete = async () => {
    const response = await snippts.delete(snippt?.data?.id as number)
    if (response.status !== 'success') {
      toasts.setToast({
        text: response.msg,
        type: 'error',
      })
      return
    }
    toasts.setToast({
      text: `Deleted snippt ${snippt?.data?.name}.`,
      type: 'success',
    })
    router.push('/')
  }
  return (
    <>
      <Modal {...confirmModalBindings}>
        <Modal.Title>Confirm</Modal.Title>
        <Modal.Subtitle>Delete confirmation</Modal.Subtitle>
        <Modal.Content>
          <Text>
            Do you really want to delete snippt{' '}
            <Code>{snippt?.data?.name}</Code>?
          </Text>
          <Text b>This action is irreversible!</Text>
        </Modal.Content>
        <Modal.Action passive onClick={() => setConfirmModalVisible(false)}>
          Cancel
        </Modal.Action>
        <Modal.Action type="error" onClick={handleDelete}>
          Delete
        </Modal.Action>
      </Modal>
      <Button
        type="success"
        auto
        scale={0.5}
        ghost
        icon={<Edit3 />}
        onClick={() => router.push(`/snippts/edit?id=${snippt?.data?.id}`)}
      >
        Edit
      </Button>
      <Spacer w={0.5} inline />
      <Button
        type="error"
        auto
        scale={0.5}
        ghost
        icon={<Trash />}
        onClick={() => setConfirmModalVisible(!confirmModalVisible)}
      >
        Delete
      </Button>
      <Spacer h={1.5} />
    </>
  )
}

export default SnipptActions
