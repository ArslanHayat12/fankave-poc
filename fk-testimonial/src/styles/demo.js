import styled from 'styled-components'
import { LayoutStyled } from './default'

export const demoStyled = styled.section`
  ${LayoutStyled}
  .fk-header {
    background: ${({ theme }) => theme?.brand?.pallete?.secondary || 'white'};
    .fk-heading {
      color: ${({ theme }) => theme?.brand?.pallete?.text || 'black'};
    }
  }
  .fk-widget-container {
    .fk-widget-wrapper {
      background: ${({ theme }) => theme?.brand?.pallete?.secondary || 'white'};
      border: none;
    }
  }
  .fk-footer {
    background: ${({ theme }) => theme?.brand?.pallete?.secondary || 'white'};
    .fk-heading {
      color: ${({ theme }) => theme?.brand?.pallete?.text || 'black'};
    }
  }
`
