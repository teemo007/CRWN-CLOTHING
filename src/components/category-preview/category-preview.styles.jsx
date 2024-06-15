import styled from "styled-components";
import { Link } from "react-router-dom";

const breakpointTabet =
  "600px"; /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
const breakpointPortraitTabet =
  "801px"; /* tablet, landscape iPad, lo-res laptops ands desktops */
const breakpointHiRes = "1281px"; /* hi-res laptops and desktops  */

export const CategoryPreviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;
export const Title = styled(Link)`
  font-size: 28px;
  margin-bottom: 25px;
  cursor: pointer;
`;

export const Preview = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 10px;
  row-gap: 50px;
  transition: all 1s ease;
  transition-duration: 1s;
  transition-delay: 2s;

  @media (min-width: ${breakpointTabet}) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: ${breakpointPortraitTabet}) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: ${breakpointHiRes}) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
