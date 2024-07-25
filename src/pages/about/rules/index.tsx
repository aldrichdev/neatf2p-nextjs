import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { Callout } from '@atoms/Callout'
import { RuleListItem } from '@styledPages/Rules.styled'
import { BodyText } from '@atoms/BodyText'
import { renderHead } from '@helpers/renderUtils'

const RulesPage = () => (
  <>
    {renderHead('Rules')}
    <ContentBlock>
      <PageHeading>Rules</PageHeading>
      <BodyText variant='body' fontFamily='Source Sans Pro' marginBottom='20px'>
        Please read these rules carefully. Note that they apply both to the game server and our Discord.
      </BodyText>
      <ol>
        <RuleListItem>
          <strong>Be respectful.</strong> No mean, rude, or harassing comments. Treat others the way you want to be
          treated.
        </RuleListItem>
        <RuleListItem>
          <strong>No offensive names, profile pictures, language or behavior. </strong>
          Use of profanity should be kept to a reasonable minimum. Any derogatory language towards any user is
          prohibited.
        </RuleListItem>
        <RuleListItem>
          <strong>Please speak English in public channels.</strong>
        </RuleListItem>
        <RuleListItem>
          <strong>No spamming. </strong>
          Do not send a lot of small messages right after each other. These disrupt chat and make it hard to scroll
          through the server.
        </RuleListItem>
        <RuleListItem>
          <strong>No drama regarding other private servers. </strong>
          It makes for uncomfortable conversations that other community members have to read, and has nothing to do with
          this server.
        </RuleListItem>
        <RuleListItem>
          <strong>No advertisements. </strong>
          No invasive advertising, whether it be for other communities or streams. You can post your content in the
          media channels if it&apos;s relevant and provides actual value for the community.
        </RuleListItem>
        <RuleListItem>
          <strong>No botting or autoing. </strong>
          This is a legit-only RSC server. Botting or cheating clients and methods are not allowed. This includes
          botting, auto-clickers and auto-logging. When evidence is found of botting <em>or</em> autoing, all of your
          accounts will be permanently banned and you will be permanently banned from the community.
        </RuleListItem>
        <RuleListItem>
          <strong>No exploiting bugs. </strong>
          If you find a bug, report it. Do not exploit it for your own personal gain.
        </RuleListItem>
        <RuleListItem>
          <strong>You can only have 2 accounts logged in at the same time. </strong>
          Having more than two logged in (via a VPN or any other method) is considered cheating.
        </RuleListItem>
        <RuleListItem>
          <strong>No account OR account name trading. </strong>
          Trading game accounts or game account names with other users for anything (in-game money, real money, etc.) is
          not allowed. This will be punishable by mute, temp ban, or more serious measures if needed.
        </RuleListItem>
      </ol>
      <Callout variant='warning'>
        <strong>In general, use common sense and don&apos;t be a douche!</strong>
      </Callout>
    </ContentBlock>
  </>
)

export default RulesPage
