import { BodyText } from '@atoms/BodyText'
import { ContentBlock } from '@atoms/ContentBlock'
import { PageHeading } from '@atoms/PageHeading'
import { renderHead } from '@helpers/renderUtils'
import { TournamentBanner } from '@styledPages/TournamentInfo.styled'

const TournamentInfo = () => {
  return (
    <>
      {renderHead('Tournament Information', 'Important information about how the Pure PK Tournaments work.')}
      <ContentBlock>
        <PageHeading>Tournament Info</PageHeading>
        <TournamentBanner src='/img/banners/pk-tourney-banner.png' alt='Pure PK Tournament' />
        <BodyText variant='body' mobileTextAlign='left'>
          So, you think you have what it takes to become a tournament champion? Well, in order to get there, you need to
          learn the ropes! This page details the format of the <strong>Pure PK Tourney</strong> events hosted by me,
          Beast Fable (aka <em>V A H O V A</em>). It may not reflect the rules of other events that are player-hosted.
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          Below, I will go into detail on the format, or basic information / structure, of the pure PK tourneys, which
          usually never changes. This is important to understand if you have not participated in one of these events
          before. For information on tourney rules and prizes, which can change for each tournament, check the news post
          for the tournament.
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          <strong>Pure PK Tournament Format</strong>
        </BodyText>
        <TournamentBanner src='/img/banners/pk-tourney-banner-2.png' alt='Tournament Format' topMargin={20} />
        <BodyText variant='body' mobileTextAlign='left'>
          Each match will be picked randomly, and will consist of 2 rounds. The first round is not a deathmatch and
          either player can bank & resupply to initiate a Round 2. The 2nd round is a deathmatch, and whoever wins moves
          on in the tournament. Usually players use higher level food like swordfish in these deathmatches. Running out
          of wild during the 2nd round is considered a forfeit. When a player wins the match, they should exit
          wilderness and stay with the other players that are on the edge of wild until their next fight.
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          Players who win matches stay alive and get to fight others, leading up to the semi-finals (final 4), and then
          a final match. When the final match is over, the winner of this match wins 1st place and the loser, 2nd place.
          In addition to the 1st place prize, the winner will receive the <strong>Tournament Champion</strong> Discord
          role until the next tournament. Players that lost in the semi-finals will compete in a loser&apos;s bracket
          for 3rd place. (If there are 4 participants, the semi-finals are the first few fights.)
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          <strong>Semi Final Rules</strong>
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          <em>
            You don&apos;t really need to read this section, the host (V A H O V A) will ensure that the tournament is
            conducted correctly, but you may be interested.
          </em>
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          The semi-finals begin when the initial, randomly-picked fights have been decided. How many of these there are
          depends on the number of participants. For example, for 7 participants at the start of the tourney, there
          would be 3 fights before the semi-finals start, as we can only pick up to 3 truly-random fights. Once those
          initial fights are done, if there is an even number of players left (i.e. 4 or 6), the semi-final matchups are
          picked randomly using a randomizer. However, if there is an odd number of players left, how the semi-finals
          are handled depends on the number left.
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          <em>3-Way Semi-Final</em>
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          If there are 3 players in the semi-finals, then there will be fights between each of the three possible pairs.
          For example, if players <strong>A</strong>, <strong>B</strong> and <strong>C</strong> are left, there will be
          3 matches in the semi-finals: <strong>A</strong> vs <strong>B</strong>, <strong>B</strong> vs{' '}
          <strong>C</strong>, and <strong>A</strong> vs <strong>C</strong>. If a player wins their two matches (2-0),
          they win the tournament and 1st place. If all 3 players go 1-1, then all fights will need to be done again
          (1-round deathmatches this time) until there is a different result.
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          <em>5-Way Semi-Final</em>
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          If there are 5 players in the semis, we will use a 5 Player Single Elimination strategy (also known as 5 Team
          Single Elim). With this strategy, 3 out of the 5 players will be awarded byes randomly (they will not fight
          yet). The remaining 2 will fight to stay alive. Then, there will be 4 players left, and the next two fights
          will be picked randomly. Finally, there will be 2 players left that will fight for 1st place.
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          <strong>Loser&apos;s Bracket & Castle Events</strong>
        </BodyText>
        <TournamentBanner src='/img/banners/pk-tourney-banner-3.png' alt='Castle Events' topMargin={20} />
        <BodyText variant='body' mobileTextAlign='left'>
          After the final match of the tournament has been decided, all players that lost in the tournament will face
          off against each other to battle for 3rd place. This is known as the Loser&apos;s Bracket. Similarly to the
          Semi-Final rules, these matches will either be obvious (i.e. 2 players remaining), randomly picked (if an even
          amount of players are remaining), or will be decided via the 3 or 5 way semi final rules above.
        </BodyText>
        <BodyText variant='body' mobileTextAlign='left'>
          When the loser&apos;s bracket has concluded, prizes will be given out. After this, there is usually an FFA or
          Team Fight at Castle between all the participants. Usually this is just for fun, but sometimes there will be a
          prize given out to the winner(s). The winner(s) will be given the <strong>Castle King</strong> Discord role as
          a reward, until the next tournament.
        </BodyText>
      </ContentBlock>
    </>
  )
}

export default TournamentInfo
