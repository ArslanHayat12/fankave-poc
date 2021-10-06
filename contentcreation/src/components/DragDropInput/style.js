import { darken } from "polished"
import styled from "styled-components"

export const TargetBoxStyled = styled.div`
    width: 100%;
    height: 150px;
    background: #fff;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #b1b1b1;
    position: relative;
    cursor: pointer;

    .fk-drag-area {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: ${darken(0.1, "#fff")};
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .fk-file-upload {
        display: none;
    }
`