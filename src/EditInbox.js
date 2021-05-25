import React, { useState } from 'react';
import { inbox_edit } from './redux/actions.js';
import { connect } from 'react-redux';

const EditInbox = ({props, dispatch}) => {
    const InboxId = props.id;
    const [subj, setSubj] = useState(props.subj);
    const [sender, setSender] = useState(props.sender);
    const [note, setNote] = useState(props.note);
    
    const handleEditInbox = (e) => {
        e.preventDefault();
        dispatch(
            inbox_edit({
                subj: subj,
                sender: sender,
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

          <button type="submit" onClick={(e) => handleEditInbox(e)} >Add</button>
        </div>
    );
}

export default connect()(NewInbox);
