import { useEffect } from "react";
import axios from "axios";

import RouterWeb from "./RouterWeb.js";
import { silverDataAtom } from "../../recoil/silverDataAtom.js";
import { useSetRecoilState } from "recoil";

function App() {
  const setSilverData = useSetRecoilState(silverDataAtom); 
    useEffect(() => {
      axios.get("http://localhost:8080")
      .then(res => {
        setSilverData(res.data.silverList)
      })
      .catch(error => console.log(error))
    }, []);

    return (
      <div className="App">
        <RouterWeb/>
      </div>
    );
}

export default App;