import React, { useState } from 'react';
import { inbox_add, outbox_add } from './redux/actions.js';
import { connect } from 'react-redux';
import { InputAttrs as attrs } from './InputAttrs.js';
import { InputField } from './InputFields.js';

const NewInbox = ({user, dispatch}) => {
    const [subj, setSubj] = useState("");
    const [from, setFrom] = useState("");
    const date = new Date().toISOString();
    const added = user.name;
    const [note, setNote] = useState("");
    
    const handleAddInbox = (e) => {
        e.preventDefault();
        dispatch(
            inbox_add({
                subj: subj,
                from: from,
                date: date,
                added: added,
                note: note
            })
        );
        setSubj("");
        setFrom("");
        setNote("");
    };

    return (
        <div className="addRecord">
        <InputField attrs={attrs.inbox.filter(x => x.name == "subj")[0]}
                    setter={setSubj}
                    value={subj}
        />
        <InputField attrs={attrs.inbox.filter(x => x.name == "from")[0]}
                    setter={setFrom}
                    value={from}
                    auto={true}
        />
        <InputField attrs={attrs.inbox.filter(x => x.name == "note")[0]}
                    setter={setNote}
                    value={note}
        />
        <button type="submit" onClick={(e) => handleAddInbox(e)} >Add</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user: user }
}

export default connect(mapStateToProps)(NewInbox);
