import type { DefaultTheme } from 'vitepress'

export interface CoreTeam extends Partial<DefaultTheme.TeamMember> {
  avatar: string
  name: string
  // required to download avatars from GitHub
  github: string
  twitter: string
  webtools?: string
  discord?: string
  youtube?: string
  sponsor?: string
  title?: string
  org?: string
  desc?: string
}

function createLinks(tm: CoreTeam): CoreTeam {
  tm.links = [{ icon: 'github', link: `https://github.com/${tm.github}` }]
  if (tm.webtools)
    tm.links.push({ icon: 'mastodon', link: `https://elk.zone/m.webtoo.ls/@${tm.webtools}` })

  if (tm.discord)
    tm.links.push({ icon: 'discord', link: tm.discord })

  if (tm.youtube)
    tm.links.push({ icon: 'youtube', link: `https://www.youtube.com/@${tm.youtube}` })

  tm.links.push({ icon: 'twitter', link: `https://twitter.com/${tm.twitter}` })

  return tm
}

const plainTeamMembers = [
  {
    avatar: '/team-avatars/antfu.png',
    name: 'Anthony Fu',
    github: 'antfu',
    webtools: 'antfu',
    youtube: 'antfu',
    discord: 'https://chat.antfu.me',
    twitter: 'antfu7',
    sponsor: 'https://github.com/sponsors/antfu',
    title: 'A fanatical open sourceror, working',
    org: 'NuxtLabs',
    orgLink: 'https://nuxtlabs.com/',
    desc: 'Core team member of Vite & Vue',
  },
  {
    avatar: '/team-avatars/userquin.png',
    name: 'Joaquín Sánchez',
    github: 'userquin',
    webtools: 'userquin',
    twitter: 'userquin',
    title: 'A fullstack and android developer',
    desc: 'Vite\'s fanatical follower',
  },
  {
    avatar: '/team-avatars/hannoeru.png',
    name: 'ハン / Han',
    github: 'hannoeru',
    twitter: 'hannoeru',
    title: 'Student / Front-End Engineer',
    desc: '@windi_css member',
  },
]

const teamMembers = plainTeamMembers.map(tm => createLinks(tm))

export { teamMembers }
