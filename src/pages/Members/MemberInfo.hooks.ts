import {useLocation} from 'react-router'

import {useASelector} from '../../utils/recipies.util'

const useMemberInfo = () => {
  const {state} = useLocation<{memberId: string}>()
  const memberId = state?.memberId ?? null
  const member = useASelector(state => state.member.members[memberId], [memberId])

  return {member}
}

export const MemberInfoHooks = {useMemberInfo}
