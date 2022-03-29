import React from "react";
import "./App.css";
import { ReactComponent as DividerDesk } from "./images/pattern-divider-desktop.svg";
import { ReactComponent as DividerMobile } from "./images/pattern-divider-mobile.svg";
import { ReactComponent as Dice } from "./images/icon-dice.svg";

function App() {
  const [state, setState] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  const getAdvice = () => {
    fetch(`https://api.adviceslip.com/advice`)
      .then((value) => value.json())
      .then(({ slip }) => {
        setLoading(false);
        setState(slip);
      });
  };

  React.useEffect(() => {
    getAdvice();
  }, []);

  return (
    <div className="container">
      {!loading && (
        <>
          {state?.id && <span>advice #{state.id}</span>}
          {state?.advice && <h1>"{state?.advice}"</h1>}
          <div className="div-container">
            <DividerDesk className="div-desktop" />
            <DividerMobile className="div-mobile" />
          </div>
          <div className="button-container">
            <div className="button" onClick={() => getAdvice()}>
              <Dice />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
