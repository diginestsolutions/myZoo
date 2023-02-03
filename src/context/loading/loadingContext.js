import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Context from "./index";



const LoadingProvider = (props) => {
    const [loading, setLoading] = useState(false);

    
    

    return (
        <Context.Provider
            value={{
              ...props,
              loading,
              setLoading
            }}
        >
          {props.children}
        </Context.Provider>
      );
}

export default LoadingProvider;

  