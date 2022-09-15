import { ContainerStyled } from './styles';

export const InputIcon = ({ onClick, icon }) => {
    return (
      <ContainerStyled onClick={onClick}>
        <i>{icon}</i>
      </ContainerStyled>
    )
}