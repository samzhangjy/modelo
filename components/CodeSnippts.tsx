import { Grid } from '@geist-ui/core'
import { CodeSnippt as CodeSnipptModel } from '@prisma/client'
import CodeSnippt from './CodeSnippt'

const CodeSnippts = ({ snippts }: { snippts: CodeSnipptModel[] }) => {
  return (
    <Grid.Container gap={3}>
      {snippts.map((snippts, index) => (
        <Grid xs={24} md={12} lg={8} key={index}>
          <CodeSnippt data={snippts} />
        </Grid>
      ))}
    </Grid.Container>
  )
}

export default CodeSnippts
