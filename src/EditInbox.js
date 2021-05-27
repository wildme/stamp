import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { inbox_edit } from './redux/actions.js';
import { connect } from 'react-redux';

const EditInbox = ({inbox, dispatch}) => {
    const { id } = useParams();
    const prev = inbox.find(x => x.id == id);
    const [subj, setSubj] = useState(prev.subj);
    const [sender, setSender] = useState(prev.sender);
    const [note, setNote] = useState(prev.note);
    
    const handleEditInbox = (e) => {
        e.preventDefault();
        dispatch(
            inbox_edit(id, {
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

          <button type="submit" onClick={(e) => handleEditInbox(e)} >Update</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { inbox } = state;
    return { inbox: inbox }
}
export default connect(mapStateToProps)(EditInbox);
