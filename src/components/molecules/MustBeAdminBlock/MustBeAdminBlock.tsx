import { BodyText } from '@atoms/BodyText'
import { sharedStyles } from '@consts/styles/shared'
import { PageHeading } from '@atoms/PageHeading'

const MustBeAdminBlock = () => (
  <div className={sharedStyles.defaultContainer}>
    <PageHeading>Nice Try</PageHeading>
    <BodyText bodyTextAlign='center'>You must be an administrator to perform that action.</BodyText>
  </div>
)

export default MustBeAdminBlock
