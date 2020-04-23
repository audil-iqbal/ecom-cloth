import React, { Component } from "react";
import SHOP_DATA from "./shopdata";
import CollectionPreview from "../../components/collection-preview/preview";

class ShopPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            collections: SHOP_DATA
        }
    }

    render(){
        const {collections} = this.state;
        return(
            <div className='shop-page'>
                {
                    collections.map(({id, ...collectionProps}) => (
                        <CollectionPreview key={id} {...collectionProps} />
                    ))
                }
            </div>
        );
    }
}

export default ShopPage;