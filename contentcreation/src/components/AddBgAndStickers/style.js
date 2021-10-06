import { lighten } from "polished";
import styled from "styled-components";

export const AddBgAndStickersStyled = styled.div`
    .fk-tabs-wrapper {
        display: flex;
        justify-content: center;
        grid-gap: 15px;
        padding: 15px 20px;

        .fk-tab {
            padding: 12px 15px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.85);
            cursor: pointer;

            &.fk-active {
                color: #1890ff;
                border-bottom: 1px solid #1890ff;
            }
        }
    }
`