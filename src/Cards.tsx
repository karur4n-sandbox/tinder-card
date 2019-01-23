import React, { RefObject } from "react";
import styled from "styled-components";
import { Card, CardComponent } from "./Card";
import { render } from "react-dom";

interface Props {
  cards: Card[];
  onSwipeLeftEdge: (card: Card) => void;
  onSwipeRightEdge: (card: Card) => void;
}

interface State {
  containerWidth?: number;
}

export class Cards extends React.Component<Props, State> {
  private containerRef: RefObject<HTMLDivElement>;

  constructor(props: Props) {
    super(props);

    this.state = {
      containerWidth: undefined
    };

    this.containerRef = React.createRef();
  }

  componentDidMount() {
    const el = this.containerRef.current;

    console.log("el", el);

    if (el != null) {
      this.setState({
        containerWidth: el.clientWidth
      });
    }
  }

  render() {
    const { cards, onSwipeLeftEdge, onSwipeRightEdge } = this.props;
    const { containerWidth } = this.state;

    return (
      <Container ref={this.containerRef}>
        {containerWidth
          ? cards.map(card => (
              <CardContainer key={card.id}>
                <CardComponent
                  card={card}
                  onSwipeLeftEdge={onSwipeLeftEdge}
                  onSwipeRightEdge={onSwipeRightEdge}
                  containerWidth={containerWidth}
                />
              </CardContainer>
            ))
          : null}
      </Container>
    );
  }
}

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CardContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;
