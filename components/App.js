import React, { useEffect } from "react";
import Header from "./Header/header";
import StartUp from '../components/Start/StartUp/StartUp'
import Laundary from "./laundry/laundary";
import { useSelector } from "react-redux";
import { useBetween } from "use-between";


const App = () => {
  const state = useSelector(state => state.data);

  const {  isLogIn, setisLogIn } = useBetween(state.useShareState);
  useEffect(() => {
 
  setisLogIn(false);
  },[])

  return (

    <div className="App" >
      {isLogIn == false &&
        <StartUp />
      }
      {isLogIn == true &&
        <Laundary className="launCont" />
      }

    </div>


  );
}

const headers = {
  // 'Authorization': 'Bearer '+ accessToken,
  "content-type": "application/json;charset=UTF-8"
};
// Axios.post("https://tajwal2.herokuapp.com/api/sessions", sessionData, { headers })
//   .then(resSession => {
//       // setisUserLogin(true)

//       console.log(resSession.data.accessToken + " " + resSession.data.userType)
//       itemsArray.push({
//         itemNumber: i,
//         itemId: item.id,
//         itemStoreName: item.businessName,
//         itemStorePicture: item.images[0].url,// channnnnnge
//         itemName: item.name,
//         itemPhotos: imagesArray,
//         itemCategory: (item.categories.length > 0) ? item.categories[0].categoryName : [],
//         itemType: (item.types.length > 0) ? item.types[0].typeName : [],
//         itemText: item.description,
//         itemPrice: item.price,
//         itemRate: item.rateValue.toFixed(2),
//         itemDate: item.createdAt,
//         itemCommentsDetails: commentsArray
//     })
//     .catch(err => console.log("session error: " + err))
//   })
export default App;