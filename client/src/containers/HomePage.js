import React from 'react';

export default class HomePage extends React.Component {
  render = () => {
    const big_frame = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      width: "90%",
      flexBasis: "160px",
      background: "skyblue",
      borderRadius: "10px",
      fontSize: "3em",
      fontWeight: "bold",
      marginBottom: "1em"
    };
    const detail_wrapper = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      flexWrap: "wrap"
    };

    const small_frame = {
      flex: "0 1 300px",
      borderBottom: "2px solid lightgrey"
    };
    return (
      <div className="App">
        <div style={big_frame}><div>Book Swap</div></div>
        <div style={detail_wrapper}>
          <div style={small_frame}>
            <p>Catalogue your books online</p>
          </div>
          <div style={small_frame}>
            <p>See all the books our users own</p>
          </div>
          <div style={small_frame}>
            <p>Request to borrow books</p>
          </div>
          <div style={small_frame}>
            <p>Easily manage books and trade requests from your dashboard</p>
          </div>
        </div>
      </div>
    );
  };
}
