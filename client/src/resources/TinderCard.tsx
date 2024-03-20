import { RefObject } from 'react'
import type TinderCard from 'react-tinder-card'

type ExtractGenericFromRefObject<TRefObject> =
  TRefObject extends RefObject<infer U> ? U : never

type TinderCardProps = Parameters<typeof TinderCard>[0]
export type API = ExtractGenericFromRefObject<TinderCardProps['ref']>

export type Direction = 'left' | 'right' | 'up' | 'down'