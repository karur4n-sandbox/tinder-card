import React, { RefObject } from "react";
import Hammer from "hammerjs";
import styled from "styled-components";

export interface Card {
  id: string;
  title: string;
  imageSrc: string;
}

interface Props {
  card: Card;
  containerWidth: number;
  onSwipeRightEdge: (card: Card) => void;
  onSwipeLeftEdge: (card: Card) => void;
}

export class CardComponent extends React.PureComponent<Props, {}> {
  private myRef: RefObject<HTMLDivElement>;
  private initialTransform = {
    translate: {
      x: Math.trunc(Math.random() * 4) - 8,
      y: Math.trunc(Math.random() * 4) - 8
    },
    scale: 1,
    angle: Math.trunc(Math.random() * 4),
    rx: 0,
    ry: 0,
    rz: 0
  };

  private transform = { ...this.initialTransform };
  private opacity = 1;
  private isEnded = false;

  constructor(props: Props) {
    super(props);

    this.myRef = React.createRef();
  }

  componentDidMount() {
    const rootEl = this.myRef.current;

    if (rootEl == null) {
      return undefined;
    }

    const hammeredEl = new Hammer(rootEl);

    hammeredEl.add(new Hammer.Pan({ threshold: 0, pointers: 0 }));
    hammeredEl.on("panstart panmove", this.onPan);
    hammeredEl.on("panend", this.onPanEnd);

    hammeredEl.on("hammer.input", ev => {
      if (ev.isFinal && !this.isEnded) {
        this.resetElementTransform();
      }
    });

    rootEl.style.backgroundColor = "white";
    rootEl.style.boxShadow = "0 1px 3px rgba(100, 100, 100, 0.4)";

    this.resetElementTransform();
  }

  onPan = (ev: HammerInput) => {
    const rootEl = this.myRef.current;

    if (rootEl == null) {
      return undefined;
    }

    rootEl.className = "";

    this.transform.translate = {
      x: ev.deltaX,
      y: ev.deltaY
    };

    this.transform.angle = (ev.deltaX / 400) * 60;
    this.opacity = (400 - Math.abs(ev.deltaX)) / 400;

    // -90 : 0 : -90

    window.requestAnimationFrame(this.updateElementTransform);
  };

  onPanEnd = (ev: HammerInput) => {
    const rootEl = this.myRef.current;

    if (rootEl == null) {
      return undefined;
    }

    if (ev.deltaX > this.props.containerWidth * 0.6) {
      this.opacity = 0;
      rootEl.className = "";

      this.props.onSwipeRightEdge(this.props.card);

      window.requestAnimationFrame(this.updateElementTransform);
    }

    if (ev.deltaX < -1 * this.props.containerWidth * 0.6) {
      this.opacity = 0;
      rootEl.className = "";

      this.props.onSwipeRightEdge(this.props.card);

      window.requestAnimationFrame(this.updateElementTransform);
    }
  };

  resetElementTransform = () => {
    const rootEl = this.myRef.current;

    if (rootEl == null) {
      return undefined;
    }

    rootEl.className = "animate";

    this.transform = { ...this.initialTransform };
    this.opacity = 1;

    this.updateElementTransform();
  };

  updateElementTransform = () => {
    const rootEl = this.myRef.current;

    if (rootEl == null) {
      return undefined;
    }

    if (this.isEnded) {
      return undefined;
    }

    // console.log(
    //   "てい",
    //   `translate(${this.transform.translate.x}px, ${
    //     this.transform.translate.y
    //   }px)`
    // );

    const value = [
      `translate(${this.transform.translate.x}px, ${
        this.transform.translate.y
      }px)`,
      `scale(${this.transform.scale})`,
      // `rotate3d(${this.transform.rx},${this.transform.ry},${
      //   this.transform.rz
      // },${this.transform.angle}deg)`
      `rotate(${this.transform.angle}deg)`
    ];

    const transformStyle = value.join(" ");

    rootEl.style.transform = transformStyle;
    rootEl.style.opacity = this.opacity.toString();

    // window.requestAnimationFrame(this.updateElementTransform);
  };

  render() {
    const { card } = this.props;

    return (
      <CardContainer ref={this.myRef}>
        <CardImage src={card.imageSrc} />
        <p>{card.title}</p>
      </CardContainer>
    );
  }
}

const CardContainer = styled.div`
  background-color: red;
`;

const CardImage = styled.img`
  object-fit: cover;
  width: 100%;
  height: auto;
  display: block;
  pointer-events: none;
`;
