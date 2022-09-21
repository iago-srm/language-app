import styled from 'styled-components';

export const EditableOptionContainer = styled.div`
display: flex;
p {
    margin: 0;
    padding: 2px 5px;
    line-height: 30px;
    width: 90%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
button {
    font-size: 1.2rem;
    padding: 3px;
}
`;

// export const 