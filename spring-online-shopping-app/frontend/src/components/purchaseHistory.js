import React, {useState, useEffect, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import formattedCost from "../helper-functions/formatCost.js";
import {getShoppingItems, getTotal} from "../helper-functions/otherCartOperations.js";
import {axiosShopping, axiosAWS} from "../httpRequests.js";
import "bootstrap/dist/css/bootstrap.min.css";

function PurchaseHistory() {
    const navigate = useNavigate();
    let userName = useRef(localStorage.getItem("userName") || "");
    let encryptValue = useRef(localStorage.getItem("encryptValue") || "");

    const [purchaseHistory, setPurchaseHistory] = useState([]);

    const [shoppingItemsHistory, setShoppingItemsHistory] = useState([]);
    
    let totalHistory = [];
    let overallSum = 0;
    for (let i = 0; i < purchaseHistory.length; ++i) {
        let curTotal = getTotal(shoppingItemsHistory[i]);
        
        overallSum += curTotal;
        totalHistory.push(curTotal);
    }

    useEffect(() => {
        document.title = "Your Purchase History";
        document.body.style.backgroundColor = "rgb(230, 230, 230, 230)";

        if (!userName.current) {
            navigate("/", {replace: true});
        } else {
            async function getPurchaseHistory() {
                let asyncInitialPH = (await axiosShopping.get("/shopper/purchaseHistory", {params: {userName: userName.current, encryptValue: encryptValue.current}})).data.purchaseHistory;
                setPurchaseHistory(asyncInitialPH);
            }
            getPurchaseHistory();
        }
    }, []);

    useEffect(() => {
        async function getLists() {
            let imageData = (await axiosAWS.get("imageData")).data.imageData;
            
            let shoppingHistory = [];
            for (let i = 0; i < purchaseHistory.length; ++i) {
                let shoppingItems = getShoppingItems(purchaseHistory[i], imageData);
                shoppingHistory.push(shoppingItems);
            }
            setShoppingItemsHistory(shoppingHistory);
        }
        getLists();
    }, [purchaseHistory]);
    
    return (
        <>
        <h1 style={{textAlign: "center"}}>Your Purchase History</h1>
        <br />
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                <p>Item</p>
                <p>Cost</p>
                <div></div>
        </div>
        <br />
        {shoppingItemsHistory.map((shoppingItems, index) => {
            return (
            <React.Fragment key={index}>
            {Object.keys(shoppingItems).map((type, idx) => {
                let selectionObject = shoppingItems[type];
                let arrayForType = [];
                let objNoCount = JSON.parse(JSON.stringify(selectionObject));
                delete objNoCount.count;
                for (let i = 0; i < selectionObject.count; ++i) {
                    arrayForType.push(objNoCount);
                };
                return (
                    <React.Fragment key={selectionObject.type}>
                    {arrayForType.map((objForType, index2) => {
                        return (
                            <div key={index2} style={{display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid black"}}>
                                <p>{objForType.type}</p>
                                <p>${formattedCost(objForType.cost)}</p>
                                <div></div>
                            </div>
                        );
                    })}        
                    </React.Fragment>
                );                
            })}
            <br />
            <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold"}}>
                <p style={{fontSize: "20px"}}>Total:</p>
                <p>${formattedCost(totalHistory[index])}</p>
                <div></div>
            </div>
            <br />                    
            </React.Fragment>
            );
        })}
        <br />
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: "bold"}}>
            <p style={{fontSize: "24px"}}>Overall Total:</p>
            <p>${formattedCost(overallSum)}</p>
            <div></div>
        </div>
        </>
    );
}

export default PurchaseHistory;
