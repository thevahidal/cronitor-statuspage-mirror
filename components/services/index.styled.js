import styled from 'styled-components'
import { Card } from 'react-bootstrap'

export const Service = styled.div`
    background-color: ${p => p.theme.colors.card.body};
    ${p => !p.noBorder && `border-bottom: 1px solid #ccc;`}
    padding: 1rem 2rem;

    &:last-child {
        border: none;
    }
`


export const StyledCardBody = styled(Card.Body)`
  padding: 0;
  border-radius: ${p => p.theme.sizes.card.radius}px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;

  overflow: hidden;
`

export const Pings = styled.div`
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
  font-size: 0;
`


export const Ping = styled.span`
  background-color: ${p => p.status === 'ok' ? p.theme.colors.green : p.theme.colors.red};
  margin-right: 3px;
  display: inline-flex;
  height: 40px;
  border-radius: 5px;
  padding: 0 1px;
  width: 100%;
`

export const Circle = styled.div`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  background-color: ${p => p.up ? p.theme.colors.green : p.theme.colors.red};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`