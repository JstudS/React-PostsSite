import React, { useState } from "react";

const Counter = () => {
    const [count, setCount] = useState(5)

    let increament = () => {
        setCount(count + 1)
      }
      
      let decrement = () => {
        setCount(count - 1)
      }

    return (
        <div> 
            <h1>{count}</h1>
            <button onClick={increament}>Increament</button>
            <button onClick={decrement}>Decreament</button>
        </div>
    )
}

export default Counter