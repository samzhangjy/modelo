import { Grid, Text } from '@geist-ui/core'
import { CodeSnippt as CodeSnipptModel } from '@prisma/client'
import Snippt from './Snippt'

const Snippts = ({ snippts }: { snippts: CodeSnipptModel[] }) => {
  return (
    <>
      {snippts.length ? (
        <Grid.Container gap={3}>
          {snippts.map((snippts, index) => (
            <Grid xs={24} md={12} lg={8} key={index}>
              <Snippt data={snippts} />
            </Grid>
          ))}
        </Grid.Container>
      ) : (
        <Text>No snippts found.</Text>
      )}
    </>
  )
}

export default Snippts
