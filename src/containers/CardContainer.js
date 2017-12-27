import React, { Component } from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import { connect } from 'react-redux';
import submitNewCard from '~actions/SubmitNewCard';
import BoardTitleInput from './../../boardCreation/BoardTitleInput';
import Card from '../components/Card';
import uniqueId from 'lodash/uniqueId';

import { getActiveBoard } from '~reducers/boards';

class CreateCardContainer extends Component {

    submit = values => {
        const { listId, submitNewCard } = this.props;
        let cardName = `cardName_${listId}`;
        submitNewCard(values[cardName], uniqueId('cardItem_'), listId);
    }

    renderCards = () => {


        const { activeBoardData, listId } = this.props;

        // const activeBoard = getActiveBoard();

        return activeBoardData.listItems[listId].cards.map((card, i) => {
            return (
                <Card
                    key={i}
                    title={card.name}
                    cardId={card.cardId}
                    listId={card.listId}
                    isArchived={card.isArchived}
                />
            )
        })
    }

    render() {
        const { handleSubmit, listId } = this.props;
        return (
            <div>
                <form onSubmit={handleSubmit(this.submit)}>
                    <label>
                        <Field
                            type="text"
                            component={BoardTitleInput}
                            name={`cardName_${listId}`}
                        />
                    </label>
                </form>
                {this.renderCards()}
            </div>
        )
    }
}

function validate(values) {
    const errors = {};

    if (!values.cardName) {
        errors.cardName = 'oops!';
    }

    return errors;
}

const afterSubmit = (result, dispatch) => {
    dispatch(reset('cardName'));
}

const mapStateToProps({ activeBoardData }) {
    return { activeBoardData }
}

export default reduxForm({
    validate,
    form: 'cardName',
    onSubmitSuccess: afterSubmit,
})(connect(mapStateToProps, { submitNewCard })(CreateCardContainer));
