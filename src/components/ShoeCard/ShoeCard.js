import React from "react";
import styled from "styled-components/macro";

import { COLORS, WEIGHTS } from "../../constants";
import { formatPrice, pluralize, isNewShoe } from "../../utils";
import Spacer from "../Spacer";

const ShoeCard = ({
  slug,
  name,
  imageSrc,
  price,
  salePrice,
  releaseDate,
  numOfColors,
}) => {
  // There are 3 variants possible, based on the props:
  //   - new-release
  //   - on-sale
  //   - default
  //
  // Any shoe released in the last month will be considered
  // `new-release`. Any shoe with a `salePrice` will be
  // on-sale. In theory, it is possible for a shoe to be
  // both on-sale and new-release, but in this case, `on-sale`
  // will triumph and be the variant used.
  // prettier-ignore
  const variant = typeof salePrice === 'number'
    ? 'on-sale'
    : isNewShoe(releaseDate)
      ? 'new-release'
      : 'default'

  const styles = {
    "on-sale": {
      "--priceColor": COLORS.gray[700],
      "--textDecoration": "line-through",
      "--flagColor": COLORS.primary,
    },
    "new-release": {
      "--flagColor": COLORS.secondary,
    },
  };

  return (
    <Link href={`/shoe/${slug}`}>
      <Wrapper>
        <ImageWrapper>
          <Image alt="" src={imageSrc} />
          {variant !== "default" ? (
            <Flag style={styles[variant]}>
              {variant === "on-sale" ? "Sale" : "Just Released"}
            </Flag>
          ) : null}
        </ImageWrapper>
        <Spacer size={12} />
        <Row>
          <Name>{name}</Name>
          <Price style={styles[variant]}>{formatPrice(price)}</Price>
        </Row>
        <Row>
          <ColorInfo>{pluralize("Color", numOfColors)}</ColorInfo>
          {variant === "on-sale" ? (
            <SalePrice>{formatPrice(salePrice)}</SalePrice>
          ) : null}
        </Row>
      </Wrapper>
    </Link>
  );
};

const Link = styled.a`
  text-decoration: none;
  color: inherit;
`;

const Wrapper = styled.article``;

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  border-radius: 16px 16px 4px 4px;
`;

const Row = styled.div`
  font-size: 1rem;
  display: flex;
  justify-content: space-between;
`;

const Name = styled.h3`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.gray[900]};
`;

const Price = styled.span`
  color: var(--priceColor);
  text-decoration: var(--textDecoration);
  text-decoration-thickness: 10%;
`;

const ColorInfo = styled.p`
  color: ${COLORS.gray[700]};
`;

const SalePrice = styled.span`
  font-weight: ${WEIGHTS.medium};
  color: ${COLORS.primary};
`;

const Flag = styled.div`
  position: absolute;
  top: 12px;
  right: -4px;
  height: 32px;
  line-height: 32px;
  padding: 0px 10px;
  border-radius: 2px;
  background-color: var(--flagColor);
  color: white;
  font-weight: 700;
`;

export default ShoeCard;
