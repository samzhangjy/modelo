import withJoi from 'next-joi'

export default withJoi({
  onValidationError: (_req, res, error) => {
    res.status(400).json({
      msg: `Invalid input: ${error.details[0].message}`,
      status: 'error',
    })
  },
})
