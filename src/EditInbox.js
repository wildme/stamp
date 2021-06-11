import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { inbox_edit } from './redux/actions.js';
import { connect } from 'react-redux';
import { InputAttrs as attrs } from './InputAttrs.js';
import { InputField } from './InputFields.js';

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
        <button type="submit" onClick={(e) => handleEditInbox(e)} >Update</button>
        </div>
    );
}

const mapStateToProps = (state) => {
    const { inbox } = state;
    return { inbox: inbox }
}
export default connect(mapStateToProps)(EditInbox);
