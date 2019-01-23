import React from "react";
import "./App.css";
import { Cards } from "./Cards";
import { Card } from "./Card";

const cards: Card[] = [
  {
    id: "99",
    title: "吉井ますみ （24)",
    imageSrc:
      "https://pbs.twimg.com/profile_images/581025665727655936/9CnwZZ6j.jpg"
  },
  {
    id: "98",
    title: "吉井ますみ （36)",
    imageSrc:
      "https://3.bp.blogspot.com/--MeNYybnZlA/W3abFrCdEwI/AAAAAAABN-Y/9kGQn4yLNaEjKCqFmMJA654qtHoJMe-qgCLcBGAs/s800/cat3_1_question.png"
  },
  {
    id: "97",
    title: "吉井ますみ （20)",
    imageSrc:
      "https://3.bp.blogspot.com/-yTpMLyLlTlM/WvQG8idDtPI/AAAAAAABL3A/VkvLewlYt1Qq1Q16b2P5lmqgX-fQ6-DVwCLcBGAs/s800/baseball_animal_usagi.png"
  },
  {
    id: "96",
    title: "吉井ますみ （22)",
    imageSrc:
      "https://4.bp.blogspot.com/-c5IMtonhFAs/WLjrRHfvvbI/AAAAAAABCUY/qFdZU0RILpQgaKRGeHV0MNShq4-DkoUcACLcB/s800/speed_slow_turtle.png"
  },
  {
    id: "95",
    title: "吉井ますみ （58)",
    imageSrc:
      "https://2.bp.blogspot.com/-qCSceaBU3XM/W6DTKiZWhHI/AAAAAAABO58/Zv5NGt-NghAheKPCWKOVv3oWx16Sa7INACLcBGAs/s800/douzo_kochirahe_buta.png"
  }
];

interface Props {}

interface State {
  cards: Card[];
}

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      cards: cards
    };
  }

  onSwipeLeftEdge = (card: Card) => {
    console.log(card);
    this.setState(prevState => ({
      cards: prevState.cards.filter(c => c.id !== card.id)
    }));
  };

  onSwipeRightEdge = (card: Card) => {
    console.log(card);
    this.setState(prevState => ({
      cards: prevState.cards.filter(c => c.id !== card.id)
    }));
  };

  render() {
    return (
      <div className="App" style={{ padding: "16px", width: "200px" }}>
        <Cards
          cards={this.state.cards}
          onSwipeLeftEdge={this.onSwipeLeftEdge}
          onSwipeRightEdge={this.onSwipeRightEdge}
        />
      </div>
    );
  }
}

export default App;
