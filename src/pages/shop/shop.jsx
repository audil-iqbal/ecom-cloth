import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import { updateCollections } from "../../redux/shop/shop.actions";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase";

import WithSpinner from '../../components/with-spinner/with-spinner';
import CollectionPage from "../collection/collection";
import CollectionOverview from "../../components/collections-overview/collections-overview";

const CollectionOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component {
    state = {
        loading: true,
    };

    unsubscribeFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');
        
        collectionRef.get().then(snapshot => {
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
            updateCollections(collectionsMap);
            this.setState({loading:false});
        });
    }

    render(){
        const { match } = this.props;
        const { loading } = this.state;
        return(
            <div className='shop-page'>
                <Route exact path={`${match.path}`} render={props => <CollectionOverviewWithSpinner isLoading={loading} {...props} /> } />
                <Route path={`${match.path}/:collectionId`} render={props => <CollectionPageWithSpinner isLoading={loading} {...props} /> } />
            </div>
        );
    }
} 

const mapDispatchToProp = dispatch => ({
    updateCollections : collection => dispatch( updateCollections(collection) )
});


export default connect(null,mapDispatchToProp)(ShopPage);