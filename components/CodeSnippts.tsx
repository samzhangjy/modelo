import { Grid, Text } from '@geist-ui/core'
import { CodeSnippt as CodeSnipptModel } from '@prisma/client'
import CodeSnippt from './CodeSnippt'

const CodeSnippts = ({ snippts }: { snippts: CodeSnipptModel[] }) => {
  return (
    <>
      {snippts.length ? (
        <Grid.Container gap={3}>
          {snippts.map((snippts, index) => (
            <Grid xs={24} md={12} lg={8} key={index}>
              <CodeSnippt data={snippts} />
            </Grid>
          ))}
        </Grid.Container>
      ) : (
        <Text>No snippts found.</Text>
      )}
    </>
  )
}

export default CodeSnippts
