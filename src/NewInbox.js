import React, { useState } from 'react';
import { inbox_add } from './redux/actions.js';
import { connect } from 'react-redux';

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
          <label for="subj"><b>Subject</b></label>
          <input
            type="text"
            name="subj"
            value={subj}
            onChange={(e) => setSubj(e.target.value)}
        />

          <label for="from"><b>Sender</b></label>
          <input
            type="text"
            name="from"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
        />

          <label for="note"><b>Note</b></label>
          <input
            type="text"
            name="note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
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
