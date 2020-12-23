import {modalController, pickerController} from '@ionic/core'
import {useCallback, useEffect, useState} from 'react'
import {useHistory} from 'react-router'

import {useClubAction, useMemberAction} from '../../hooks/useAction.hook'
import {ClubTypesEnum} from '../../redux/club.interface'
import {useASelector} from '../../utils/recipies.util'

const useMemberFilter = () => {
  const close = useCallback(() => modalController.dismiss(null, undefined, 'rc-filter-modal'), [])
  const filterBy = useMemberAction('fiterBy')
  const clear = useMemberAction('clearFilter')
  const [selected, setSelected] = useState<TFilterSelected>({
    club: [],
    type: null,
    range: {lower: 18, upper: 50},
    ageEnabled: false,
  })
  const clubs = useClubs()

  const onSelect = (key: keyof TFilterSelected) => (e: CustomEvent<any>) => {
    switch (key) {
      case 'ageEnabled':
        setSelected({...selected, [key]: e.detail.checked})
        break
      default:
        setSelected({...selected, [key]: e.detail.value})
    }
  }

  const remove = useCallback(
    (id: string) => () => setSelected({...selected, club: selected.club.filter(x => x !== id)}),
    [selected],
  )

  const onClear = useCallback(() => {
    clear()
    close()
  }, [])

  const openPicker = useCallback(async () => {
    const picker = await createPicker((value: THandlerValue) => setSelected({...selected, type: value.type.value}))
    await picker.present()
  }, [selected])

  const onFilter = () => {
    filterBy(selected)
    close()
  }

  return {close, clubs, onSelect, selected, remove, openPicker, onFilter, onClear}
}

export const MemberFilterHooks = {useMemberFilter}
export type TFilterSelected = {
  club: string[]
  type: ClubTypesEnum | null
  range: {lower: number; upper: number}
  ageEnabled: boolean
}
type THandlerValue = {type: {columnIndex: number; text: string; value: ClubTypesEnum}}

const createPicker = (handler: (value: THandlerValue) => void) =>
  pickerController.create({
    buttons: [
      {text: 'Cancelar', role: 'cancel'},
      {text: 'Confirmar', handler},
    ],
    columns: [
      {
        name: 'type',
        options: [
          {text: 'Rotarac', value: ClubTypesEnum.Rotaract},
          {text: 'Rotary', value: ClubTypesEnum.Rotary},
        ],
      },
    ],
  })

const useClubs = () => {
  const action = useClubAction('get')
  const keys = useASelector(state => state.club.keys)
  const clubs = useASelector(state => state.club.clubs)

  useEffect(() => {
    action()
  }, [])

  return {keys, clubs}
}
