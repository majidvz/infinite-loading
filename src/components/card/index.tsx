import { FC } from "react";
import { Flex } from "antd";
import { CardWrapper } from "./styles";

interface ICardProps {
  imageURL: string;
  title: string;
  description: string;
  price: number;
}

export const Card: FC<ICardProps> = ({
  imageURL,
  title,
  description,
  price,
}) => {
  return (
    <CardWrapper vertical justify="flex-start" align="center">
      <img className="cover" src={imageURL} alt={title} />
      <Flex
        gap={8}
        justify="flex-start"
        vertical
        align="center"
        className="body"
      >
        <h3 className="title popping-bold">{title}</h3>
        <span className="price">{price}</span>
        <p className="description">{description}</p>
      </Flex>
    </CardWrapper>
  );
};
