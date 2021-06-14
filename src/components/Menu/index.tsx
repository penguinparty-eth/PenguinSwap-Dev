import React, { useRef } from 'react'
import styled from 'styled-components'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'
import { ExternalLink } from '../../theme'
// We now use a Penguin Party URLS array.
import { PENGUIN_URLS } from '../../constants/index'

const StyledMenuButton = styled.button`
  font-weight: 500;
  font-size: 0.9rem;
  width: 6rem;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  color: ${({ theme }) => theme.text1};
  background-color: ${({ theme }) => theme.bg3};
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
`

const StyledMenu = styled.div`
  margin-left: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 8.125rem;
  background-color: ${({ theme }) => theme.bg3};
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  font-size: 0.75rem;
  position: absolute;
  top: 4rem;
  right: 0rem;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    top: -17.25rem;
  `};
`

const MenuItem = styled(ExternalLink)`
  flex: 1;
  padding: 0.25rem 0.25rem;
  color: ${({ theme }) => theme.text2};
  border: 1px solid transparent;
  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
    border: 1px solid ${({ theme }) => theme.primary2}; /* color was gold, trying primary2 instead */
  }
  > svg {
    margin-right: 8px;
  }
`
// Removed the emoij, fixed the URLS by importing a constants/index.ts file with the URLS in it.
// TODO
// - Increase FONT size
// - Increate MENU font size
// - Change button style to match the other buttons
export default function Menu() {
  const node = useRef<HTMLDivElement>()
  const open = useModalOpen(ApplicationModal.MENU)
  const toggle = useToggleModal(ApplicationModal.MENU)
  useOnClickOutside(node, open ? toggle : undefined)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <StyledMenuButton onClick={toggle}>Menu</StyledMenuButton>

      {open && (
        <MenuFlyout>
          <MenuItem id="link" href={PENGUIN_URLS.home}>
            Home Page
          </MenuItem>{' '}
          <MenuItem id="link" href={PENGUIN_URLS.medium}>
            News
          </MenuItem>
          <MenuItem id="link" href={PENGUIN_URLS.github}>
            GitHub
          </MenuItem>
          <MenuItem id="link" href={PENGUIN_URLS.github}>
            Discord
          </MenuItem>
          <MenuItem id="link" href={PENGUIN_URLS.treasury}>
            Treasury
          </MenuItem>
          <MenuItem id="link" href={PENGUIN_URLS.voting}>
            Voting
          </MenuItem>
          <MenuItem id="link" href={PENGUIN_URLS.analytics}>
            Analytics
          </MenuItem>
          <MenuItem id="link" href={PENGUIN_URLS.saren}>
            Saren Protocol
          </MenuItem>
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
