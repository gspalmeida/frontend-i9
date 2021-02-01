import React, { FormEvent } from "react";
import { Link } from "react-router-dom";

import { Wrapper, Container, Title, Subtitle, Button } from "./styles";

interface CardFormProps {
  title: string;
  subtitle?: string;
  subtitleLink?: string;
  subtitleLinkHref?: string;
  buttonTitle: string;
  onSubmit: (e: FormEvent) => void;
}

const CardForm: React.FC<CardFormProps> = ({
  title,
  subtitle,
  subtitleLink,
  buttonTitle,
  subtitleLinkHref,
  onSubmit,
  children: inputs,
}) => {
  return (
    <Wrapper onSubmit={onSubmit}>
      <Container>
        <Title>{title}</Title>
        {subtitle && subtitleLink && subtitleLinkHref && (
          <Subtitle>
            {subtitle} <Link to={subtitleLinkHref}>{subtitleLink}</Link>
          </Subtitle>
        )}

        {inputs}

        <Button>{buttonTitle}</Button>
      </Container>
    </Wrapper>
  );
};

export default CardForm;
