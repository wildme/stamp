import React, { useState } from 'react';
import { inbox_add } from './redux/actions.js';
import { connect } from 'react-redux';
import { InputAttrs as attrs } from './InputAttrs.js';
import { InputField } from './InputFields.js';

const NewInbox = ({user, dispatch}) => {
    const [subj, setSubj] = useState("");
    const [sender, setSender] = useState("");
    const date = new Date().toISOString();
    const added = user.name;
    const [note, setNote] = useState("");
    
    const handleAddInbox = (e) => {
        e.preventDefault();
        dispatch(
            inbox_add({
                subj: subj,
                sender: sender,
                date: date,
                added: added,
                note: note
            })
        );
        setSubj("");
        setSender("");
        setNote("");
    };

    return (
        <div className="addRecord">
        <InputField attrs={attrs.inbox.filter(x => x.name == "subj")[0]}
                    setter={setSubj}
                    value={subj}
        />
        <InputField attrs={attrs.inbox.filter(x => x.name == "sender")[0]}
                    setter={setSender}
                    value={sender}
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
